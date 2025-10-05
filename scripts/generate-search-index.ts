#!/usr/bin/env node

/**
 * Build-time search index generator
 * Creates a static search index from all JSON files for fast client-side search
 */

import fs from 'fs'
import path from 'path'
import type { Software } from '../lib/data'

interface SearchIndexEntry {
  id: string
  name: string
  company: string
  category: string
  slug: string
  // Only store essential search terms
  searchTerms: string
}

interface SearchIndex {
  entries: SearchIndexEntry[]
  meta: {
    totalEntries: number
    categories: string[]
    generatedAt: string
    version: string
  }
}

/**
 * Create search terms string (simplified)
 */
function createSearchTerms(software: Software): string {
  const terms = [
    software.name,
    software.company,
    software.category,
    ...software.alternatives.slice(0, 3), // Only first 3 alternatives
    software.description.split(' ').slice(0, 10).join(' ') // Only first 10 words of description
  ]

  return terms
    .join(' ')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Convert filename to slug (fallback only)
 */
function filenameToSlug(filename: string): string {
  return filename.replace('.json', '')
}

/**
 * Get slug from software data (prefers explicit slug field)
 */
function getSlug(software: Software, filename: string): string {
  return software.slug || filenameToSlug(filename)
}

/**
 * Read all software data from JSON files
 */
function getAllSoftwareData(): { software: Software; category: string; slug: string }[] {
  const dataDir = path.join(process.cwd(), 'data')
  const allSoftware: { software: Software; category: string; slug: string }[] = []

  try {
    const categories = fs.readdirSync(dataDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    for (const category of categories) {
      const categoryPath = path.join(dataDir, category)

      try {
        const files = fs.readdirSync(categoryPath)
          .filter(file => file.endsWith('.json'))

        for (const file of files) {
          const filePath = path.join(categoryPath, file)
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const software = JSON.parse(fileContent) as Software
          // Use explicit slug from JSON (with filename as fallback)
          const slug = getSlug(software, file)

          allSoftware.push({ software, category, slug })
        }
      } catch (error) {
        console.warn(`Error reading category ${category}:`, error)
      }
    }
  } catch (error) {
    console.error('Error reading data directory:', error)
  }

  return allSoftware
}

/**
 * Create search index entry from software data
 */
function createSearchIndexEntry(
  software: Software,
  category: string,
  slug: string
): SearchIndexEntry {
  return {
    id: `${category}/${slug}`,
    name: software.name,
    company: software.company,
    category: software.category,
    slug,
    searchTerms: createSearchTerms(software)
  }
}

/**
 * Generate search index
 */
function generateSearchIndex(): SearchIndex {
  console.log('🔍 Generating search index...')

  const allSoftwareData = getAllSoftwareData()
  console.log(`📦 Found ${allSoftwareData.length} apps across ${new Set(allSoftwareData.map(s => s.category)).size} categories`)

  const entries: SearchIndexEntry[] = allSoftwareData.map(({ software, category, slug }) =>
    createSearchIndexEntry(software, category, slug)
  )

  const categories = [...new Set(allSoftwareData.map(s => s.category))].sort()

  const searchIndex: SearchIndex = {
    entries,
    meta: {
      totalEntries: entries.length,
      categories,
      generatedAt: new Date().toISOString(),
      version: '1.0.0'
    }
  }

  console.log(`✅ Generated search index with ${entries.length} entries`)
  console.log(`📁 Categories: ${categories.join(', ')}`)

  return searchIndex
}

/**
 * Write search index to public directory
 */
function writeSearchIndex(searchIndex: SearchIndex): void {
  const publicDir = path.join(process.cwd(), 'public')
  const indexPath = path.join(publicDir, 'search-index.json')

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(indexPath, JSON.stringify(searchIndex, null, 2))

  const sizeKB = Math.round(fs.statSync(indexPath).size / 1024)
  console.log(`💾 Search index written to /public/search-index.json (${sizeKB}KB)`)
}

/**
 * Main function
 */
function main() {
  try {
    const startTime = Date.now()

    const searchIndex = generateSearchIndex()
    writeSearchIndex(searchIndex)

    const endTime = Date.now()
    console.log(`⚡ Search index generated in ${endTime - startTime}ms`)

  } catch (error) {
    console.error('❌ Error generating search index:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

export { generateSearchIndex, writeSearchIndex }