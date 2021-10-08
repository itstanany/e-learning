const withPWA = require('next-pwa');
const { runtimeCaching } = require('./src/components/config/runtimeCaching');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: false,
    mode: 'production',
    skipWaiting: true,
    clientsClaim: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
});
