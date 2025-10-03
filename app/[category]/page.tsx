import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getSoftwareByCategory, getCategories } from "@/lib/server-data"
import { getCategoryDisplayName } from "@/lib/data"
import CategoryPage from "./category-page"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPageWrapper({ params }: CategoryPageProps) {
  const { category } = await params
  const software = getSoftwareByCategory(category)
  const categories = getCategories()

  // Check if category exists
  if (!categories.includes(category)) {
    notFound()
  }

  const categoryName = getCategoryDisplayName(category)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPage
        software={software}
        categoryName={categoryName}
        categorySlug={category}
        allCategories={categories}
      />
    </Suspense>
  )
}

export async function generateStaticParams() {
  const categories = getCategories()

  return categories.map((category) => ({
    category: category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryName = getCategoryDisplayName(category)
  const software = getSoftwareByCategory(category)

  return {
    title: `${categoryName} Apps - Indian Alternatives | Awesome Swadeshi Apps`,
    description: `Discover ${software.length}+ Indian ${categoryName.toLowerCase()} apps that can replace international tools. Support Swadeshi movement with quality Indian alternatives built for global markets.`,
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
      description: `Discover ${software.length}+ Indian ${categoryName.toLowerCase()} apps that can replace international tools.`,
      url: `/${category}`,
      type: "website",
      images: [
        {
          url: `/og-${category}.png`,
          width: 1200,
          height: 630,
          alt: `Indian ${categoryName} Software Alternatives`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Apps - Indian Alternatives`,
      description: `Discover ${software.length}+ Indian ${categoryName.toLowerCase()} apps that can replace international tools.`,
      images: [`/og-${category}.png`]
    },
    alternates: {
      canonical: `/${category}`,
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}