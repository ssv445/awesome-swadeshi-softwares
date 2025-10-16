import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getSoftwareByCategory, getCategories } from "@/lib/server-data"
import { getCategoryDisplayName } from "@/lib/data"
import { getBaseUrl } from "@/lib/links"
import { isPurposeSlug, getPurposeConfig, getAppsByPurpose, getFeaturedAppsByPurpose, getRelatedPurposeConfigs, getAllPurposeSlugs } from "@/lib/purpose-server"
import CategoryPage from "./category-page"
import PurposePage from "@/components/PurposePage"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

// Only generate paths defined in generateStaticParams, return 404 for others
export const dynamicParams = false

export async function generateStaticParams() {
  const categories = getCategories()
  const purposeSlugs = getAllPurposeSlugs()

  // Generate params for both categories and types
  return [
    ...categories.map((category) => ({ category })),
    ...purposeSlugs.map((slug) => ({ category: slug })), // Reuse 'category' param name
  ]
}

export default async function CategoryPageWrapper({ params }: CategoryPageProps) {
  const { category: slug } = await params

  // Check if slug is a type first
  if (isPurposeSlug(slug)) {
    const config = getPurposeConfig(slug)
    if (!config) {
      notFound()
    }

    const allApps = getAppsByPurpose(slug)
    const featuredApps = getFeaturedAppsByPurpose(slug, 6)
    const relatedPurposes = getRelatedPurposeConfigs(slug)

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PurposePage
          purposeSlug={slug}
          config={config}
          featuredApps={featuredApps}
          allApps={allApps}
          relatedPurposes={relatedPurposes}
        />
      </Suspense>
    )
  }

  // Otherwise, handle as category (existing logic)
  const software = getSoftwareByCategory(slug)
  const categories = getCategories()

  // Check if category exists
  if (!categories.includes(slug)) {
    notFound()
  }

  const categoryName = getCategoryDisplayName(slug)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPage
        software={software}
        categoryName={categoryName}
        categorySlug={slug}
        allCategories={categories}
      />
    </Suspense>
  )
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: slug } = await params
  const baseUrl = getBaseUrl()

  // Check if slug is a type
  if (isPurposeSlug(slug)) {
    const config = getPurposeConfig(slug)
    if (!config) {
      return {
        title: 'Not Found',
      }
    }

    const apps = getAppsByPurpose(slug)

    return {
      title: config.title,
      description: config.description,
      keywords: [
        `swadeshi ${slug.replace(/-/g, ' ')}`,
        `indian ${slug.replace(/-/g, ' ')}`,
        'made in india',
        'swadeshi apps',
      ],
      openGraph: {
        title: config.title,
        description: config.description,
        url: `${baseUrl}/${slug}`,
        type: 'website',
        images: [
          {
            url: `/og-${slug}.png`,
            width: 1200,
            height: 630,
            alt: config.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: config.title,
        description: config.description,
        images: [`/og-${slug}.png`],
      },
      alternates: {
        canonical: `${baseUrl}/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  }

  // Otherwise, handle as category (existing metadata logic)
  const categoryName = getCategoryDisplayName(slug)
  const software = getSoftwareByCategory(slug)

  return {
    title: `${categoryName} Apps - Indian Alternatives`,
    description: `Discover ${software.length}+ Indian ${categoryName.toLowerCase()} apps. Quality alternatives to international tools.`,
    keywords: [
      `Indian ${categoryName.toLowerCase()} apps`,
      "Swadeshi software",
      "Indian alternatives",
      "Atmanirbhar Bharat",
      `${categoryName} tools`,
      "Made in India",
      `Indian ${categoryName.toLowerCase()} solutions`,
      "indigenous software"
    ],
    openGraph: {
      title: `${categoryName} Apps - Indian Alternatives`,
      description: `${software.length}+ Indian ${categoryName.toLowerCase()} apps - Quality alternatives to international tools.`,
      url: `${baseUrl}/${slug}`,
      type: "website",
      images: [
        {
          url: `/og-${slug}.png`,
          width: 1200,
          height: 630,
          alt: `Indian ${categoryName} Software Alternatives`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Apps - Indian Alternatives`,
      description: `${software.length}+ Indian ${categoryName.toLowerCase()} apps - Quality alternatives to international tools.`,
      images: [`/og-${slug}.png`]
    },
    alternates: {
      canonical: `${baseUrl}/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}