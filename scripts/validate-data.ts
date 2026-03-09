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
  purpose?: string[]
  alternatives: string[]
  pricing: string
  company: string
  location: string
  faviconUrl?: string
  appStoreUrl?: string
  playStoreUrl?: string
  pros?: string[]
  cons?: string[]
  userComplaints?: string[]
  rating?: number
  ratingSource?: string
  lastVerified?: string
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

// Load valid purposes from individual JSON files in /data/purpose/
function getValidPurposes(): string[] {
  try {
    const purposeDir = path.join(process.cwd(), 'data', 'purpose')

    if (!fs.existsSync(purposeDir)) {
      console.error('Warning: Purpose directory does not exist, skipping purpose validation')
      return []
    }

    const files = fs.readdirSync(purposeDir)
    const purposes: string[] = []

    for (const file of files) {
      if (!file.endsWith('.json')) continue

      const filePath = path.join(purposeDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const data = JSON.parse(content)

      // Add primary slug
      if (data.slug) {
        purposes.push(data.slug)
      }

      // Add aliases
      if (data.aliases && Array.isArray(data.aliases)) {
        purposes.push(...data.aliases)
      }
    }

    return purposes
  } catch (error) {
    console.error('Warning: Could not load purposes from /data/purpose/, skipping purpose validation', error)
    return []
  }
}

const VALID_CATEGORIES = getValidCategories()
const VALID_PURPOSES = getValidPurposes()

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

  // Validate purpose field (optional field)
  if (data.purpose) {
    if (!Array.isArray(data.purpose)) {
      errors.push({ file: fileName, field: 'purpose', error: 'Purpose must be an array' })
    } else if (VALID_PURPOSES.length > 0) {
      const invalidPurposes = data.purpose.filter((p: string) => !VALID_PURPOSES.includes(p))
      if (invalidPurposes.length > 0) {
        errors.push({
          file: fileName,
          field: 'purpose',
          error: `Invalid purposes: ${invalidPurposes.join(', ')}. Must be one of: ${VALID_PURPOSES.join(', ')}`
        })
      }
    }
  }

  // Validate pros/cons/userComplaints arrays (optional)
  for (const field of ['pros', 'cons', 'userComplaints'] as const) {
    if (data[field]) {
      if (!Array.isArray(data[field])) {
        errors.push({ file: fileName, field, error: `${field} must be an array of strings` })
      } else {
        data[field].forEach((item: any, index: number) => {
          if (typeof item !== 'string' || item.length < 5) {
            warnings.push({ file: fileName, field: `${field}[${index}]`, error: `${field} entries should be descriptive strings (5+ chars)` })
          }
        })
      }
    }
  }

  // Validate rating (optional)
  if (data.rating !== undefined) {
    if (typeof data.rating !== 'number' || data.rating < 0 || data.rating > 5) {
      errors.push({ file: fileName, field: 'rating', error: 'Rating must be a number between 0 and 5' })
    }
  }

  // Validate ratingSource (optional, but required if rating is present)
  if (data.rating !== undefined && !data.ratingSource) {
    warnings.push({ file: fileName, field: 'ratingSource', error: 'ratingSource should be provided when rating is set' })
  }

  // Validate lastVerified date format (optional)
  if (data.lastVerified) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(data.lastVerified)) {
      errors.push({ file: fileName, field: 'lastVerified', error: 'lastVerified must be in YYYY-MM-DD format' })
    }
  }
}

const VALID_FACTOR_NAMES = [
  'shareholding', 'incorporation', 'boardControl', 'founders',
  'hqAndTeam', 'dataSovereignty', 'revenueOrigin'
]

