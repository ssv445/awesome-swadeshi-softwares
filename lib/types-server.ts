import fs from 'fs'
import path from 'path'
import { SoftwareWithMeta } from './server-data'
import { getAllSoftware } from './server-data'

const DATA_DIR = path.join(process.cwd(), 'data')
const TYPES_DIR = path.join(DATA_DIR, 'types')

export interface TypeConfig {
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
  relatedTypes: string[]
  category: string
}

/**
 * Get all type slugs from individual JSON files in /data/types/
 */
export function getAllTypeSlugs(): string[] {
  try {
    if (!fs.existsSync(TYPES_DIR)) {
      console.warn('Types directory does not exist')
      return []
    }

    const files = fs.readdirSync(TYPES_DIR)
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''))
  } catch (error) {
    console.error('Error reading types directory:', error)
    return []
  }
}

/**
 * Get all type slugs including aliases
 * Returns array of [primary-slug, alias1, alias2, ...]
 */
export function getAllTypeSlugswithAliases(): Map<string, string> {
  const slugMap = new Map<string, string>() // alias -> primary slug

  try {
    const typeSlugs = getAllTypeSlugs()

    for (const slug of typeSlugs) {
      const config = getTypeConfig(slug)
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
    console.error('Error building type slug map:', error)
  }

  return slugMap
}

/**
 * Get configuration for a specific type from individual JSON file
 */
export function getTypeConfig(typeSlug: string): TypeConfig | null {
  try {
    const filePath = path.join(TYPES_DIR, `${typeSlug}.json`)

    if (!fs.existsSync(filePath)) {
      // Check if it's an alias
      const slugMap = getAllTypeSlugswithAliases()
      const primarySlug = slugMap.get(typeSlug)

      if (primarySlug && primarySlug !== typeSlug) {
        // It's an alias, fetch the primary type
        return getTypeConfig(primarySlug)
      }

      return null
    }

    const configData = fs.readFileSync(filePath, 'utf-8')
    const config: TypeConfig = JSON.parse(configData)
    return config
  } catch (error) {
    console.error(`Error reading config for type ${typeSlug}:`, error)
    return null
  }
}

/**
 * Get all apps that have a specific type
 */
export function getAppsByType(typeSlug: string): SoftwareWithMeta[] {
  const allApps = getAllSoftware()
  return allApps.filter((app) => {
    const types = (app as any).types as string[] | undefined
    return types && Array.isArray(types) && types.includes(typeSlug)
  })
}

/**
 * Get featured apps for a type (limit to first N apps)
 */
export function getFeaturedAppsByType(typeSlug: string, limit: number = 6): SoftwareWithMeta[] {
  const apps = getAppsByType(typeSlug)
  return apps.slice(0, limit)
}

/**
 * Get related type configs for a given type
 */
export function getRelatedTypeConfigs(typeSlug: string): Array<{ slug: string; config: TypeConfig }> {
  const config = getTypeConfig(typeSlug)
  if (!config || !config.relatedTypes) return []

  return config.relatedTypes
    .map((relatedSlug) => {
      const relatedConfig = getTypeConfig(relatedSlug)
      return relatedConfig ? { slug: relatedSlug, config: relatedConfig } : null
    })
    .filter((item): item is { slug: string; config: TypeConfig } => item !== null)
}

/**
 * Check if a slug is a type (including aliases)
 */
export function isTypeSlug(slug: string): boolean {
  const slugMap = getAllTypeSlugswithAliases()
  return slugMap.has(slug)
}

/**
 * Get category-to-types mapping
 */
export function getCategoryTypesMapping(): Record<string, string[]> {
  try {
    const mappingPath = path.join(DATA_DIR, 'category-types-mapping.json')
    const mappingData = fs.readFileSync(mappingPath, 'utf-8')
    return JSON.parse(mappingData)
  } catch (error) {
    console.error('Error reading category-types-mapping.json:', error)
    return {}
  }
}

/**
 * Get types for a specific category
 */
export function getTypesForCategory(categorySlug: string): string[] {
  const mapping = getCategoryTypesMapping()
  return mapping[categorySlug] || []
}
