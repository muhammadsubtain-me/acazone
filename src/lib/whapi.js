import { logError, logWarn } from '@/lib/logger';

const WHAPI_CONTACTS_URL = 'https://gate.whapi.cloud/contacts';

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
      return { configured: true, valid: true };
    }

    if (status === 'invalid') {
      return {
        configured: true,
        valid: false,
        error: 'This number is not registered on WhatsApp. Please check the number or use email instead.',
      };
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