function validateCompanies(categoriesDir: string): void {
  const companiesPath = path.join(process.cwd(), 'data', 'companies.json')

  if (!fs.existsSync(companiesPath)) {
    warnings.push({ file: 'companies.json', error: 'companies.json not found, skipping company validation' })
    return
  }

  let companiesData: any
  try {
    const content = fs.readFileSync(companiesPath, 'utf-8')
    companiesData = JSON.parse(content)
  } catch (error) {
    errors.push({ file: 'companies.json', error: `Failed to parse: ${error instanceof Error ? error.message : 'Unknown error'}` })
    return
  }

  if (!companiesData.companies || typeof companiesData.companies !== 'object') {
    errors.push({ file: 'companies.json', error: 'Missing or invalid "companies" object' })
    return
  }

  const companyKeys = Object.keys(companiesData.companies)
  const requiredCompanyFields = ['name', 'slug', 'hq', 'incorporation', 'founders', 'foundersActive', 'swadeshiMeter']

  for (const key of companyKeys) {
    const company = companiesData.companies[key]
    const prefix = `companies.json [${key}]`

    // Check required fields
    for (const field of requiredCompanyFields) {
      if (company[field] === undefined || company[field] === null) {
        errors.push({ file: prefix, field, error: `Missing required field: ${field}` })
      }
    }

    // Slug key must match slug field value
    if (company.slug && company.slug !== key) {
      errors.push({ file: prefix, field: 'slug', error: `Slug "${company.slug}" does not match object key "${key}"` })
    }

    // Validate swadeshiMeter
    if (company.swadeshiMeter && typeof company.swadeshiMeter === 'object') {
      const meter = company.swadeshiMeter

      // Score must be 0-100
      if (typeof meter.score !== 'number' || meter.score < 0 || meter.score > 100) {
        errors.push({ file: prefix, field: 'swadeshiMeter.score', error: 'Score must be a number between 0 and 100' })
      }

      // lastVerified must be YYYY-MM-DD
      if (meter.lastVerified) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        if (!dateRegex.test(meter.lastVerified)) {
          errors.push({ file: prefix, field: 'swadeshiMeter.lastVerified', error: 'lastVerified must be in YYYY-MM-DD format' })
        }
      } else {
        errors.push({ file: prefix, field: 'swadeshiMeter.lastVerified', error: 'Missing required field: lastVerified' })
      }

      // Validate factors
      if (meter.factors && typeof meter.factors === 'object') {
        const factorNames = Object.keys(meter.factors)

        for (const factorName of factorNames) {
          // Only valid factor names allowed
          if (!VALID_FACTOR_NAMES.includes(factorName)) {
            errors.push({ file: prefix, field: `swadeshiMeter.factors.${factorName}`, error: `Invalid factor name. Valid: ${VALID_FACTOR_NAMES.join(', ')}` })
            continue
          }

          const factor = meter.factors[factorName]

          // Each factor score must be 0-100
          if (typeof factor.score !== 'number' || factor.score < 0 || factor.score > 100) {
            errors.push({ file: prefix, field: `swadeshiMeter.factors.${factorName}.score`, error: 'Factor score must be a number between 0 and 100' })
          }

          // Each factor should have a note (warning)
          if (!factor.note || typeof factor.note !== 'string') {
            warnings.push({ file: prefix, field: `swadeshiMeter.factors.${factorName}.note`, error: 'Factor should have a descriptive note' })
          }
        }

        // dataCompleteness should match actual factor count (warning)
        if (meter.dataCompleteness !== undefined && meter.dataCompleteness !== factorNames.length) {
          warnings.push({ file: prefix, field: 'swadeshiMeter.dataCompleteness', error: `dataCompleteness is ${meter.dataCompleteness} but found ${factorNames.length} factors` })
        }
      }
    }
  }

  // Cross-validate companySlug references from app JSON files
  try {
    const categories = fs.readdirSync(categoriesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    for (const category of categories) {
      const categoryPath = path.join(categoriesDir, category)
      const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.json'))

      for (const file of files) {
        const filePath = path.join(categoryPath, file)
        try {
          const content = fs.readFileSync(filePath, 'utf-8')
          const data = JSON.parse(content)

          if (data.companySlug) {
            if (!companyKeys.includes(data.companySlug)) {
              errors.push({
                file: `${category}/${file}`,
                field: 'companySlug',
                error: `companySlug "${data.companySlug}" not found in companies.json. Valid: ${companyKeys.join(', ')}`
              })
            }
          }
        } catch {
          // Parse errors already reported by validateSoftware
        }
      }
    }
  } catch {
    // categoriesDir read errors already handled in validateAllData
  }

  console.log(`   Companies validated: ${companyKeys.length}`)
}

function validateAllData(): void {
  const categoriesDir = path.join(process.cwd(), 'data', 'categories')

  try {
    const categories = fs.readdirSync(categoriesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    let totalFiles = 0

    for (const category of categories) {
      const categoryPath = path.join(categoriesDir, category)

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

    // Validate companies.json and cross-validate companySlug references
    validateCompanies(categoriesDir)

    // Check for slug conflicts between categories and purposes
    if (VALID_CATEGORIES.length > 0 && VALID_PURPOSES.length > 0) {
      const conflicts = VALID_PURPOSES.filter((slug) => VALID_CATEGORIES.includes(slug))
      if (conflicts.length > 0) {
        console.log(`\n❌ Slug Conflicts:`)
        console.log(`   The following slugs are used by both categories and purposes:`)
        conflicts.forEach((slug) => {
          console.log(`   - ${slug}`)
        })
        console.log(`\n   Purposes and categories must have unique slugs to avoid routing conflicts.\n`)
        errors.push({ file: 'purpose-config.json', error: `Slug conflicts detected: ${conflicts.join(', ')}` })
      }
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
