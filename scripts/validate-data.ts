#!/usr/bin/env node

/**
 * Build-time data validation script
 * Validates all JSON files in /data/ directory for required fields and data integrity
 */

import fs from 'fs'
import path from 'path'

interface Software {
  name: string
  slug: string
  aliases?: string[]
  description: string
  website: string
  category: string
  alternatives: string[]
  pricing: string
  company: string
  location: string
  faviconUrl?: string
  appStoreUrl?: string
  playStoreUrl?: string
}

const REQUIRED_FIELDS: (keyof Software)[] = [
  'name',
  'slug',
  'description',
  'website',
  'category',
  'alternatives',
  'pricing',
  'company',
  'location'
]

const VALID_PRICING_VALUES = ['Free', 'Freemium', 'Paid', 'Open Source']

// Load valid categories from categories.json
function getValidCategories(): string[] {
  try {
    const categoriesPath = path.join(process.cwd(), 'data', 'categories.json')
    const content = fs.readFileSync(categoriesPath, 'utf-8')
    const data = JSON.parse(content)
    return data.categories.map((cat: any) => cat.slug)
  } catch (error) {
    console.error('Warning: Could not load categories.json, skipping category validation')
    return []
  }
}

const VALID_CATEGORIES = getValidCategories()

interface ValidationError {
  file: string
  field?: string
  error: string
}

const errors: ValidationError[] = []
const warnings: ValidationError[] = []

function validateSoftware(filePath: string, data: any): void {
  const fileName = path.basename(filePath)

  // Check if data is an object
  if (typeof data !== 'object' || data === null) {
    errors.push({ file: fileName, error: 'File must contain a valid JSON object' })
    return
  }

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) {
      errors.push({ file: fileName, field, error: `Missing required field: ${field}` })
    }
  }

  // Validate field types
  if (data.name && typeof data.name !== 'string') {
    errors.push({ file: fileName, field: 'name', error: 'Name must be a string' })
  }

  if (data.description && typeof data.description !== 'string') {
    errors.push({ file: fileName, field: 'description', error: 'Description must be a string' })
  }

  if (data.website && typeof data.website !== 'string') {
    errors.push({ file: fileName, field: 'website', error: 'Website must be a string' })
  }

  // Validate URL format
  if (data.website) {
    try {
      new URL(data.website)
    } catch {
      errors.push({ file: fileName, field: 'website', error: 'Invalid website URL format' })
    }
  }

  // Validate alternatives array
  if (data.alternatives) {
    if (!Array.isArray(data.alternatives)) {
      errors.push({ file: fileName, field: 'alternatives', error: 'Alternatives must be an array' })
    } else if (data.alternatives.length === 0) {
      warnings.push({ file: fileName, field: 'alternatives', error: 'Alternatives array is empty' })
    }
  }

  // Validate category value (must match categories.json slugs)
  if (data.category && VALID_CATEGORIES.length > 0) {
    if (!VALID_CATEGORIES.includes(data.category)) {
      errors.push({
        file: fileName,
        field: 'category',
        error: `Invalid category "${data.category}". Must be one of: ${VALID_CATEGORIES.join(', ')}`
      })
    }
  }

  // Validate pricing value
  if (data.pricing && !VALID_PRICING_VALUES.includes(data.pricing)) {
    warnings.push({
      file: fileName,
      field: 'pricing',
      error: `Pricing value "${data.pricing}" is not standard. Expected: ${VALID_PRICING_VALUES.join(', ')}`
    })
  }

  // Validate description length
  if (data.description && data.description.length < 20) {
    warnings.push({ file: fileName, field: 'description', error: 'Description is too short (< 20 characters)' })
  }

  if (data.description && data.description.length > 500) {
    warnings.push({ file: fileName, field: 'description', error: 'Description is too long (> 500 characters)' })
  }

  // Validate company name
  if (data.company && data.company.length < 2) {
    errors.push({ file: fileName, field: 'company', error: 'Company name is too short' })
  }

  // Validate slug format
  if (data.slug && typeof data.slug === 'string') {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(data.slug)) {
      errors.push({ file: fileName, field: 'slug', error: 'Slug must be lowercase, alphanumeric, with hyphens only (e.g., "my-app-name")' })
    }
  }

  // Validate aliases format
  if (data.aliases) {
    if (!Array.isArray(data.aliases)) {
      errors.push({ file: fileName, field: 'aliases', error: 'Aliases must be an array' })
    } else {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
      data.aliases.forEach((alias: any, index: number) => {
        if (typeof alias !== 'string' || !slugRegex.test(alias)) {
          errors.push({ file: fileName, field: `aliases[${index}]`, error: 'Each alias must be lowercase, alphanumeric, with hyphens only' })
        }
      })
    }
  }

  // Check if slug matches filename (REQUIRED)
  const expectedSlug = fileName.replace('.json', '')
  if (data.slug && data.slug !== expectedSlug) {
    errors.push({ file: fileName, field: 'slug', error: `Slug "${data.slug}" MUST match filename "${expectedSlug}". Rename the file to "${data.slug}.json" or update slug to "${expectedSlug}".` })
  }

  // Validate App Store URL format (optional field)
  if (data.appStoreUrl) {
    if (typeof data.appStoreUrl !== 'string') {
      errors.push({ file: fileName, field: 'appStoreUrl', error: 'App Store URL must be a string' })
    } else if (!data.appStoreUrl.includes('apps.apple.com') && !data.appStoreUrl.includes('itunes.apple.com')) {
      warnings.push({ file: fileName, field: 'appStoreUrl', error: 'App Store URL should contain apps.apple.com or itunes.apple.com' })
    }
  }

  // Validate Play Store URL format (optional field)
  if (data.playStoreUrl) {
    if (typeof data.playStoreUrl !== 'string') {
      errors.push({ file: fileName, field: 'playStoreUrl', error: 'Play Store URL must be a string' })
    } else if (!data.playStoreUrl.includes('play.google.com/store/apps')) {
      warnings.push({ file: fileName, field: 'playStoreUrl', error: 'Play Store URL should contain play.google.com/store/apps' })
    }
  }
}

