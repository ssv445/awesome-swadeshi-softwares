import withPWA from '@ducanh2912/next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // All pages are force-static, no ISR used
  // See individual page exports for: export const dynamic = 'force-static'

  // Redirects to fix 404s from old URL structure (420 URLs in GSC)
  async redirects() {
    return [
      // Pattern: /alternatives/X-alternative → /alternatives/X (394 old URLs)
      {
        source: '/alternatives/:slug-alternative',
        destination: '/alternatives/:slug',
        permanent: true,
      },
      // Old category rename: hosting-&-domains → hosting
      {
        source: '/hosting-&-domains/:slug',
        destination: '/hosting/:slug',
        permanent: true,
      },
      // Moved apps: e-commerce → not-swadeshi-apps
      {
        source: '/e-commerce/flipkart',
        destination: '/not-swadeshi-apps/flipkart',
        permanent: true,
      },
      {
        source: '/e-commerce/paytm-mall',
        destination: '/not-swadeshi-apps/paytm',
        permanent: true,
      },
      // Deleted Freshworks apps → business category
      {
        source: '/business/freshsales',
        destination: '/business',
        permanent: true,
      },
      {
        source: '/business/freshchat',
        destination: '/business',
        permanent: true,
      },
      {
        source: '/business/freshcaller',
        destination: '/business',
        permanent: true,
      },
      {
        source: '/business/freshdesk',
        destination: '/business',
        permanent: true,
      },
      {
        source: '/business/freshservice',
        destination: '/business',
        permanent: true,
      },
      {
        source: '/business/freshmarketer',
        destination: '/business',
        permanent: true,
      },
      {
        source: '/business/jioaicloud',
        destination: '/business',
        permanent: true,
      },
      // Deleted finance apps → finance category
      {
        source: '/finance/razorpay-payment-gateway',
        destination: '/finance',
        permanent: true,
      },
      {
        source: '/finance/chargebee',
        destination: '/finance',
        permanent: true,
      },
      {
        source: '/finance/paytm-business',
        destination: '/finance',
        permanent: true,
      },
      {
        source: '/finance/paytm-wallet',
        destination: '/finance',
        permanent: true,
      },
      // Deleted app pages → their categories
      {
        source: '/development/postman',
        destination: '/development',
        permanent: true,
      },
      {
        source: '/education/unacademy',
        destination: '/education',
        permanent: true,
      },
      {
        source: '/entertainment/jiohotstar',
        destination: '/entertainment',
        permanent: true,
      },
      {
        source: '/communication/jiomeet',
        destination: '/communication',
        permanent: true,
      },
      {
        source: '/communication/krutrim-contact-center-ai',
        destination: '/communication',
        permanent: true,
      },
      {
        source: '/productivity/kruti-ai',
        destination: '/productivity',
        permanent: true,
      },
      // Deleted alternatives (no -alternative suffix, just missing pages)
      {
        source: '/alternatives/android',
        destination: '/alternatives',
        permanent: true,
      },
      {
        source: '/alternatives/hubspot-marketing',
        destination: '/alternatives',
        permanent: true,
      },
      {
        source: '/alternatives/instamojo',
        destination: '/alternatives',
        permanent: true,
      },
      {
        source: '/alternatives/ringcentral',
        destination: '/alternatives',
        permanent: true,
      },
    ]
  },
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // Exclude API routes and other dynamic paths
  buildExcludes: [/middleware-manifest\.json$/],
})(nextConfig)