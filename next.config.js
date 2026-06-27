/** @type {import('next').NextConfig} */
const nextConfig = {
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
