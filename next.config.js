/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirect non-www to www so Google sees only one canonical URL
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'acezon.app' }],
        destination: 'https://www.acezon.app/:path*',
        permanent: true,
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