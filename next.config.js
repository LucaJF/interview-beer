/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.punkapi.com',
        port: '',
        pathname: '/v2/**',
      },
    ],
  },
};

module.exports = nextConfig;
