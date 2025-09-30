import { MetadataRoute } from 'next'
import { getAllSoftware, getCategories } from '@/lib/server-data'
import { getAllAlternatives } from '@/lib/alternatives-server'
import { getAllComparisons } from '@/lib/comparisons-server'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://awesome-swadeshi-softwares.vercel.app'

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/why-swadeshi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/alternatives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Category pages
  const categories = getCategories()
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Individual software pages
  const allSoftware = getAllSoftware()
  const softwareRoutes: MetadataRoute.Sitemap = allSoftware.map((software) => ({
    url: `${baseUrl}/${software.categorySlug}/${software.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Alternative pages
  const alternatives = getAllAlternatives()
  const alternativeRoutes: MetadataRoute.Sitemap = alternatives.map((alt) => ({
    url: `${baseUrl}/alternatives/${alt.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Comparison pages
  const comparisons = getAllComparisons()
  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((comp) => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...softwareRoutes,
    ...alternativeRoutes,
    ...comparisonRoutes,
  ]
}