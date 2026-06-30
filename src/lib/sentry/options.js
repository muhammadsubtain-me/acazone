// Shared Sentry init options — used by client, server, and edge entry points.
// Set SENTRY_DSN (server) and NEXT_PUBLIC_SENTRY_DSN (browser) in production.
// If unset, Sentry stays disabled and logError() only writes to the console.

export function getSentryOptions() {
  const dsn =
    process.env.SENTRY_DSN ||
    process.env.NEXT_PUBLIC_SENTRY_DSN ||
    '';

  return {
    dsn: dsn || undefined,
    enabled: Boolean(dsn),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  };
}
