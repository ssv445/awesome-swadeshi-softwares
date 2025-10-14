import fs from 'fs'
import path from 'path'
import { SoftwareWithMeta } from './server-data'
import { getAllSoftware } from './server-data'

const DATA_DIR = path.join(process.cwd(), 'data')
const PURPOSE_DIR = path.join(DATA_DIR, 'purpose')

export interface PurposeConfig {
  slug: string
  aliases?: string[]
  title: string
  description: string
  hero: {
    title: string
    subtitle: string
  }
  whyChoose: Array<{
    icon: string
    title: string
    description: string
  }>
  comparison: {
    title: string
    international: {
      label: string
      points: string[]
    }
    swadeshi: {
      label: string
      points: string[]
    }
  }
  faqs: Array<{
    question: string
    answer: string
  }>
  relatedPurposes: string[]
  category: string
}

/**
 * Get all purpose slugs from individual JSON files in /data/purpose/
 */
export function getAllPurposeSlugs(): string[] {
  try {
    if (!fs.existsSync(PURPOSE_DIR)) {
      console.warn('Purpose directory does not exist')
      return []
    }

    const files = fs.readdirSync(PURPOSE_DIR)
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''))
  } catch (error) {
    console.error('Error reading purpose directory:', error)
    return []
  }
}

/**
 * Get all purpose slugs including aliases
 * Returns array of [primary-slug, alias1, alias2, ...]
 */
export function getAllPurposeSlugswithAliases(): Map<string, string> {
  const slugMap = new Map<string, string>() // alias -> primary slug

  try {
    const purposeSlugs = getAllPurposeSlugs()

    for (const slug of purposeSlugs) {
      const config = getPurposeConfig(slug)
      if (config) {
        // Map primary slug to itself
        slugMap.set(slug, slug)

        // Map aliases to primary slug
        if (config.aliases) {
          for (const alias of config.aliases) {
            slugMap.set(alias, slug)
          }
        }
      }
    }
  } catch (error) {
    console.error('Error building purpose slug map:', error)
  }

  return slugMap
}

/**
 * Get configuration for a specific type from individual JSON file
 */
export function getPurposeConfig(purposeSlug: string): PurposeConfig | null {
  try {
    const filePath = path.join(PURPOSE_DIR, `${purposeSlug}.json`)

    if (!fs.existsSync(filePath)) {
      // Check if it's an alias
      const slugMap = getAllPurposeSlugswithAliases()
      const primarySlug = slugMap.get(purposeSlug)

      if (primarySlug && primarySlug !== purposeSlug) {
        // It's an alias, fetch the primary type
        return getPurposeConfig(primarySlug)
      }

      return null
    }

    const configData = fs.readFileSync(filePath, 'utf-8')
    const config: PurposeConfig = JSON.parse(configData)
    return config
  } catch (error) {
    console.error(`Error reading config for purpose ${purposeSlug}:`, error)
    return null
  }
}

/**
 * Get all apps that have a specific purpose
 */
export function getAppsByPurpose(purposeSlug: string): SoftwareWithMeta[] {
  const allApps = getAllSoftware()
  return allApps.filter((app) => {
    const purpose = (app as any).purpose as string[] | undefined
    return purpose && Array.isArray(purpose) && purpose.includes(purposeSlug)
  })
}

/**
 * Get featured apps for a purpose (limit to first N apps)
 */
export function getFeaturedAppsByPurpose(purposeSlug: string, limit: number = 6): SoftwareWithMeta[] {
  const apps = getAppsByPurpose(purposeSlug)
  return apps.slice(0, limit)
}

/**
 * Get related type configs for a given type
 */
export function getRelatedPurposeConfigs(purposeSlug: string): Array<{ slug: string; config: PurposeConfig }> {
  const config = getPurposeConfig(purposeSlug)
  if (!config || !config.relatedPurposes) return []

  return config.relatedPurposes
    .map((relatedSlug) => {
      const relatedConfig = getPurposeConfig(relatedSlug)
      return relatedConfig ? { slug: relatedSlug, config: relatedConfig } : null
    })
    .filter((item): item is { slug: string; config: PurposeConfig } => item !== null)
}

/**
 * Check if a slug is a purpose (including aliases)
 */
export function isPurposeSlug(slug: string): boolean {
  const slugMap = getAllPurposeSlugswithAliases()
  return slugMap.has(slug)
}

