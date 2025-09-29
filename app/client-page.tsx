"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Flag, ExternalLink, Star, Zap } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import Link from "next/link"
import { getCategoryDisplayName, getAlternativeUrl } from "@/lib/data"
import { Favicon } from "@/components/favicon"
import type { Software } from "@/lib/data"

interface ClientHomePageProps {
  allSoftware: Software[]
  categories: string[]
}

export default function ClientHomePage({ allSoftware, categories }: ClientHomePageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const categoryDisplayNames = useMemo(() => {
    return categories.map(cat => ({
      slug: cat,
      name: getCategoryDisplayName(cat)
    }))
  }, [categories])

  const filteredSoftware = useMemo(() => {
    return allSoftware.filter(software => {
      const matchesSearch = searchTerm === "" ||
        software.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        software.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        software.alternatives.some(alt => alt.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "" ||
        software.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, allSoftware])

  const totalPages = Math.ceil(filteredSoftware.length / itemsPerPage)
  const paginatedSoftware = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredSoftware.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredSoftware, currentPage, itemsPerPage])

  // Reset pagination when filters change
  const handleFilterChange = (newCategory: string) => {
    setSelectedCategory(newCategory)
    setCurrentPage(1)
  }

  const handleSearchChange = (newSearch: string) => {
    setSearchTerm(newSearch)
    setCurrentPage(1)
  }

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
                <p className="text-sm text-gray-600 font-medium">Indian Software Directory • Atmanirbhar Bharat</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline" className="border border-gray-300 text-gray-600 hover:bg-gray-50 bg-white">
                <Link href="/why-swadeshi">Why Swadeshi?</Link>
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                <Link href="/about">Add Software</Link>
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
            <span className="text-gray-900">Awesome</span> Swadeshi Software
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
            Find Indian Software Solutions for Every Need
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Join the <em>Swadeshi</em> movement by choosing Indian software alternatives to international tools.
            Discover quality solutions built by Indian innovators for the world.
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-500 h-10 w-10" />
              <Input
                type="text"
                placeholder="Search for Indian software alternatives..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-20 pr-8 py-8 text-3xl border-4 border-blue-400 rounded-2xl bg-white focus:border-blue-600 focus:ring-blue-600 shadow-2xl font-medium"
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                onClick={() => handleFilterChange("")}
                size="sm"
                className={selectedCategory === "" ?
                  "bg-blue-600 hover:bg-blue-700 text-white border-none" :
                  "border border-gray-300 text-gray-600 hover:bg-gray-50 bg-white"
                }
              >
                All Categories
              </Button>
              {categoryDisplayNames.map(category => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  onClick={() => handleFilterChange(category.slug)}
                  size="sm"
                  className={selectedCategory === category.slug ?
                    "bg-blue-600 hover:bg-blue-700 text-white border-none" :
                    "border border-gray-300 text-gray-600 hover:bg-gray-50 bg-white"
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full border border-gray-300">
              <p className="text-lg text-gray-700 font-medium">
                <span className="font-bold text-gray-800">{filteredSoftware.length}</span> Indian Software Alternatives
              </p>
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
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-green-200 hover:border-green-400 bg-white hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="min-w-0 flex-1 pr-3">
                      <CardTitle className="text-xl font-bold text-gray-900 truncate">
                        {software.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 font-medium mt-1">{software.company}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Favicon
                        websiteUrl={software.website}
                        name={software.name}
                        size={48}
                        className="h-12 max-w-24 object-contain"
                        fallbackClassName="h-10 w-10 text-blue-600"
                        customFaviconUrl={software.faviconUrl}
                        fixedHeight={true}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm">{software.description}</p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Alternative to:</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {software.alternatives.map((alt, altIndex) => (
                        <Link key={altIndex} href={getAlternativeUrl(alt)}>
                          <Badge variant="outline" className="text-xs border-blue-300 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-700 cursor-pointer transition-colors">
                            {alt}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-3 border-t border-gray-100">
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                      <Link href={software.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
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

          {filteredSoftware.length === 0 && (
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