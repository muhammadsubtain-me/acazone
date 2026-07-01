import { logError, logWarn } from '@/lib/logger';

const WHAPI_CONTACTS_URL = 'https://gate.whapi.cloud/contacts';

const validationCache = new Map();
const CACHE_TTL_MS = 60_000;

function getCachedResult(contact) {
  const hit = validationCache.get(contact);
  if (!hit || Date.now() > hit.expiresAt) {
    validationCache.delete(contact);
    return null;
  }
  return hit.result;
}

function setCachedResult(contact, result) {
  if (result.serviceError) return;
  validationCache.set(contact, { result, expiresAt: Date.now() + CACHE_TTL_MS });
}

/** Build international digits (no +) for Whapi from dial code + local number. */
export function toWhapiContact(dial, phone) {
  const dialDigits = (dial || '').replace(/\D/g, '');
  const phoneDigits = (phone || '').replace(/\D/g, '').replace(/^0+/, '');
  if (!dialDigits || phoneDigits.length < 6) return null;
  return `${dialDigits}${phoneDigits}`;
}

/**
 * Ask Whapi whether a number is registered on WhatsApp.
 * Returns { configured, valid, error? }.
 */
export async function checkWhatsAppNumber(contact) {
  const token = process.env.WHAPI_TOKEN;

  if (!token) {
    logWarn('whapi', 'WHAPI_TOKEN not set — skipping WhatsApp check');
    return { configured: false, valid: true };
  }

  if (!contact) {
    return { configured: true, valid: false, error: 'Invalid phone number.' };
  }

  const cached = getCachedResult(contact);
  if (cached) return cached;

  try {
    const res = await fetch(WHAPI_CONTACTS_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        blocking: 'wait',
        force_check: false,
        contacts: [contact],
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      logError('whapi', `HTTP ${res.status}`, body.slice(0, 200));
      return {
        configured: true,
        valid: false,
        error: 'Could not verify WhatsApp number. Please try again in a moment.',
        serviceError: true,
      };
    }

    const data = await res.json();
    const result = data.contacts?.[0];
    const status = result?.status;

    if (status === 'valid') {
      const result = { configured: true, valid: true };
      setCachedResult(contact, result);
      return result;
    }

    if (status === 'invalid') {
      const result = {
        configured: true,
        valid: false,
        error: 'This number is not registered on WhatsApp. Please check the number or use email instead.',
      };
      setCachedResult(contact, result);
      return result;
    }

    logError('whapi', 'Unexpected response', data);
    return {
      configured: true,
      valid: false,
      error: 'Could not verify WhatsApp number. Please try again.',
      serviceError: true,
    };
  } catch (err) {
    logError('whapi', err);
    return {
      configured: true,
      valid: false,
      error: 'Could not verify WhatsApp number. Please try again.',
      serviceError: true,
    };
  }
}
