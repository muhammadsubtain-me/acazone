import { NextResponse } from 'next/server';
import { enforceValidateRateLimits, withSessionCookie } from '@/lib/rate-limit';
import { checkEmailAddress, normalizeEmail } from '@/lib/zerobounce';

function respond(body, init, sessionId, isNew) {
  return withSessionCookie(NextResponse.json(body, init), sessionId, isNew);
}

export async function POST(request) {
  const { blocked, sessionId, isNew } = await enforceValidateRateLimits(request);
  if (blocked) return withSessionCookie(blocked, sessionId, isNew);

  if (!process.env.NO_BOUNCE_EMAIL_KEY) {
    return respond(
      { error: 'Email verification is not available right now.' },
      { status: 503 },
      sessionId,
      isNew,
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return respond({ error: 'Invalid request body.' }, { status: 400 }, sessionId, isNew);
  }

  const { email } = body;
  const normalized = normalizeEmail(email);

  if (!normalized) {
    return respond(
      { valid: false, error: 'Please enter a valid email address.' },
      { status: 400 },
      sessionId,
      isNew,
    );
  }

  const result = await checkEmailAddress(normalized);

  if (!result.configured) {
    return respond(
      { error: 'Email verification is not available right now.' },
      { status: 503 },
      sessionId,
      isNew,
    );
  }

  if (result.valid) {
    return respond({ valid: true }, { status: 200 }, sessionId, isNew);
  }

  if (result.serviceError) {
    return respond({ error: result.error }, { status: 502 }, sessionId, isNew);
  }

  return respond(
    { valid: false, error: result.error },
    { status: 400 },
    sessionId,
    isNew,
  );
}

export function GET()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 }); }
