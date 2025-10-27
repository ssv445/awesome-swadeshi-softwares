import withPWA from '@ducanh2912/next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // All pages are force-static, no ISR used
  // See individual page exports for: export const dynamic = 'force-static'
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // Exclude API routes and other dynamic paths
  buildExcludes: [/middleware-manifest\.json$/],
})(nextConfig)