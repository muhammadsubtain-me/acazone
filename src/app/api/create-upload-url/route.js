import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { allowedFileTypes, maxFiles, maxFileSize } from '@/lib/config/order';
import { logError } from '@/lib/logger';

// ─── POST /api/create-upload-url ──────────────────────────────────────────────
// Gates file uploads behind the server: validates + rate-limits the request,
// then mints one-time signed upload URLs. The browser uploads to those URLs via
// uploadToSignedUrl(), so files can NO LONGER be written to Storage directly
// with the anon key (that policy is removed). This puts every upload behind our
// rate limiter instead of allowing unbounded direct-to-Storage writes.

const STORAGE_BUCKET = 'inquiry-files';

// Service-role client — required to mint signed upload URLs. This key is
// server-only (never NEXT_PUBLIC_) and must never reach the browser.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

// Sliding window: max 15 upload-authorization requests per IP per hour. Higher
// than the 5 orders/hour cap so multi-file uploads + retries aren't blocked —
// the actual order count stays limited by /api/submit-order.
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(15, '1 h'),
  analytics: true,
  prefix: 'acezon:upload',
});

// Validates the client-reported file metadata. Note: byte size / MIME are also
// enforced by the Storage bucket itself on the real upload, so a client lying
// here still can't bypass the bucket limits.
function validateFiles(files) {
  if (!Array.isArray(files) || files.length === 0) return 'At least one file is required.';
  if (files.length > maxFiles) return `You can attach up to ${maxFiles} files only.`;
  for (const f of files) {
    if (!f || typeof f.name !== 'string' || !f.name.trim()) return 'Invalid file metadata.';
    if (!allowedFileTypes.includes(f.type)) return `"${f.name}" is not a supported file type.`;
    if (typeof f.size !== 'number' || f.size <= 0 || f.size > maxFileSize) {
      return `"${f.name}" exceeds the 10 MB limit.`;
    }
  }
  return null;
}

function buildStoragePath(fileName) {
  const ext = (fileName.split('.').pop() || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const suffix = ext ? `.${ext}` : '';
  return `${Date.now()}-${Math.random().toString(36).slice(2)}${suffix}`;
}

export async function POST(request) {
  // 1. Identify the client IP (Vercel sets x-forwarded-for)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || '127.0.0.1';

  // 2. Rate limit (set DISABLE_RATE_LIMIT=true in .env.local to skip)
  if (process.env.DISABLE_RATE_LIMIT !== 'true') {
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);
    if (!success) {
      const minutesLeft = Math.ceil((reset - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: `Too many upload attempts. Please try again in ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}.`,
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
  }

  // 3. Parse + validate
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { files } = body;
  const validationError = validateFiles(files);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // 4. Mint a one-time signed upload URL per file
  try {
    const uploads = [];
    for (const file of files) {
      const path = buildStoragePath(file.name);
      const { data, error } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .createSignedUploadUrl(path);
      if (error) throw error;
      uploads.push({ path: data.path, token: data.token });
    }
    return NextResponse.json({ uploads }, { status: 200 });
  } catch (err) {
    logError('create-upload-url', err);
    return NextResponse.json(
      { error: 'Could not prepare file upload. Please try again.' },
      { status: 500 }
    );
  }
}

// Reject all other HTTP methods
export function GET()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
