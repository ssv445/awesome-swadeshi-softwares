export interface OpenGraph {
  // Core OpenGraph fields
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  site_name?: string
  locale?: string
  // Twitter Card fields
  twitter_card?: string
  twitter_site?: string
  twitter_creator?: string
  twitter_image?: string
  twitter_title?: string
  twitter_description?: string
  // Tracking metadata
  last_updated: string  // ISO 8601 UTC timestamp
  // Additional OG fields (flexible for any other og: or twitter: tags)
  // Note: Some Twitter app fields may have complex names like "twitter_app:name:iphone"
  [key: string]: string | undefined
}

export interface Category {
  slug: string
  name: string
  description: string
  icon: string
  color: string
  keywords: string[]
  featured: boolean
  order: number
}

export interface CategoriesData {
  categories: Category[]
  meta: {
    totalCategories: number
    lastUpdated: string
    version: string
  }
}

export interface Software {
  name: string
  slug: string // Explicit URL slug (required for canonical URLs)
  aliases?: string[] // Alternative slugs for redirects (optional)
  description: string
  website: string
  category: string // Category slug (e.g., "business", "finance", "hosting") - matches directory name and categories.json slugs
  purpose?: string[] // Optional purpose tags (e.g., ["messaging-app", "browser"])
  alternatives: string[]
  pricing: string
  company: string
  location: string
  faviconUrl?: string // Optional custom favicon URL
  appStoreUrl?: string // Optional Apple App Store URL
  playStoreUrl?: string // Optional Google Play Store URL
  opengraph?: OpenGraph // Optional OpenGraph metadata
  featured_reason?: string // Optional featured reason (for homepage display)
}

// ===========================
// Display Name Utilities
// ===========================

// Category slug to display name mapping (sourced from categories.json)
const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  'business': 'Business',
  'communication': 'Communication',
  'creative': 'Creative',
  'development': 'Development',
  'e-commerce': 'E-Commerce',
  'education': 'Education',
  'entertainment': 'Entertainment',
  'finance': 'Finance',
  'hosting': 'Hosting and Domains',
  'productivity': 'Productivity',
  'social-networking': 'Social Networking',
  'travel': 'Travel',
  'utilities': 'Utilities'
}

// Convert category slug to display name (client-safe utility)
export function getCategoryDisplayName(slug: string): string {
  return CATEGORY_DISPLAY_NAMES[slug] || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// ===========================
// URL Generation Functions
// ===========================

// Generate category page URL from category slug
export function getCategoryUrl(categorySlug: string): string {
  return `/${categorySlug.toLowerCase().replace(/\s+/g, '-')}`
}

// Generate app detail page URL from category slug and app slug
export function getAppUrl(categorySlug: string, appSlug: string): string {
  return `/${categorySlug}/${appSlug}`
}

// Generate alternative page URL from international tool name
export function getAlternativeUrl(internationalTool: string): string {
  return `/alternatives/${internationalTool.toLowerCase().replace(/\s+/g, '-')}`
}

// Generate "not swadeshi apps" page URL from company/app name
export function getNotSwadeshiUrl(companyOrAppName: string): string {
  return `/not-swadeshi-apps/${companyOrAppName.toLowerCase().replace(/\s+/g, '-')}`
}

// ===========================
// Favicon Utilities
// ===========================

// Generate favicon URL using Google's favicon API
export function getFaviconUrl(websiteUrl: string, size: number = 256): string {
  try {
    const url = new URL(websiteUrl)
    const domain = url.hostname.replace(/^www\./, '') // Remove www. prefix
    return `https://www.google.com/s2/favicons?sz=${size}&domain=${domain}`
  } catch (error) {
    // If URL is invalid, return a default/fallback favicon
    return `https://www.google.com/s2/favicons?sz=${size}&domain=example.com`
  }
}