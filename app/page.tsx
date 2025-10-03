import { getAllSoftware, getCategories, getFeaturedProducts } from "@/lib/server-data"
import { FEATURED_PRODUCT_LIMIT } from "@/lib/constants"
import ClientHomePage from "./client-page"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(FEATURED_PRODUCT_LIMIT)
  const allSoftware = getAllSoftware() // Still needed for search functionality
  const categories = getCategories()

  return (
    <ClientHomePage
      allSoftware={allSoftware}
      featuredProducts={featuredProducts}
      categories={categories}
    />
  )
}
