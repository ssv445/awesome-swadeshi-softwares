"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import Link from "next/link"
import { getCategoryDisplayName } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { SearchBox } from "@/components/ui/SearchBox"
import { AppShell } from "@/components/layout/AppShell"
import { ITEMS_PER_PAGE } from "@/lib/constants"
import type { Software } from "@/lib/data"

interface ClientHomePageProps {
  allSoftware: Software[]
  featuredProducts: Software[]
  categories: string[]
}

export default function ClientHomePage({ allSoftware, featuredProducts, categories }: ClientHomePageProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const categoryDisplayNames = useMemo(() => {
    return categories.map(cat => ({
      slug: cat,
      name: getCategoryDisplayName(cat)
    }))
  }, [categories])


  // Always show featured products (no page filtering)
  const displaySoftware = featuredProducts

  const totalPages = Math.ceil(displaySoftware.length / ITEMS_PER_PAGE)
  const paginatedSoftware = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return displaySoftware.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [displaySoftware, currentPage])


  return (
    <AppShell>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 relative z-40">
        {/* Subtle Decorative Elements - hidden on mobile */}
        <div className="absolute top-10 left-10 text-green-200 opacity-30 hidden md:block">
        </div>
        <div className="absolute top-20 right-20 text-orange-200 opacity-30 hidden md:block">
        </div>
        <div className="absolute bottom-10 left-1/4 text-green-200 opacity-30 hidden md:block">
          <Zap className="h-10 w-10" />
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
            <div>
              <AshokaChakra className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
            <span className="text-gray-900">Awesome</span> Swadeshi Apps
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-2 sm:mb-3 md:mb-4 font-medium px-2">
            Discover India's Leading Apps & Platforms
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-7 md:mb-8 max-w-3xl mx-auto px-4">
            Join the <em>Swadeshi</em> movement by choosing Indian apps that compete globally.
            Explore featured solutions built by Indian innovators and trusted by millions.
          </p>

          {/* Total Apps Counter */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-green-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
                  {allSoftware.length}+
                </div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  Indian Apps Available
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
            <SearchBox
              allSoftware={allSoftware}
              placeholder="Search for Indian apps... (Type to see suggestions)"
              size="lg"
            />

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-2">
              {categoryDisplayNames.map(category => (
                <Button key={category.slug} asChild size="sm" variant="outline" className="border border-gray-300 text-gray-600 hover:bg-gray-50 bg-white text-xs sm:text-sm">
                  <Link href={`/${category.slug}`}>
                    {category.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Software Grid */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 relative z-10">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M30 30c-2 8-8 14-16 14s-14-6-16-14c2-8 8-14 16-14s14 6 16 14z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {paginatedSoftware.map((software, index) => (
              <ProductCard
                key={index}
                software={software}
                index={index}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                size="sm"
                className="border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 w-full sm:w-auto"
              >
                Previous
              </Button>

              <div className="flex items-center flex-wrap justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    size="sm"
                    className={currentPage === page
                      ? "bg-blue-600 hover:bg-blue-700 text-white border-none w-9 h-9 sm:w-10 sm:h-10"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-50 w-9 h-9 sm:w-10 sm:h-10"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                size="sm"
                className="border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 w-full sm:w-auto"
              >
                Next
              </Button>
            </div>
          )}

          {displaySoftware.length === 0 && (
            <div className="text-center py-8 sm:py-12 md:py-16 px-4">
              <div className="bg-white border border-green-300 rounded-xl p-6 sm:p-8 max-w-md mx-auto">
                <AshokaChakra className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-700 text-base sm:text-lg font-medium">No Software Found</p>
                <p className="text-gray-500 text-xs sm:text-sm">Try adjusting your search criteria or browse all categories.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </AppShell>
  )
}