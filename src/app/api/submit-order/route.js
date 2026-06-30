import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { maxFiles, acceptedFileExtensions } from '@/lib/config/order';
import { logError } from '@/lib/logger';

// Allowed upload extensions, derived from the shared client config so the two
// stay in sync. The browser uploads files straight to Storage and only sends
// us the resulting flat path strings, so here we validate count, extension, and
// guard against path traversal — true byte/size/MIME enforcement lives in the
// Supabase Storage bucket policy.
const ALLOWED_EXTENSIONS = new Set(
  acceptedFileExtensions.split(',').map((e) => e.trim().replace(/^\./, '').toLowerCase())
);

function attachmentsAreValid(attachments) {
  if (!Array.isArray(attachments)) return false;
  if (attachments.length > maxFiles) return false;
  return attachments.every((path) => {
    if (typeof path !== 'string') return false;
    const trimmed = path.trim();
    if (!trimmed || trimmed.length > 256) return false;
    // Stored files are flat names; reject nested paths / traversal attempts.
    if (/[\\/]/.test(trimmed) || trimmed.includes('..')) return false;
    const ext = trimmed.split('.').pop()?.toLowerCase();
    return Boolean(ext) && ALLOWED_EXTENSIONS.has(ext);
  });
}

// ─── Supabase server-side client ──────────────────────────────────────────────
// Uses the publishable (anon) key — same permissions as the browser client.
// Inquiries table must have RLS policy allowing anon INSERT.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

// ─── Rate limiter ─────────────────────────────────────────────────────────────
// Sliding window: max 5 order submissions per unique IP per hour.
// A real student submitting multiple assignments can still get through.
// A bot hammering the endpoint gets blocked after the 5th request.
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,          // tracks usage in Upstash dashboard
  prefix: 'acezon:order',   // namespaced key in Redis
});

// ─── POST /api/submit-order ───────────────────────────────────────────────────
export async function POST(request) {

  // 1. Identify the client IP (Vercel sets x-forwarded-for)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || '127.0.0.1';

  // 2. Check rate limit
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    const resetDate = new Date(reset);
    const minutesLeft = Math.ceil((resetDate - Date.now()) / 60000);
    return NextResponse.json(
      {
        error: `Too many submissions. You have reached the limit of ${limit} orders per hour. Please try again in ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}.`,
        retryAfter: reset,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit':     String(limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset':     String(reset),
          'Retry-After':           String(Math.ceil((reset - Date.now()) / 1000)),
        },
      }
    );
  }

  // 3. Parse request body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const {
    submitted_at, name, phone, country_dial, country_iso, country_name,
    contact_type, contact,
    domain_id, service_id, custom_service, subject, description,
    attachments,
  } = body;

  const isEmail = contact_type === 'email';

  // 4. Server-side validation (defense against clients bypassing frontend checks)
  const errs = [];
  if (!name?.trim() || name.trim().length < 2)
    errs.push('Name must be at least 2 characters.');
  if (isEmail) {
    if (!contact?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim()))
      errs.push('A valid email address is required.');
  } else {
    if (!phone?.trim() || phone.replace(/\D/g, '').length < 6)
      errs.push('Invalid phone number.');
  }
  if (!domain_id?.trim())
    errs.push('Academic domain is required.');
  if (!service_id?.trim())
    errs.push('Service type is required.');
  if (!subject?.trim() || subject.trim().length < 2)
    errs.push('Subject / course is required.');
  if (!description?.trim() || description.trim().length < 10)
    errs.push('Description must be at least 10 characters.');
  if (!attachmentsAreValid(attachments))
    errs.push('Invalid or unsupported attachments.');

  if (errs.length > 0) {
    return NextResponse.json({ error: errs[0] }, { status: 400 });
  }

  // 5. Insert into Supabase
  const { error } = await supabase.from('inquiries').insert({
    submitted_at:   submitted_at || new Date().toISOString(),
    name:           name.trim(),
    phone:          isEmail ? '' : phone.trim(),
    country_dial:   isEmail ? '' : (country_dial?.trim() || ''),
    country_iso:    isEmail ? '' : (country_iso?.trim() || ''),
    country_name:   isEmail ? '' : (country_name?.trim() || ''),
    contact_type:   isEmail ? 'email' : 'whatsapp',
    contact:        isEmail ? contact.trim() : null,
    domain_id:      domain_id.trim(),
    service_id:     service_id.trim(),
    custom_service: custom_service?.trim() || '',
    subject:        subject.trim(),
    description:    description.trim(),
    status:         'new',
    claimed_by:     null,
    claimed_at:     null,
    completed_at:   null,
    notes:          '',
    attachments:    attachments,
  });

  if (error) {
    logError('submit-order', error);
    return NextResponse.json(
      { error: 'Failed to submit your order. Please try again.' },
      { status: 500 }
    );
  }

  // 6. Success
  return NextResponse.json({ success: true }, { status: 200 });
}

// Reject all other HTTP methods
export function GET()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
