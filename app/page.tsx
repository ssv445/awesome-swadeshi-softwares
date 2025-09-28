import { getAllSoftware, getCategories } from "@/lib/server-data"
import ClientHomePage from "./client-page"

export default function HomePage() {
  const allSoftware = getAllSoftware()
  const categories = getCategories()

  return <ClientHomePage allSoftware={allSoftware} categories={categories} />
}
