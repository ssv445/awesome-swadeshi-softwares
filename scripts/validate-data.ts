#!/usr/bin/env node

/**
 * Build-time data validation script
 * Validates all JSON files in /data/ directory for required fields and data integrity
 */

import fs from 'fs'
import path from 'path'

interface Software {
  name: string
  description: string
  website: string
  category: string
  alternatives: string[]
  pricing: string
  company: string
  location: string
  faviconUrl?: string
}

const REQUIRED_FIELDS: (keyof Software)[] = [
  'name',
  'description',
  'website',
  'category',
  'alternatives',
  'pricing',
  'company',
  'location'
]

const VALID_PRICING_VALUES = ['Free', 'Freemium', 'Paid', 'Open Source']

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
