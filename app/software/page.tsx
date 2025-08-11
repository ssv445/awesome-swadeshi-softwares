import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Flag, Star, Download, ArrowRight, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { featuredSoftware } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Indian Software - Indian Software Directory",
  description:
    "Browse all Indian software alternatives. Discover quality Made in India solutions across all categories and find the perfect alternative to international tools.",
  keywords: "Indian software, Made in India, software alternatives, all software, Indian tech companies",
}

export default function AllSoftwarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Flag className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Indian Software Directory</h1>
                <p className="text-sm text-gray-600">Made in India, Made for the World</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                Categories
              </Link>
              <Link href="/submit" className="text-gray-600 hover:text-gray-900">
                Submit Software
              </Link>
              <Button asChild>
                <Link href="/submit">Add Your Software</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Indian Software</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover all the amazing software solutions built by Indian companies. Find your perfect alternative to
            international tools.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search software, companies, or alternatives..."
              className="pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-orange-500"
            />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Pricing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pricing</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="freemium">Freemium</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="open-source">Open Source</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-medium">{featuredSoftware.length}</span> Indian software solutions
          </p>
        </div>

        {/* Software Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredSoftware.map((software) => (
            <Card key={software.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={software.logo || "/placeholder.svg?height=48&width=48"}
                      alt={`${software.name} logo`}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                    <div>
                      <CardTitle className="text-lg">{software.name}</CardTitle>
                      <p className="text-sm text-gray-600">{software.company}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {software.location.split(",")[0]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">{software.shortDescription}</CardDescription>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    {software.rating}
                  </div>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {software.downloads ? `${Math.floor(software.downloads / 1000000)}M+` : "N/A"}
                  </div>
                  <Badge variant="outline">{software.pricing}</Badge>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Alternative to:</p>
                  <div className="flex flex-wrap gap-1">
                    {software.alternatives.slice(0, 2).map((alt, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {alt}
                      </Badge>
                    ))}
                    {software.alternatives.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{software.alternatives.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button asChild className="flex-1">
                    <Link href={`/software/${software.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={software.website} target="_blank" rel="noopener noreferrer">
                      Visit Site
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button size="lg" variant="outline">
            Load More Software
          </Button>
        </div>
      </div>
    </div>
  )
}
