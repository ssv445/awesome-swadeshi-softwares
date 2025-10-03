/**
 * Application constants and configuration
 */

// Pagination & Display
export const ITEMS_PER_PAGE = 12
export const FEATURED_COUNT = 10
export const FEATURED_PRODUCT_LIMIT = 15
export const RELATED_APPS_LIMIT = 6
export const SEARCH_MIN_LENGTH = 1
export const SEARCH_MAX_RESULTS = 8
export const DESCRIPTION_PREVIEW_WORDS = 10
export const ALTERNATIVES_LIMIT = 3

// SEO
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Awesome Swadeshi Apps"
export const SITE_DESCRIPTION = "Discover India's Leading Apps & Platforms. Join the Swadeshi movement by choosing Indian apps that compete globally."
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://swadeshiapps.com/"
export const SITE_AUTHOR = "Awesome Swadeshi Team"

// Social
export const GITHUB_URL = "https://github.com/ssv445/awesome-swadeshi-softwares"

// Categories display names
export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  business: "Business",
  communication: "Communication",
  creative: "Creative",
  development: "Development",
  "e-commerce": "E-Commerce",
  education: "Education",
  entertainment: "Entertainment",
  finance: "Finance",
  productivity: "Productivity",
  "social-networking": "Social Networking",
  utilities: "Utilities"
}

// Category descriptions for SEO
export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  business: "Discover Indian business software for CRM, HR, analytics, and enterprise solutions",
  communication: "Indian communication apps for messaging, video calls, and team collaboration",
  creative: "Creative tools and design software developed by Indian companies",
  development: "Developer tools, APIs, and platforms built by Indian tech companies",
  "e-commerce": "Indian e-commerce platforms and online selling solutions",
  education: "Educational technology and learning platforms from India",
  entertainment: "Streaming, music, and entertainment apps from Indian developers",
  finance: "Indian fintech solutions for payments, banking, and financial services",
  productivity: "Productivity and office tools designed by Indian software companies",
  "social-networking": "Social media and networking platforms developed in India",
  utilities: "Utility apps and system tools created by Indian developers"
}

// Default meta tags
export const DEFAULT_META = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: "Indian apps, Made in India, Swadeshi software, Indian alternatives, Atmanirbhar Bharat, Indian startups",
  author: SITE_AUTHOR,
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1"
}

// OpenGraph defaults
export const DEFAULT_OG = {
  siteName: SITE_NAME,
  type: "website",
  locale: "en_IN",
  url: SITE_URL
}

// Navigation links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Add App" },
  { href: "/why-swadeshi", label: "Why Swadeshi?" }
] as const

// Footer links
export const FOOTER_LINKS = {
  main: [
    { href: "/", label: "Home" },
    { href: "/about", label: "Add App" },
    { href: "/why-swadeshi", label: "Why Swadeshi?" },
    { href: "/alternatives", label: "Alternatives" }
  ],
  categories: [
    { href: "/business", label: "Business" },
    { href: "/finance", label: "Finance" },
    { href: "/development", label: "Development" },
    { href: "/communication", label: "Communication" }
  ],
  social: [
    { href: GITHUB_URL, label: "GitHub" }
  ]
} as const

// Animation durations (in milliseconds)
export const ANIMATIONS = {
  fast: 150,
  normal: 250,
  slow: 400
} as const

// Breakpoints (matches theme.ts)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
} as const

// File paths
export const PATHS = {
  data: "/data",
  searchIndex: "/search-index.json",
  images: "/images",
  favicons: "/favicons"
} as const