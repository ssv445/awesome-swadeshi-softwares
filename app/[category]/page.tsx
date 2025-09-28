import { notFound } from "next/navigation"
import { getSoftwareByCategory, getCategories } from "@/lib/server-data"
import { getCategoryDisplayName } from "@/lib/data"
import CategoryPage from "./category-page"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPageWrapper({ params }: CategoryPageProps) {
  const { category } = params
  const software = getSoftwareByCategory(category)
  const categories = getCategories()

  // Check if category exists
  if (!categories.includes(category)) {
    notFound()
  }

  const categoryName = getCategoryDisplayName(category)

  return (
    <CategoryPage
      software={software}
      categoryName={categoryName}
      categorySlug={category}
      allCategories={categories}
    />
  )
}

export async function generateStaticParams() {
  const categories = getCategories()

  return categories.map((category) => ({
    category: category,
  }))
}