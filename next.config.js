/** @type {import('next').NextConfig} */

// ─── HTTP Security Headers ────────────────────────────────────────────────────
// Applied to every response. Protects against clickjacking, MIME sniffing,
// reflected XSS, and leaking referrer information to third parties.
const securityHeaders = [
  // Prevent browsers from MIME-sniffing a response away from the declared content-type
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Disallow the site from being embedded in any iframe (clickjacking protection)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Legacy XSS filter — still respected by some older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Send origin only on same-origin requests; strip on cross-origin downgrade
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable access to sensitive browser APIs that Acezon does not need
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
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
