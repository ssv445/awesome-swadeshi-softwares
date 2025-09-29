import { getAllSoftware, getCategories, getFeaturedProducts } from "@/lib/server-data"
import ClientHomePage from "./client-page"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
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
