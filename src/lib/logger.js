// ─── Shared logging convention ──────────────────────────────────────────────────
// A single, scope-prefixed logging surface used across API routes, hooks, and
// client components. Keeping it here means we get a consistent log shape
//   [scope] <message/error> <optional meta>
// and one place to later route logs to a monitoring service (Sentry, etc.) or
// silence noisy levels in production.
//
// Usage:
//   logError('submit-order', err)
//   logError('inquiries:claim', err, { id })
//   logWarn('fcm', 'token refresh skipped')

const isProd = process.env.NODE_ENV === 'production';

export function logError(scope, error, meta) {
  if (meta !== undefined) {
    console.error(`[${scope}]`, error, meta);
  } else {
    console.error(`[${scope}]`, error);
  }
}

export function logWarn(scope, ...args) {
  console.warn(`[${scope}]`, ...args);
}

// Verbose, non-actionable logs — suppressed in production builds.
export function logInfo(scope, ...args) {
  if (isProd) return;
  console.info(`[${scope}]`, ...args);
}
