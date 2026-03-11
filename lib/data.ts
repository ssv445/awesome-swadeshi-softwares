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
  companySlug?: string // Links app to a company in data/companies.json for Swadeshi Meter
  pros?: string[]              // Genuine strengths from reviews
  cons?: string[]              // Known issues and limitations
  userComplaints?: string[]    // Real complaints from app stores, Reddit, Twitter
  rating?: number              // Aggregated rating from a public source
  ratingSource?: string        // Where the rating came from
  lastVerified?: string        // ISO date when data was last checked
}

// ===========================
// Swadeshi Meter Types
// ===========================

export interface SwadeshiFactorScore {
  score: number        // 0-100
  note: string         // Human-readable explanation
  source?: string      // Citation for auditability
}

export interface SwadeshiMeterData {
  score: number                    // Weighted final score 0-100
  lastVerified: string             // ISO date YYYY-MM-DD
  dataCompleteness: number         // How many of 7 factors have data
  factors: {
    shareholding?: SwadeshiFactorScore
    incorporation?: SwadeshiFactorScore
    boardControl?: SwadeshiFactorScore
    founders?: SwadeshiFactorScore
    hqAndTeam?: SwadeshiFactorScore
    dataSovereignty?: SwadeshiFactorScore
    revenueOrigin?: SwadeshiFactorScore
  }
}

export interface Company {
  name: string
  slug: string
  hq: string
  incorporation: string
  founders: string
  foundersActive: boolean
  swadeshiMeter: SwadeshiMeterData
}

export interface CompaniesData {
  companies: Record<string, Company>
  meta: {
    weights: Record<string, number>
    version: string
    lastUpdated: string
  }
}

export const SWADESHI_WEIGHTS: Record<string, number> = {
  shareholding: 0.35,
  incorporation: 0.20,
  boardControl: 0.15,
  founders: 0.10,
  hqAndTeam: 0.10,
  dataSovereignty: 0.05,
  revenueOrigin: 0.05,
}

export const SWADESHI_TIERS = [
  { min: 80, label: 'Highly Swadeshi', color: '#138808', bgClass: 'bg-green-100 text-green-800 border-green-300' },
  { min: 60, label: 'Mostly Swadeshi', color: '#FF9933', bgClass: 'bg-orange-100 text-orange-800 border-orange-300' },
  { min: 40, label: 'Mixed Ownership', color: '#EAB308', bgClass: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { min: 20, label: 'Mostly Foreign', color: '#EA580C', bgClass: 'bg-amber-100 text-amber-800 border-amber-300' },
  { min: 0,  label: 'Foreign Controlled', color: '#DC2626', bgClass: 'bg-red-100 text-red-800 border-red-300' },
] as const

export function getSwadeshiTier(score: number) {
  return SWADESHI_TIERS.find(tier => score >= tier.min) || SWADESHI_TIERS[SWADESHI_TIERS.length - 1]
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
// Re-export from centralized links module for backward compatibility
export {
  getCategoryUrl,
  getAppUrl,
  getAlternativeUrl,
  getNotSwadeshiUrl,
  getPurposeUrl,
  getAbsoluteUrl,
  getAbsoluteCategoryUrl,
  getAbsoluteAppUrl,
  getAbsoluteAlternativeUrl,
  slugify,
} from './links'

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