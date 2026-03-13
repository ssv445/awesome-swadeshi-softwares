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
      // Old e-commerce redirects → new category locations
      {
        source: '/e-commerce/paytm-mall',
        destination: '/finance/paytm',
        permanent: true,
      },
      // Old Freshworks sub-product pages → unified freshworks entry
      {
        source: '/business/freshsales',
        destination: '/business/freshworks',
        permanent: true,
      },
      {
        source: '/business/freshchat',
        destination: '/business/freshworks',
        permanent: true,
      },
      {
        source: '/business/freshcaller',
        destination: '/business/freshworks',
        permanent: true,
      },
      {
        source: '/business/freshdesk',
        destination: '/business/freshworks',
        permanent: true,
      },
      {
        source: '/business/freshservice',
        destination: '/business/freshworks',
        permanent: true,
      },
      {
        source: '/business/freshmarketer',
        destination: '/business/freshworks',
        permanent: true,
      },
      {
        source: '/business/jioaicloud',
        destination: '/business',
        permanent: true,
      },
      // Old finance app redirects → new locations
      {
        source: '/finance/razorpay-payment-gateway',
        destination: '/finance/razorpay',
        permanent: true,
      },
      {
        source: '/finance/paytm-business',
        destination: '/finance/paytm',
        permanent: true,
      },
      {
        source: '/finance/paytm-wallet',
        destination: '/finance/paytm',
        permanent: true,
      },
      // not-swadeshi-apps → new category locations (migration)
      {
        source: '/not-swadeshi-apps/flipkart',
        destination: '/e-commerce/flipkart',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/paytm',
        destination: '/finance/paytm',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/makemytrip',
        destination: '/travel/makemytrip',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/ola-cabs',
        destination: '/travel/ola-cabs',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/swiggy',
        destination: '/e-commerce/swiggy',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/zomato',
        destination: '/e-commerce/zomato',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/policybazaar',
        destination: '/finance/policybazaar',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/phonepe',
        destination: '/finance/phonepe',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/postman',
        destination: '/development/postman',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/unacademy',
        destination: '/education/unacademy',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/chargebee',
        destination: '/finance/chargebee',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/razorpay',
        destination: '/finance/razorpay',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/freshworks',
        destination: '/business/freshworks',
        permanent: true,
      },
      {
        source: "/not-swadeshi-apps/byju's",
        destination: '/education/byjus',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps/byju-s',
        destination: '/education/byjus',
        permanent: true,
      },
      {
        source: '/not-swadeshi-apps',
        destination: '/',
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