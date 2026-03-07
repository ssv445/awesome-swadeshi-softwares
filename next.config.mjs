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
    // Old -alternative suffix URLs whose base slug has no alternatives page.
    // Use 302 (temporary) since /alternatives is not semantically the right
    // canonical for these specific queries.
    const deadEndAlternatives = [
      '8x8', 'aircall', 'alexa', 'amazon-fresh', 'amplitude', 'android',
      'bigbasket', 'brave-browser', 'braze',
      'ccavenue', 'cortana', 'etsy', 'google-pay',
      'harmonyos', 'hubspot-crm', 'hubspot-marketing', 'hugging-face',
      'instacart', 'instamojo', 'ios', 'jira-service-management',
      'lightspeed', 'manageengine', 'paw', 'plaid',
      'rest-client', 'ringcentral', 'salesforce-sales-cloud', 'servicenow',
      'settle-up', 'square', 'toast-pos', 'venmo',
      'walmart', 'walmart-grocery', 'wayfair', 'zuora',
    ]

    return [
      // Dead-end -alternative URLs → /alternatives listing (37 URLs)
      // Use 302 temporary — /alternatives is not the canonical for these queries
      ...deadEndAlternatives.map((slug) => ({
        source: `/alternatives/${slug}-alternative`,
        destination: '/alternatives',
        permanent: false,
      })),
      // Dot-containing slugs: explicit redirects to their slugified pages
      // These have valid destination pages but the catch-all would preserve
      // the dots and create 301→404 chains
      { source: '/alternatives/booking.com-alternative', destination: '/alternatives/booking-com', permanent: true },
      { source: '/alternatives/domain.com-alternative', destination: '/alternatives/domain-com', permanent: true },
      { source: '/alternatives/monday.com-alternative', destination: '/alternatives/monday-com', permanent: true },
      { source: '/alternatives/simplybook.me-alternative', destination: '/alternatives/simplybook-me', permanent: true },
      { source: "/alternatives/byju's-alternative", destination: '/alternatives/byjus', permanent: true },
      // URL with space: /alternatives/disney -hotstar-alternative
      {
        source: '/alternatives/disney%20-hotstar-alternative',
        destination: '/alternatives/disney-hotstar',
        permanent: true,
      },
      // Pattern: /alternatives/X-alternative → /alternatives/X (remaining old URLs)
      {
        source: '/alternatives/:slug-alternative',
        destination: '/alternatives/:slug',
        permanent: true,
      },
      // Old category rename: hosting-&-domains → hosting
      // Include both literal & and URL-encoded %26 since browser behavior varies
      {
        source: '/hosting-&-domains/:slug',
        destination: '/hosting/:slug',
        permanent: true,
      },
      {
        source: '/hosting-%26-domains/:slug',
        destination: '/hosting/:slug',
        permanent: true,
      },
      {
        source: '/hosting-&-domains',
        destination: '/hosting',
        permanent: true,
      },
      {
        source: '/hosting-%26-domains',
        destination: '/hosting',
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
      // Deleted Freshworks apps → not-swadeshi-apps/freshworks
      {
        source: '/business/freshsales',
        destination: '/not-swadeshi-apps/freshworks',
        permanent: true,
      },
      {
        source: '/business/freshchat',
        destination: '/not-swadeshi-apps/freshworks',
        permanent: true,
      },
      {
        source: '/business/freshcaller',
        destination: '/not-swadeshi-apps/freshworks',
        permanent: true,
      },
      {
        source: '/business/freshdesk',
        destination: '/not-swadeshi-apps/freshworks',
        permanent: true,
      },
      {
        source: '/business/freshservice',
        destination: '/not-swadeshi-apps/freshworks',
        permanent: true,
      },
      {
        source: '/business/freshmarketer',
        destination: '/not-swadeshi-apps/freshworks',
        permanent: true,
      },
      {
        source: '/business/jioaicloud',
        destination: '/business',
        permanent: true,
      },
      // Deleted finance apps → not-swadeshi-apps equivalents
      {
        source: '/finance/razorpay-payment-gateway',
        destination: '/not-swadeshi-apps/razorpay',
        permanent: true,
      },
      {
        source: '/finance/chargebee',
        destination: '/not-swadeshi-apps/chargebee',
        permanent: true,
      },
      {
        source: '/finance/paytm-business',
        destination: '/not-swadeshi-apps/paytm',
        permanent: true,
      },
      {
        source: '/finance/paytm-wallet',
        destination: '/not-swadeshi-apps/paytm',
        permanent: true,
      },
      // Deleted app pages → not-swadeshi-apps equivalents
      {
        source: '/development/postman',
        destination: '/not-swadeshi-apps/postman',
        permanent: true,
      },
      {
        source: '/education/unacademy',
        destination: '/not-swadeshi-apps/unacademy',
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