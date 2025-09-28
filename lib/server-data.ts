import fs from 'fs'
import path from 'path'
import type { Software } from './data'

// Get all software from nested folder structure (server-side only)
export function getAllSoftware(): Software[] {
  const dataDir = path.join(process.cwd(), 'data')
  const software: Software[] = []

  try {
    // Get all category folders
    const categories = fs.readdirSync(dataDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    // Read all JSON files from each category folder
    for (const category of categories) {
      const categoryPath = path.join(dataDir, category)

      try {
        const files = fs.readdirSync(categoryPath)
          .filter(file => file.endsWith('.json'))

        for (const file of files) {
          const filePath = path.join(categoryPath, file)
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const softwareData = JSON.parse(fileContent)
          software.push(softwareData)
        }
      } catch (error) {
        console.warn(`Error reading category ${category}:`, error)
      }
    }
  } catch (error) {
    console.error('Error reading data directory:', error)
  }

  return software
}

// Get software by category (server-side only)
export function getSoftwareByCategory(categorySlug: string): Software[] {
  const dataDir = path.join(process.cwd(), 'data')
  const software: Software[] = []

  try {
    const categoryPath = path.join(dataDir, categorySlug)

    if (!fs.existsSync(categoryPath)) {
      return []
    }

    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.json'))

    for (const file of files) {
      const filePath = path.join(categoryPath, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const softwareData = JSON.parse(fileContent)
      software.push(softwareData)
    }
  } catch (error) {
    console.error(`Error reading category ${categorySlug}:`, error)
  }

  return software
}

// Get all available categories (server-side only)
export function getCategories(): string[] {
  const dataDir = path.join(process.cwd(), 'data')

  try {
    const categories = fs.readdirSync(dataDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => !name.startsWith('.') && name !== 'README.md')

    return categories
  } catch (error) {
    console.error('Error reading categories:', error)
    return []
  }
}