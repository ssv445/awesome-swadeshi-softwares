"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Flag, ExternalLink, Star, Flower2 } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Decorative Pattern Overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20-15a15 15 0 100 30 15 15 0 000-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header */}
      <header className="border-b-2 border-amber-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Flag className="h-10 w-10 text-amber-600" />
                <Flower2 className="h-4 w-4 text-red-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 bg-clip-text text-transparent">
                  Awesome Swadeshi
                </h1>
                <p className="text-sm text-amber-700 font-medium">Indian Software Directory • Atmanirbhar Bharat</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline" className="border-2 border-amber-400 text-amber-700 hover:bg-amber-100 bg-white/80 backdrop-blur-sm">
                <Link href="/why-swadeshi">Why Swadeshi?</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white border-none shadow-lg">
                <Link href="/about">Add Software</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 relative">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-amber-300 opacity-20">
          <Star className="h-16 w-16" />
        </div>
        <div className="absolute top-20 right-20 text-red-300 opacity-20">
          <Flower2 className="h-20 w-20" />
        </div>
        <div className="absolute bottom-10 left-1/4 text-orange-300 opacity-20">
          <Star className="h-12 w-12" />
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Flag className="h-20 w-20 text-amber-600 drop-shadow-lg" />
              <div className="absolute -top-2 -left-2 w-24 h-24 border-2 border-amber-300 rounded-full opacity-50"></div>
              <div className="absolute -bottom-1 -right-1">
                <Flower2 className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 bg-clip-text text-transparent">Awesome</span> Swadeshi Software
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 mb-4 font-medium">
            Discover Amazing Indian Software Alternatives
          </p>
          <p className="text-lg text-amber-700 mb-12 max-w-3xl mx-auto">
            Join the <em>Swadeshi</em> movement by choosing Indian software alternatives to international tools.
            Discover awesome, quality solutions built by Indian innovators for the world.
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 h-6 w-6" />
              <Input
                type="text"
                placeholder="Search for Indian software alternatives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 pr-4 py-4 text-lg border-2 border-amber-300 rounded-2xl bg-white/80 backdrop-blur-sm focus:border-amber-500 focus:ring-amber-500 shadow-lg"
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                onClick={() => setSelectedCategory("")}
                size="sm"
                className={selectedCategory === "" ?
                  "bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white border-none shadow-lg" :
                  "border-2 border-amber-400 text-amber-700 hover:bg-amber-100 bg-white/80 backdrop-blur-sm"
                }
              >
                All Categories
              </Button>
              {categoryDisplayNames.map(category => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.slug)}
                  size="sm"
                  className={selectedCategory === category.slug ?
                    "bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white border-none shadow-lg" :
                    "border-2 border-amber-400 text-amber-700 hover:bg-amber-100 bg-white/80 backdrop-blur-sm"
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-amber-300 shadow-lg">
              <Flower2 className="h-5 w-5 text-red-500" />
              <p className="text-lg text-amber-800 font-medium">
                <span className="font-bold text-red-600">{filteredSoftware.length}</span> Indian Software Alternatives
              </p>
              <Star className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Software Grid */}
      <section className="py-20 px-4 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm-10-6a6 6 0 100 12 6 6 0 000-12z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSoftware.map((software, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:border-amber-400 bg-white/90 backdrop-blur-sm hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="h-4 w-4 text-amber-500" />
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
                          {software.name}
                        </CardTitle>
                      </div>
                      <p className="text-sm text-amber-700 font-medium">{software.company}</p>
                      <div className="flex items-center space-x-1 mt-2">
                        <Flag className="h-3 w-3 text-amber-600" />
                        <Badge className="bg-gradient-to-r from-amber-100 to-red-100 text-amber-800 border-amber-300 text-xs">
                          {software.location}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-2 border-amber-400 text-amber-700 bg-amber-50">
                      {software.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{software.description}</p>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Flower2 className="h-4 w-4 text-red-500" />
                      <p className="text-sm font-medium text-amber-700">Alternative to:</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {software.alternatives.map((alt, altIndex) => (
                        <Badge key={altIndex} variant="outline" className="text-xs border-red-300 text-red-700 bg-red-50 hover:bg-red-100">
                          {alt}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300">
                      {software.pricing}
                    </Badge>
                    <Button asChild size="sm" className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white border-none shadow-lg group-hover:shadow-xl">
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

          {filteredSoftware.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm border-2 border-amber-300 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
                <Star className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <p className="text-amber-800 text-lg font-medium">No Software Found</p>
                <p className="text-amber-600 text-sm">Try adjusting your search criteria or browse all categories.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 via-red-900 to-amber-900 py-12 px-4 relative">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm-20-12a12 12 0 100 24 12 12 0 000-24z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Flag className="h-8 w-8 text-amber-400" />
              <Flower2 className="h-4 w-4 text-red-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-red-300 bg-clip-text text-transparent">
              Awesome Swadeshi
            </span>
            <Star className="h-6 w-6 text-amber-400" />
          </div>
          <p className="text-amber-200 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Promoting awesome Indian software innovation and helping users discover quality alternatives.
            Supporting <em>Swadeshi</em> movement and <em>Atmanirbhar Bharat</em> through technology.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Flower2 className="h-5 w-5 text-red-400" />
            <p className="text-amber-300 text-sm">&copy; 2024 Made with ❤️ in India</p>
            <Star className="h-4 w-4 text-amber-400" />
          </div>
        </div>
      </footer>
    </div>
  )
}