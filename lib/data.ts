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

export interface SwadeshiMeter {
  indianOwnership: number // 0-100 percentage of Indian shareholding
  indianFounders: number // 0-100 percentage of Indian founders
  originatedInIndia: boolean // Company originated/founded in India
  headquartersInIndia: boolean // Headquarters located in India
  indianEmployees: number // 0-100 percentage of employees in India
  registeredInIndia: boolean // Registered under Indian law
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
  swadeshiMeter?: SwadeshiMeter // Optional Swadeshi meter for measuring Indian-ness
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
// Swadeshi Meter Utilities
// ===========================

/**
 * Calculate the Swadeshi score based on meter parameters
 * @param meter - SwadeshiMeter object with all parameters
 * @returns Score from 0-100
 *
 * Scoring weights:
 * - Indian Ownership: 25%
 * - Indian Founders: 20%
 * - Originated in India: 15%
 * - Headquarters in India: 15%
 * - Indian Employees: 15%
 * - Registered in India: 10%
 */
export function calculateSwadeshiScore(meter: SwadeshiMeter): number {
  const ownershipScore = (meter.indianOwnership / 100) * 25
  const foundersScore = (meter.indianFounders / 100) * 20
  const originScore = meter.originatedInIndia ? 15 : 0
  const headquartersScore = meter.headquartersInIndia ? 15 : 0
  const employeesScore = (meter.indianEmployees / 100) * 15
  const registeredScore = meter.registeredInIndia ? 10 : 0

  const totalScore = ownershipScore + foundersScore + originScore + headquartersScore + employeesScore + registeredScore

  // Round to 1 decimal place
  return Math.round(totalScore * 10) / 10
}

/**
 * Get the Swadeshi rating category based on score
 * @param score - Swadeshi score (0-100)
 * @returns Rating category
 */
export function getSwadeshiRating(score: number): {
  label: string
  description: string
  color: string
} {
  if (score >= 90) {
    return {
      label: 'Completely Swadeshi',
      description: 'Fully Indian in all aspects',
      color: 'green'
    }
  } else if (score >= 75) {
    return {
      label: 'Highly Swadeshi',
      description: 'Predominantly Indian',
      color: 'lime'
    }
  } else if (score >= 60) {
    return {
      label: 'Moderately Swadeshi',
      description: 'Significantly Indian',
      color: 'yellow'
    }
  } else if (score >= 40) {
    return {
      label: 'Partially Swadeshi',
      description: 'Some Indian ownership/operations',
      color: 'orange'
    }
  } else {
    return {
      label: 'Minimally Swadeshi',
      description: 'Limited Indian presence',
      color: 'red'
    }
  }
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