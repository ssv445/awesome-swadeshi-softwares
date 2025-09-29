"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Flag, ExternalLink, ArrowLeft } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import Link from "next/link"
import { getCategoryDisplayName, getAppUrl } from "@/lib/data"
import { Favicon } from "@/components/favicon"
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AshokaChakra className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Awesome Swadeshi Apps</h1>
                <p className="text-sm text-gray-600">Indian Apps Directory • Atmanirbhar Bharat</p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/about">Add App</Link>
            </Button>
          </div>
        </div>
      </header>

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
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1 pr-3">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg">{software.name}</CardTitle>
                          <p className="text-sm text-gray-600">{software.company}</p>
                          <Badge variant="secondary" className="mt-1 bg-orange-100 text-orange-800">
                            {software.location}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="ml-2">{software.category}</Badge>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-3">
                      <Favicon
                        websiteUrl={software.website}
                        name={software.name}
                        size={48}
                        className="h-12 max-w-24 object-contain"
                        fallbackClassName="h-10 w-10 text-orange-500"
                        customFaviconUrl={software.faviconUrl}
                        fixedHeight={true}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{software.description}</p>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Alternative to:</p>
                    <div className="flex flex-wrap gap-1">
                      {software.alternatives.map((alt, altIndex) => (
                        <Badge key={altIndex} variant="outline" className="text-xs">
                          {alt}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary">{software.pricing}</Badge>
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={getAppUrl(software.category, software.name)}>
                          View Details
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={software.website} target="_blank" rel="noopener noreferrer">
                          Visit Site
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSoftware.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No apps found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <AshokaChakra className="h-5 w-5 text-orange-500" />
            <span className="font-bold">Awesome Swadeshi Apps</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Promoting Indian app innovation and helping users discover quality alternatives.
          </p>
          <p className="text-gray-500 text-xs">&copy; 2024 Made with ❤️ in India</p>
        </div>
      </footer>
    </div>
  )
}