import fs from 'fs'
import path from 'path'

// List of alternatives to remove
const alternativesToRemove = [
  'Instacart',
  'Amazon Fresh',
  'Walmart Grocery',
  'Etsy',
  'Wayfair',
  'HarmonyOS',
  'Hugging Face',
  'Toast POS',
  'Lightspeed',
  'Amplitude',
  'Braze',
  'Square',
  'Plaid',
  'Venmo',
  'Settle Up'
]

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

function removeAlternativesFromFile(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const data: Software = JSON.parse(content)

    const originalLength = data.alternatives.length

    // Remove unwanted alternatives (case-insensitive)
    data.alternatives = data.alternatives.filter(alt =>
      !alternativesToRemove.some(remove =>
        alt.toLowerCase() === remove.toLowerCase()
      )
    )

    const removedCount = originalLength - data.alternatives.length

    if (removedCount > 0) {
      // Write back to file with proper formatting
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
      console.log(`✓ ${path.basename(filePath)}: Removed ${removedCount} alternative(s)`)
      return true
    }

    return false
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error)
    return false
  }
}

function processDirectory(dirPath: string): { filesProcessed: number, filesModified: number, totalRemoved: number } {
  let filesProcessed = 0
  let filesModified = 0
  let totalRemoved = 0

  const items = fs.readdirSync(dirPath)

  for (const item of items) {
    const fullPath = path.join(dirPath, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      const result = processDirectory(fullPath)
      filesProcessed += result.filesProcessed
      filesModified += result.filesModified
      totalRemoved += result.totalRemoved
    } else if (item.endsWith('.json') && item !== 'categories.json' && item !== 'homepage.json') {
      try {
        filesProcessed++
        const originalContent = fs.readFileSync(fullPath, 'utf-8')
        const data: Software = JSON.parse(originalContent)

        // Skip if not a software file (no alternatives field)
        if (!data.alternatives || !Array.isArray(data.alternatives)) {
          continue
        }

        const originalLength = data.alternatives.length

        const modified = removeAlternativesFromFile(fullPath)

        if (modified) {
          filesModified++
          const newContent = fs.readFileSync(fullPath, 'utf-8')
          const newData: Software = JSON.parse(newContent)
          const removed = originalLength - newData.alternatives.length
          totalRemoved += removed
        }
      } catch (error) {
        console.log(`⊘ Skipping ${item} (not a software file)`)
      }
    }
  }

  return { filesProcessed, filesModified, totalRemoved }
}

// Main execution
const dataDir = path.join(process.cwd(), 'data')

console.log('🧹 Starting alternatives cleanup...')
console.log(`📋 Removing: ${alternativesToRemove.join(', ')}`)
console.log('')

const result = processDirectory(dataDir)

console.log('')
console.log('✅ Cleanup complete!')
console.log(`📊 Statistics:`)
console.log(`   - Files processed: ${result.filesProcessed}`)
console.log(`   - Files modified: ${result.filesModified}`)
console.log(`   - Total alternatives removed: ${result.totalRemoved}`)
