export interface Software {
  name: string
  description: string
  website: string
  category: string
  alternatives: string[]
  pricing: string
  company: string
  location: string
  faviconUrl?: string // Optional custom favicon URL
}

// Convert category slug to display name (client-safe utility)
export function getCategoryDisplayName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Generate alternative page URL from international tool name
export function getAlternativeUrl(internationalTool: string): string {
  return `/alternatives/${internationalTool.toLowerCase().replace(/\s+/g, '-')}`
}

// Generate favicon URL using Google's favicon API
export function getFaviconUrl(websiteUrl: string, size: number = 32): string {
  try {
    const url = new URL(websiteUrl)
    const domain = url.hostname.replace(/^www\./, '') // Remove www. prefix
    return `https://www.google.com/s2/favicons?sz=${size}&domain=${domain}`
  } catch (error) {
    // If URL is invalid, return a default/fallback favicon
    return `https://www.google.com/s2/favicons?sz=${size}&domain=example.com`
  }
}