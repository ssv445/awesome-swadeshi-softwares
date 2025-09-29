"use client"

import { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, Zap } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import Link from "next/link"
import { getCategoryDisplayName } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import type { Software } from "@/lib/data"

interface ClientHomePageProps {
  allSoftware: Software[]
  featuredProducts: Software[]
  categories: string[]
}

export default function ClientHomePage({ allSoftware, featuredProducts, categories }: ClientHomePageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Software[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const router = useRouter()

  const categoryDisplayNames = useMemo(() => {
    return categories.map(cat => ({
      slug: cat,
      name: getCategoryDisplayName(cat)
    }))
  }, [categories])

  // Smart category detection based on search results
  const detectBestCategory = useCallback((searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) return null

    const searchLower = searchTerm.toLowerCase()
    const categoryScores: { [key: string]: number } = {}

    // Score categories based on how many apps match the search in each category
    categories.forEach(category => {
      const categoryApps = allSoftware.filter(app =>
        app.category.toLowerCase().replace(/\s+/g, '-') === category
      )

      const matchingApps = categoryApps.filter(app =>
        app.name.toLowerCase().includes(searchLower) ||
        app.description.toLowerCase().includes(searchLower) ||
        app.alternatives.some(alt => alt.toLowerCase().includes(searchLower)) ||
        app.company.toLowerCase().includes(searchLower)
      )

      if (matchingApps.length > 0) {
        // Weight by percentage of matching apps in category + absolute count
        const percentage = matchingApps.length / categoryApps.length
        categoryScores[category] = (percentage * 100) + matchingApps.length
      }
    })

    // Return category with highest score
    const bestCategory = Object.entries(categoryScores)
      .sort(([,a], [,b]) => b - a)[0]

    return bestCategory ? bestCategory[0] : null
  }, [allSoftware, categories])

  // Handle search with smart redirection
  const handleSearchSubmit = useCallback((searchValue: string) => {
    if (!searchValue || searchValue.length < 2) return

    const bestCategory = detectBestCategory(searchValue)

    if (bestCategory) {
      // Redirect to category page with search parameter
      const searchParams = new URLSearchParams({ q: searchValue })
      router.push(`/${bestCategory}?${searchParams.toString()}`)
    } else {
      // Stay on homepage but filter results
      setSearchTerm(searchValue)
      setCurrentPage(1)
    }
  }, [detectBestCategory, router])

  // Handle Enter key in search input
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(searchTerm)
    }
  }, [searchTerm, handleSearchSubmit])

  const displaySoftware = useMemo(() => {
    // Show search results when user is searching, otherwise show featured products
    if (searchTerm === "") {
      return featuredProducts
    } else {
      return searchResults
    }
  }, [searchTerm, searchResults, featuredProducts])

  // Handle search input changes
  const handleSearchInputChange = useCallback((value: string) => {
    setSearchTerm(value)

    if (value.length >= 2) {
      const results = allSoftware.filter(software =>
        software.name.toLowerCase().includes(value.toLowerCase()) ||
        software.description.toLowerCase().includes(value.toLowerCase()) ||
        software.alternatives.some(alt => alt.toLowerCase().includes(value.toLowerCase())) ||
        software.company.toLowerCase().includes(value.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
    setCurrentPage(1)
  }, [allSoftware])

  const totalPages = Math.ceil(displaySoftware.length / itemsPerPage)
  const paginatedSoftware = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return displaySoftware.slice(startIndex, startIndex + itemsPerPage)
  }, [displaySoftware, currentPage, itemsPerPage])


  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      {/* Subtle Lotus Pattern Overlay */}
      <div className="fixed inset-0 opacity-3 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.2'%3E%3Cpath d='M40 20c-2 8-8 14-16 14s-14-6-16-14c2-8 8-14 16-14s14 6 16 14zm-16 20c8 0 14-6 16-14-2-8-8-14-16-14s-14 6-16 14c2 8 8 14 16 14z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header */}
      <header className="border-b border-green-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <AshokaChakra className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Awesome Swadeshi
                </h1>
                <p className="text-sm text-gray-600 font-medium">Indian Apps Directory • Atmanirbhar Bharat</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline" className="border border-gray-300 text-gray-600 hover:bg-gray-50 bg-white">
                <Link href="/why-swadeshi">Why Swadeshi?</Link>
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                <Link href="/about">Add App</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-10 left-10 text-green-200 opacity-30">
        </div>
        <div className="absolute top-20 right-20 text-orange-200 opacity-30">
        </div>
        <div className="absolute bottom-10 left-1/4 text-green-200 opacity-30">
          <Zap className="h-10 w-10" />
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div>
              <AshokaChakra className="h-20 w-20 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-gray-900">Awesome</span> Swadeshi Apps
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
            Discover India's Leading Apps & Platforms
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Join the <em>Swadeshi</em> movement by choosing Indian apps that compete globally.
            Explore featured solutions built by Indian innovators and trusted by millions.
          </p>

          {/* Total Apps Counter */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-green-600 text-white px-8 py-4 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {allSoftware.length}+
                </div>
                <div className="text-lg md:text-xl font-medium">
                  Indian Apps Available
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-500 h-10 w-10" />
              <Input
                type="text"
                placeholder="Search for Indian apps... (Type to see suggestions)"
                value={searchTerm}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="pl-20 pr-8 py-8 text-3xl border-4 border-blue-400 rounded-2xl bg-white focus:border-blue-600 focus:ring-blue-600 shadow-2xl font-medium"
              />

              {/* Search Dropdown */}
              {searchTerm.length >= 2 && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    <p className="text-sm text-gray-600 px-4 py-2 font-medium">
                      {searchResults.length} apps found
                    </p>
                    {searchResults.slice(0, 8).map((app, index) => (
                      <Link
                        key={index}
                        href={getAppUrl(app.category, app.name)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <Favicon
                          websiteUrl={app.website}
                          name={app.name}
                          size={24}
                          className="h-6 w-6 object-contain"
                          fallbackClassName="h-5 w-5 text-blue-600"
                          customFaviconUrl={app.faviconUrl}
                          fixedHeight={true}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{app.name}</p>
                          <p className="text-sm text-gray-600 truncate">{app.company}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getCategoryDisplayName(app.category)}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {categoryDisplayNames.map(category => (
                <Button key={category.slug} asChild size="sm" variant="outline" className="border border-gray-300 text-gray-600 hover:bg-gray-50 bg-white">
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
      <section className="py-20 px-4 relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M30 30c-2 8-8 14-16 14s-14-6-16-14c2-8 8-14 16-14s14 6 16 14z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="flex justify-center items-center space-x-4 mt-12">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    size="sm"
                    className={currentPage === page
                      ? "bg-blue-600 hover:bg-blue-700 text-white border-none"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-50 w-10 h-10"
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
                className="border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          )}

          {displaySoftware.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white border border-green-300 rounded-xl p-8 max-w-md mx-auto">
                <AshokaChakra className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700 text-lg font-medium">No Software Found</p>
                <p className="text-gray-500 text-sm">Try adjusting your search criteria or browse all categories.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 px-4 relative">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c-2 6-6 10-12 10s-10-4-12-10c2-6 6-10 12-10s10 4 12 10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div>
              <AshokaChakra className="h-8 w-8 text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-white">
              Awesome Swadeshi
            </span>
          </div>
          <p className="text-gray-200 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Promoting Indian software innovation and helping users discover quality alternatives.
            Supporting <em>Swadeshi</em> movement and <em>Atmanirbhar Bharat</em> through technology.
          </p>
          <div className="flex items-center justify-center">
            <p className="text-gray-300 text-sm">&copy; 2024 Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  )
}