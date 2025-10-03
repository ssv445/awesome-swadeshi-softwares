import fs from 'fs'
import path from 'path'
import type { Software, Category, CategoriesData } from './data'

// Extended Software type with metadata for sitemap/routing
export interface SoftwareWithMeta extends Software {
  categorySlug: string
  slug: string
}

// Get all software from nested folder structure (server-side only)
export function getAllSoftware(): SoftwareWithMeta[] {
  const dataDir = path.join(process.cwd(), 'data')
  const software: SoftwareWithMeta[] = []

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
          const slug = file.replace('.json', '')

          software.push({
            ...softwareData,
            categorySlug: category,
            slug
          })
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

// Get all available categories from categories.json (server-side only)
export function getCategories(): string[] {
  try {
    const categoriesData = getCategoriesData()
    return categoriesData.categories.map(cat => cat.slug)
  } catch (error) {
    console.error('Error reading categories:', error)
    // Fallback to directory scan
    const dataDir = path.join(process.cwd(), 'data')
    try {
      const categories = fs.readdirSync(dataDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(name => !name.startsWith('.'))

      return categories
    } catch (fallbackError) {
      console.error('Fallback error reading categories:', fallbackError)
      return []
    }
  }
}

// Get categories data from categories.json (server-side only)
export function getCategoriesData(): CategoriesData {
  const categoriesPath = path.join(process.cwd(), 'data', 'categories.json')

  try {
    const fileContent = fs.readFileSync(categoriesPath, 'utf8')
    return JSON.parse(fileContent) as CategoriesData
  } catch (error) {
    console.error('Error reading categories.json:', error)
    throw new Error('Could not load categories data')
  }
}

// Get category by slug (server-side only)
export function getCategoryBySlug(slug: string): Category | null {
  try {
    const categoriesData = getCategoriesData()
    return categoriesData.categories.find(cat => cat.slug === slug) || null
  } catch (error) {
    console.error(`Error getting category ${slug}:`, error)
    return null
  }
}

// Get featured categories (server-side only)
export function getFeaturedCategories(): Category[] {
  try {
    const categoriesData = getCategoriesData()
    return categoriesData.categories
      .filter(cat => cat.featured)
      .sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Error getting featured categories:', error)
    return []
  }
}

// Get individual app by category and slug (server-side only)
export function getAppBySlug(category: string, slug: string): Software | null {
  const dataDir = path.join(process.cwd(), 'data')
  const categoryPath = path.join(dataDir, category)

  try {
    if (!fs.existsSync(categoryPath)) {
      return null
    }

    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.json'))

    // Find file that matches the slug
    const targetFile = files.find(file => {
      const fileSlug = file.replace('.json', '')
      return fileSlug === slug
    })

    if (!targetFile) {
      return null
    }

    const filePath = path.join(categoryPath, targetFile)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const appData = JSON.parse(fileContent)

    return appData
  } catch (error) {
    console.error(`Error reading app ${category}/${slug}:`, error)
    return null
  }
}

// Get all app paths for static generation (server-side only)
export function getAllAppPaths(): { category: string; slug: string }[] {
  const dataDir = path.join(process.cwd(), 'data')
  const paths: { category: string; slug: string }[] = []

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
          const slug = file.replace('.json', '')
          paths.push({ category, slug })
        }
      } catch (error) {
        console.warn(`Error reading category ${category}:`, error)
      }
    }
  } catch (error) {
    console.error('Error reading data directory:', error)
  }

  return paths
}

// Get related apps (same company or category) (server-side only)
export function getRelatedApps(app: Software, limit: number): { sameCompany: Software[]; sameCategory: Software[] } {
  const allApps = getAllSoftware()

  const sameCompany = allApps
    .filter(otherApp =>
      otherApp.company === app.company &&
      otherApp.name !== app.name
    )
    .slice(0, Math.ceil(limit / 2))

  const sameCategory = allApps
    .filter(otherApp =>
      otherApp.category === app.category &&
      otherApp.name !== app.name &&
      !sameCompany.some(companyApp => companyApp.name === otherApp.name)
    )
    .slice(0, limit - sameCompany.length)

  return { sameCompany, sameCategory }
}

// Featured products interface
interface FeaturedProduct {
  category: string
  slug: string
  featured_reason: string
}

interface HomepageData {
  featured_products: FeaturedProduct[]
}

// Get featured products from homepage.json (server-side only)
export function getFeaturedProducts(limit: number): Software[] {
  const homepageFilePath = path.join(process.cwd(), 'data', 'homepage.json')
  const featuredApps: Software[] = []

  try {
    if (!fs.existsSync(homepageFilePath)) {
      console.warn('homepage.json not found, returning all apps')
      return getAllSoftware().slice(0, limit)
    }

    const homepageContent = fs.readFileSync(homepageFilePath, 'utf8')
    const homepageData: HomepageData = JSON.parse(homepageContent)

    for (const featuredProduct of homepageData.featured_products) {
      const app = getAppBySlug(featuredProduct.category, featuredProduct.slug)
      if (app) {
        // Add featured reason as a temporary property for display
        const featuredApp = { ...app, featured_reason: featuredProduct.featured_reason }
        featuredApps.push(featuredApp)
      } else {
        console.warn(`Featured app not found: ${featuredProduct.category}/${featuredProduct.slug}`)
      }
    }

    return featuredApps
  } catch (error) {
    console.error('Error loading featured products:', error)
    return getAllSoftware().slice(0, limit)
  }
}