/** @type {import('next').NextConfig} */

// ─── HTTP Security Headers ─────────────────────────────────────────────────────
// Applied to every response. Protects against clickjacking, MIME sniffing,
// reflected XSS, and leaking referrer information to third parties.
const securityHeaders = [
  // Prevent browsers from MIME-sniffing a response away from the declared content-type
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Disallow the site from being embedded in any iframe (clickjacking protection)
  // Note: frame-ancestors in CSP supersedes this in modern browsers; kept for older ones.
  { key: 'X-Frame-Options', value: 'DENY' },
  // Legacy XSS filter — still respected by some older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Send origin only on same-origin requests; strip on cross-origin downgrade
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable access to sensitive browser APIs that Acezon does not need
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

// ─── Content Security Policy ───────────────────────────────────────────────────
// A whitelist of every origin the browser is allowed to contact.
// Blocks XSS payloads from loading scripts from unknown domains.
//
// External origins used by this app:
//   • gstatic.com          — Firebase service worker script imports
//   • *.supabase.co        — Supabase HTTP API + Realtime WebSocket (wss://)
//   • fcm.googleapis.com   — Firebase Cloud Messaging token registration
//   • firebase.googleapis.com / www.googleapis.com — FCM auth calls
//   • flagcdn.com          — Country flag images in the order form
//
// Notes:
//   • 'unsafe-inline' on script-src is required by Next.js (inline hydration scripts).
//     Without nonces (complex), this is unavoidable. React's JSX escaping is the
//     primary XSS protection; CSP adds a second layer against external script injection.
//   • Only applied in production — Next.js dev mode requires 'unsafe-eval' for HMR
//     which would conflict. Dev mode is not a security boundary.
//   • blob: in worker-src is required for the Firebase service worker registration.

const SUPABASE_URL = 'https://nlxsgwwlvztbndwnjnhp.supabase.co';
const SUPABASE_WSS = 'wss://nlxsgwwlvztbndwnjnhp.supabase.co';

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  `connect-src 'self' ${SUPABASE_URL} ${SUPABASE_WSS} https://fcm.googleapis.com https://firebase.googleapis.com https://www.googleapis.com`,
  `img-src 'self' data: blob: https://flagcdn.com ${SUPABASE_URL}`,
  "media-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "worker-src 'self' blob:",
];

const cspHeader = {
  key: 'Content-Security-Policy',
  value: cspDirectives.join('; '),
};

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...securityHeaders,
          // CSP is only applied in production.
          // Next.js dev mode (HMR) requires 'unsafe-eval' which would weaken the policy.
          ...(process.env.NODE_ENV === 'production' ? [cspHeader] : []),
        ],
      },
    ];
  },

  // Allow images from flagcdn.com (country flags in the order form)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
};

export default nextConfig;