function validateAllData(): void {
  const dataDir = path.join(process.cwd(), 'data')

  try {
    const categories = fs.readdirSync(dataDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    let totalFiles = 0

    for (const category of categories) {
      const categoryPath = path.join(dataDir, category)

      try {
        const files = fs.readdirSync(categoryPath)
          .filter(file => file.endsWith('.json'))

        for (const file of files) {
          totalFiles++
          const filePath = path.join(categoryPath, file)

          try {
            const fileContent = fs.readFileSync(filePath, 'utf8')
            const data = JSON.parse(fileContent)
            validateSoftware(filePath, data)
          } catch (error) {
            errors.push({
              file: `${category}/${file}`,
              error: error instanceof Error ? error.message : 'Unknown error'
            })
          }
        }
      } catch (error) {
        console.warn(`⚠️  Error reading category ${category}:`, error)
      }
    }

    console.log(`\n📊 Validation Summary:`)
    console.log(`   Total files validated: ${totalFiles}`)
    console.log(`   Errors: ${errors.length}`)
    console.log(`   Warnings: ${warnings.length}`)

    if (errors.length > 0) {
      console.log(`\n❌ Validation Errors:\n`)
      errors.forEach(({ file, field, error }) => {
        console.log(`   ${file}${field ? ` (${field})` : ''}: ${error}`)
      })
    }

    if (warnings.length > 0) {
      console.log(`\n⚠️  Validation Warnings:\n`)
      warnings.forEach(({ file, field, error }) => {
        console.log(`   ${file}${field ? ` (${field})` : ''}: ${error}`)
      })
    }

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`\n✅ All data files are valid!\n`)
    }

    // Exit with error code if there are errors
    if (errors.length > 0) {
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Fatal error during validation:', error)
    process.exit(1)
  }
}

// Run validation
console.log('🔍 Starting data validation...\n')
validateAllData()
