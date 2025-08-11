import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Flag, Star, Download, ArrowRight, Filter, Building } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { categories, getSoftwareByCategory } from "@/lib/data"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug)

  if (!category) {
    return {
      title: "Category Not Found - Indian Software Directory",
    }
  }

  return {
    title: `${category.name} Software - Indian Software Directory`,
    description: `Discover the best Indian ${category.name.toLowerCase()} software. Find alternatives to popular international tools in ${category.name.toLowerCase()}.`,
    keywords: `Indian ${category.name.toLowerCase()}, ${category.name} software, Indian alternatives, Made in India`,
  }
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const categorySoftware = getSoftwareByCategory(params.slug)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${category.name} Software`,
            description: category.description,
            url: `https://indiansoftware.directory/category/${category.slug}`,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: category.softwareCount,
              itemListElement: categorySoftware.map((software, index) => ({
                "@type": "SoftwareApplication",
                position: index + 1,
                name: software.name,
                description: software.shortDescription,
                url: `/software/${software.id}`,
              })),
            },
          }),
        }}
      />

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
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-gray-900">
            Categories
          </Link>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className={`p-6 rounded-2xl ${category.color}`}>
              <Building className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">{category.description}</p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {category.softwareCount} Indian software solutions
          </Badge>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={`Search ${category.name.toLowerCase()} software...`}
              className="pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-orange-500"
            />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
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

        {/* Software Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categorySoftware.map((software) => (
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

        {/* Related Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Explore Other Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories
              .filter((c) => c.id !== category.id)
              .slice(0, 3)
              .map((relatedCategory) => (
                <Link key={relatedCategory.id} href={`/category/${relatedCategory.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${relatedCategory.color}`}>
                          <Building className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{relatedCategory.name}</CardTitle>
                          <p className="text-sm text-gray-600">{relatedCategory.softwareCount} software</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
