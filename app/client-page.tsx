"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Flag, ExternalLink } from "lucide-react"
import Link from "next/link"
import { getCategoryDisplayName } from "@/lib/data"
import type { Software } from "@/lib/data"

interface ClientHomePageProps {
  allSoftware: Software[]
  categories: string[]
}

export default function ClientHomePage({ allSoftware, categories }: ClientHomePageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flag className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Indian Software Directory</h1>
                <p className="text-sm text-gray-600">Made in India, Made for the World</p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/about">Add Software</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Flag className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Discover <span className="text-orange-500">Made in India</span> Software
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A curated directory of Indian software alternatives to popular international tools.
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search software..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                onClick={() => setSelectedCategory("")}
                size="sm"
              >
                All
              </Button>
              {categoryDisplayNames.map(category => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.slug)}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              <span className="font-bold text-orange-500">{filteredSoftware.length}</span> Indian software alternatives
            </p>
          </div>
        </div>
      </section>

      {/* Software Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSoftware.map((software, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{software.name}</CardTitle>
                      <p className="text-sm text-gray-600">{software.company}</p>
                      <Badge variant="secondary" className="mt-1 bg-orange-100 text-orange-800">
                        {software.location}
                      </Badge>
                    </div>
                    <Badge variant="outline">{software.category}</Badge>
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

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{software.pricing}</Badge>
                    <Button asChild size="sm">
                      <Link href={software.website} target="_blank" rel="noopener noreferrer">
                        Visit Site
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSoftware.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No software found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Flag className="h-5 w-5 text-orange-500" />
            <span className="font-bold">Indian Software Directory</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Promoting Indian software innovation and helping users discover quality alternatives.
          </p>
          <p className="text-gray-500 text-xs">&copy; 2024 Made with ❤️ in India</p>
        </div>
      </footer>
    </div>
  )
}