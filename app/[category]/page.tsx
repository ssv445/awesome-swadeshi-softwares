import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getSoftwareByCategory, getCategories } from "@/lib/server-data"
import { getCategoryDisplayName } from "@/lib/data"
import { isTypeSlug, getTypeConfig, getAppsByType, getFeaturedAppsByType, getRelatedTypeConfigs, getAllTypeSlugs } from "@/lib/types-server"
import CategoryPage from "./category-page"
import TypePage from "@/components/TypePage"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

// Only generate paths defined in generateStaticParams, return 404 for others
export const dynamicParams = false

export async function generateStaticParams() {
  const categories = getCategories()
  const typeSlugs = getAllTypeSlugs()

  // Generate params for both categories and types
  return [
    ...categories.map((category) => ({ category })),
    ...typeSlugs.map((slug) => ({ category: slug })), // Reuse 'category' param name
  ]
}

export default async function CategoryPageWrapper({ params }: CategoryPageProps) {
  const { category: slug } = await params

  // Check if slug is a type first
  if (isTypeSlug(slug)) {
    const config = getTypeConfig(slug)
    if (!config) {
      notFound()
    }

    const allApps = getAppsByType(slug)
    const featuredApps = getFeaturedAppsByType(slug, 6)
    const relatedTypes = getRelatedTypeConfigs(slug)

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <TypePage
          typeSlug={slug}
          config={config}
          featuredApps={featuredApps}
          allApps={allApps}
          relatedTypes={relatedTypes}
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

  // Check if slug is a type
  if (isTypeSlug(slug)) {
    const config = getTypeConfig(slug)
    if (!config) {
      return {
        title: 'Not Found',
      }
    }

    const apps = getAppsByType(slug)

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
        url: `/${slug}`,
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
        canonical: `/${slug}`,
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
    title: `${categoryName} Apps - Indian Alternatives | Swadeshi Apps`,
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
      url: `/${slug}`,
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
      canonical: `/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}