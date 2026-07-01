import { logError, logWarn } from '@/lib/logger';

const ZB_VALIDATE_URL = 'https://api.zerobounce.net/v2/validate';

const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UNVERIFIED_ERROR =
  'This email address could not be verified. Please check it or use WhatsApp instead.';

/** Statuses ZeroBounce treats as safe to accept for contact collection. */
const ACCEPTED_STATUSES = new Set(['valid', 'catch-all']);

/** Reuse recent results so validate-email + submit-order don't double-bill credits. */
const validationCache = new Map();
const CACHE_TTL_MS = 60_000;

function getApiKey() {
  return process.env.NO_BOUNCE_EMAIL_KEY?.trim();
}

function getCachedResult(email) {
  const hit = validationCache.get(email);
  if (!hit || Date.now() > hit.expiresAt) {
    validationCache.delete(email);
    return null;
  }
  return hit.result;
}

function setCachedResult(email, result) {
  if (result.serviceError) return;
  validationCache.set(email, { result, expiresAt: Date.now() + CACHE_TTL_MS });
}

/** Normalize and sanity-check an email before calling ZeroBounce. */
export function normalizeEmail(email) {
  const trimmed = (email || '').trim().toLowerCase();
  if (!trimmed || !EMAIL_FORMAT_REGEX.test(trimmed)) return null;
  return trimmed;
}

function evaluateZeroBounceResponse(data) {
  if (data.error) {
    return {
      valid: false,
      error: 'Could not verify email address. Please try again in a moment.',
      serviceError: true,
    };
  }

  const subStatus = (data.sub_status || '').toLowerCase();

  if (subStatus === 'failed_syntax_check' || subStatus === 'possible_typo') {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  if (subStatus === 'disposable') {
    return {
      valid: false,
      error: 'Disposable email addresses are not accepted. Please use a permanent email.',
    };
  }

  const status = (data.status || '').toLowerCase();

  if (ACCEPTED_STATUSES.has(status)) {
    return { valid: true };
  }

  if (status === 'unknown') {
    return { valid: false, error: UNVERIFIED_ERROR };
  }

  return { valid: false, error: UNVERIFIED_ERROR };
}

/**
 * Ask ZeroBounce whether an email is deliverable.
 * Returns { configured, valid, error?, serviceError? }.
 */
export async function checkEmailAddress(email) {
  const apiKey = getApiKey();

  if (!apiKey) {
    logWarn('zerobounce', 'NO_BOUNCE_EMAIL_KEY not set — skipping email check');
    return { configured: false, valid: true };
  }

  const normalized = normalizeEmail(email);
  if (!normalized) {
    return { configured: true, valid: false, error: 'Please enter a valid email address.' };
  }

  const cached = getCachedResult(normalized);
  if (cached) return cached;

  try {
    const url = new URL(ZB_VALIDATE_URL);
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('email', normalized);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { accept: 'application/json' },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      logError('zerobounce', `HTTP ${res.status}`, JSON.stringify(data).slice(0, 200));
      return {
        configured: true,
        valid: false,
        error: 'Could not verify email address. Please try again in a moment.',
        serviceError: true,
      };
    }

    const evaluated = evaluateZeroBounceResponse(data);
    const result = evaluated.serviceError
      ? { configured: true, ...evaluated }
      : evaluated.valid
        ? { configured: true, valid: true }
        : { configured: true, valid: false, error: evaluated.error };

    setCachedResult(normalized, result);
    return result;
  } catch (err) {
    logError('zerobounce', err);
    return {
      configured: true,
      valid: false,
      error: 'Could not verify email address. Please try again.',
      serviceError: true,
    };
  }
}
