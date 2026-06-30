// ─── Shared logging convention ──────────────────────────────────────────────────
// Scope-prefixed logging used across API routes, hooks, and client components.
// In production, errors are also forwarded to Sentry when SENTRY_DSN is set.
//
// Usage:
//   logError('submit-order', err)
//   logError('inquiries:claim', err, { id })
//   logWarn('fcm', 'token refresh skipped')

import * as Sentry from '@sentry/nextjs';

const isProd = process.env.NODE_ENV === 'production';

function sentryEnabled() {
  return Boolean(
    process.env.SENTRY_DSN ||
    process.env.NEXT_PUBLIC_SENTRY_DSN
  );
}

function toError(error) {
  if (error instanceof Error) return error;
  if (error && typeof error === 'object' && 'message' in error) {
    const err = new Error(String(error.message));
    err.name = error.code ? `SupabaseError:${error.code}` : 'LoggedError';
    err.cause = error;
    return err;
  }
  return new Error(typeof error === 'string' ? error : JSON.stringify(error));
}

function reportToSentry(scope, error, meta) {
  if (!sentryEnabled()) return;

  Sentry.withScope((sentryScope) => {
    sentryScope.setTag('scope', scope);
    if (meta !== undefined) {
      sentryScope.setContext('meta', typeof meta === 'object' ? meta : { value: meta });
    }
    Sentry.captureException(toError(error));
  });
}

export function logError(scope, error, meta) {
  if (meta !== undefined) {
    console.error(`[${scope}]`, error, meta);
  } else {
    console.error(`[${scope}]`, error);
  }

  reportToSentry(scope, error, meta);
}

export function logWarn(scope, ...args) {
  console.warn(`[${scope}]`, ...args);
}

// Verbose, non-actionable logs — suppressed in production builds.
export function logInfo(scope, ...args) {
  if (isProd) return;
  console.info(`[${scope}]`, ...args);
}
