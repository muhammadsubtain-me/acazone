import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { allowedFileTypes, maxFiles, maxFileSize } from '@/lib/config/order';
import { logError } from '@/lib/logger';
import { enforceUploadRateLimits, withSessionCookie } from '@/lib/rate-limit';

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

function respond(body, init, sessionId, isNew) {
  return withSessionCookie(NextResponse.json(body, init), sessionId, isNew);
}

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
  const { blocked, sessionId, isNew } = await enforceUploadRateLimits(request);
  if (blocked) return withSessionCookie(blocked, sessionId, isNew);

  let body;
  try {
    body = await request.json();
  } catch {
    return respond({ error: 'Invalid request body.' }, { status: 400 }, sessionId, isNew);
  }

  const { files } = body;
  const validationError = validateFiles(files);
  if (validationError) {
    return respond({ error: validationError }, { status: 400 }, sessionId, isNew);
  }

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
    return respond({ uploads }, { status: 200 }, sessionId, isNew);
  } catch (err) {
    logError('create-upload-url', err);
    return respond(
      { error: 'Could not prepare file upload. Please try again.' },
      { status: 500 },
      sessionId,
      isNew,
    );
  }
}

// Reject all other HTTP methods
export function GET()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
