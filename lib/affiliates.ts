import fs from 'fs'
import path from 'path'

export interface AffiliateEntry {
  affiliateUrl: string
  program: string
  commission: string
  status: 'active' | 'paused'
  addedDate: string
}

export type AffiliateRegistry = Record<string, AffiliateEntry>

// Load affiliate registry at build time (server-side only)
export function getAffiliateRegistry(): AffiliateRegistry {
  const filePath = path.join(process.cwd(), 'data', 'affiliates.json')

  try {
    if (!fs.existsSync(filePath)) {
      return {}
    }
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.warn('Error loading affiliate registry:', error)
    return {}
  }
}

// Get affiliate URL for a specific app slug, or null if none exists
export function getAffiliateUrl(appSlug: string): string | null {
  const registry = getAffiliateRegistry()
  const entry = registry[appSlug]
  if (entry && entry.status === 'active') {
    return entry.affiliateUrl
  }
  return null
}

// Check if an app has an active affiliate link
export function hasAffiliate(appSlug: string): boolean {
  return getAffiliateUrl(appSlug) !== null
}
