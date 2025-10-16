import { MetadataRoute } from 'next'
import { getAllSoftware, getCategories } from '@/lib/server-data'
import { getAllAlternatives } from '@/lib/alternatives-server'
import { getAllPurposeSlugs } from '@/lib/purpose-server'
import {
  getAbsoluteHomeUrl,
  getAbsoluteUrl,
  getAboutUrl,
  getContributeUrl,
  getWhySwadeshiUrl,
  getAlternativesIndexUrl,
  getAbsolutePurposeUrl,
  getAbsoluteCategoryUrl,
  getAbsoluteAppUrl,
  getAbsoluteAlternativeUrl,
} from '@/lib/links'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteHomeUrl(),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: getAbsoluteUrl(getAboutUrl()),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(getContributeUrl()),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(getWhySwadeshiUrl()),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl(getAlternativesIndexUrl()),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Purpose pages (higher priority than categories for SEO)
  const purposeSlugs = getAllPurposeSlugs()
  const purposeRoutes: MetadataRoute.Sitemap = purposeSlugs.map((slug) => ({
    url: getAbsolutePurposeUrl(slug),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Category pages
  const categories = getCategories()
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: getAbsoluteCategoryUrl(category),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Individual software pages
  const allSoftware = getAllSoftware()
  const softwareRoutes: MetadataRoute.Sitemap = allSoftware.map((software) => ({
    url: getAbsoluteAppUrl(software.categorySlug, software.slug),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Alternative pages
  const alternatives = getAllAlternatives()
  const alternativeRoutes: MetadataRoute.Sitemap = alternatives.map((alt) => ({
    url: getAbsoluteAlternativeUrl(alt.slug),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...purposeRoutes,      // Purpose pages listed before categories for higher priority
    ...categoryRoutes,
    ...softwareRoutes,
    ...alternativeRoutes,
  ]
}
