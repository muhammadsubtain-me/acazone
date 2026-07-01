import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { isEmailContactType } from '@/lib/config/inquiries';
import { normalizeEmail } from '@/lib/zerobounce';
import { toWhapiContact } from '@/lib/whapi';

export const SESSION_COOKIE_NAME = 'acezon_sid';

const redis = Redis.fromEnv();

// Layer 1 — submit: per contact + per IP (campus-friendly ceiling)
const submitContactLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
  prefix: 'acezon:order:contact',
});

const submitIpLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  analytics: true,
  prefix: 'acezon:order:ip',
});

// Layer 2 — validate: per browser session + loose IP backstop
const validateSessionLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(40, '1 h'),
  analytics: true,
  prefix: 'acezon:validate:session',
});

const validateIpBackstopLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 h'),
  analytics: true,
  prefix: 'acezon:validate:ip',
});

// Layer 3 — upload: per browser session
const uploadSessionLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(15, '1 h'),
  analytics: true,
  prefix: 'acezon:upload:session',
});

const SESSION_ID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isRateLimitDisabled() {
  return process.env.DISABLE_RATE_LIMIT === 'true';
}

export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || '127.0.0.1';
}

/** Read or mint an anonymous browser session id for layer 2/3 limits. */
export function resolveSession(request) {
  const existing = request.cookies.get(SESSION_COOKIE_NAME)?.value?.trim();
  if (existing && SESSION_ID_REGEX.test(existing)) {
    return { sessionId: existing, isNew: false };
  }
  return { sessionId: crypto.randomUUID(), isNew: true };
}

export function withSessionCookie(response, sessionId, isNew) {
  if (isNew && sessionId) {
    response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
  }
  return response;
}

function buildRateLimitResponse(result, message) {
  const minutesLeft = Math.ceil((result.reset - Date.now()) / 60000);
  return NextResponse.json(
    {
      error: message.replace('{minutes}', String(minutesLeft)),
      retryAfter: result.reset,
    },
    {
      status: 429,
      headers: {
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(result.reset),
        'Retry-After': String(Math.ceil((result.reset - Date.now()) / 1000)),
      },
    }
  );
}

/** Stable Redis key for layer 1 contact limit from an order payload. */
export function buildSubmitContactKey(body) {
  if (!body) return null;
  const { contact_type, contact, phone, country_dial } = body;

  if (isEmailContactType(contact_type)) {
    const normalized = normalizeEmail(contact);
    return normalized ? `email:${normalized}` : null;
  }

  const whapiContact = toWhapiContact(country_dial, phone);
  return whapiContact ? `phone:${whapiContact}` : null;
}

/**
 * Layer 1 — enforce submit limits (contact first, then IP).
 * Returns a 429 NextResponse or null if allowed.
 */
export async function enforceSubmitRateLimits(request, contactKey) {
  if (isRateLimitDisabled()) return null;

  if (contactKey) {
    const contactResult = await submitContactLimit.limit(contactKey);
    if (!contactResult.success) {
      return buildRateLimitResponse(
        contactResult,
        'You have already submitted recently with this email or number. Please try again in {minutes} minute(s).'
      );
    }
  }

  const ipResult = await submitIpLimit.limit(getClientIp(request));
  if (!ipResult.success) {
    return buildRateLimitResponse(
      ipResult,
      `Too many submissions from this network. Please try again in {minutes} minute(s).`
    );
  }

  return null;
}

/**
 * Layer 2 — enforce validate limits (session + IP backstop).
 * Returns { blocked, sessionId, isNew }.
 */
export async function enforceValidateRateLimits(request) {
  const { sessionId, isNew } = resolveSession(request);
  if (isRateLimitDisabled()) {
    return { blocked: null, sessionId, isNew };
  }

  const sessionResult = await validateSessionLimit.limit(sessionId);
  if (!sessionResult.success) {
    return {
      blocked: buildRateLimitResponse(
        sessionResult,
        'Too many verification attempts. Please try again in {minutes} minute(s).'
      ),
      sessionId,
      isNew,
    };
  }

  const ipResult = await validateIpBackstopLimit.limit(getClientIp(request));
  if (!ipResult.success) {
    return {
      blocked: buildRateLimitResponse(
        ipResult,
        'Too many verification attempts from this network. Please try again in {minutes} minute(s).'
      ),
      sessionId,
      isNew,
    };
  }

  return { blocked: null, sessionId, isNew };
}

/**
 * Layer 3 — enforce upload limits (per session).
 * Returns { blocked, sessionId, isNew }.
 */
export async function enforceUploadRateLimits(request) {
  const { sessionId, isNew } = resolveSession(request);
  if (isRateLimitDisabled()) {
    return { blocked: null, sessionId, isNew };
  }

  const sessionResult = await uploadSessionLimit.limit(sessionId);
  if (!sessionResult.success) {
    return {
      blocked: buildRateLimitResponse(
        sessionResult,
        'Too many upload attempts. Please try again in {minutes} minute(s).'
      ),
      sessionId,
      isNew,
    };
  }

  return { blocked: null, sessionId, isNew };
}
