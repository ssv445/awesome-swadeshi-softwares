"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ArrowLeft } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import Link from "next/link"
import { getCategoryDisplayName } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { AppShell } from "@/components/layout/AppShell"
import { Breadcrumbs, generateBreadcrumbs } from "@/components/ui/Breadcrumbs"
import type { Software } from "@/lib/data"

interface CategoryPageProps {
  software: Software[]
  categoryName: string
  categorySlug: string
  allCategories: string[]
}

export default function CategoryPage({ software, categoryName, categorySlug, allCategories }: CategoryPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize search term from URL parameter
  useEffect(() => {
    const urlSearchTerm = searchParams.get('q')
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm)
    }
  }, [searchParams])

  // Update URL when search changes
  const updateSearchUrl = (newSearchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newSearchTerm) {
      params.set('q', newSearchTerm)
    } else {
      params.delete('q')
    }

    const newUrl = `/${categorySlug}${params.toString() ? '?' + params.toString() : ''}`
    router.replace(newUrl, { scroll: false })
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    updateSearchUrl(value)
  }

  const categoryDisplayNames = useMemo(() => {
    return allCategories.map(cat => ({
      slug: cat,
      name: getCategoryDisplayName(cat)
    }))
  }, [allCategories])

  const filteredSoftware = useMemo(() => {
    return software.filter(sw => {
      const matchesSearch = searchTerm === "" ||
        sw.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sw.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sw.alternatives.some(alt => alt.toLowerCase().includes(searchTerm.toLowerCase()))

      return matchesSearch
    })
  }, [searchTerm, software])

  const breadcrumbs = generateBreadcrumbs('category', {
    categoryName
  })

  return (
    <AppShell>
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="container mx-auto text-center max-w-4xl">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Apps
            </Link>
          </Button>

          <div className="flex items-center justify-center mb-6">
            <AshokaChakra className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            <span className="text-orange-500">{categoryName}</span> Apps
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Indian apps that can replace international {categoryName.toLowerCase()} tools and platforms.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={`Search ${categoryName.toLowerCase()} apps...`}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
            </div>

            {/* Category Navigation */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button asChild variant="outline" size="sm">
                <Link href="/">All</Link>
              </Button>
              {categoryDisplayNames.map(category => (
                <Button
                  key={category.slug}
                  variant={categorySlug === category.slug ? "default" : "outline"}
                  size="sm"
                  asChild
                >
                  <Link href={categorySlug === category.slug ? "/" : `/${category.slug}`}>
                    {category.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full border border-gray-300">
              <p className="text-lg text-gray-600">
                <span className="font-bold text-orange-500">{filteredSoftware.length}</span> {categoryName.toLowerCase()} apps
                {searchTerm && (
                  <span className="text-gray-500 ml-2">
                    matching "<span className="font-medium text-orange-600">{searchTerm}</span>"
                  </span>
                )}
              </p>
            </div>
            {searchTerm && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearchChange("")}
                  className="text-gray-600 hover:bg-gray-50"
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSoftware.map((software, index) => (
              <ProductCard
                key={index}
                software={software}
                index={index}
              />
            ))}
          </div>

          {filteredSoftware.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No apps found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </AppShell>
  )
}