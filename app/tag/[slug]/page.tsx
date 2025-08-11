import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Flag, Star, Download, ArrowRight, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { tags, getSoftwareByTag } from "@/lib/data"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface TagPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = tags.find((t) => t.slug === params.slug)

  if (!tag) {
    return {
      title: "Tag Not Found - Indian Software Directory",
    }
  }

  return {
    title: `${tag.name} Software - Indian Software Directory`,
    description: `Discover Indian software tagged with ${tag.name}. Find quality alternatives built by Indian companies.`,
    keywords: `${tag.name}, Indian software, Made in India, software alternatives`,
  }
}

export async function generateStaticParams() {
  return tags.map((tag) => ({
    slug: tag.slug,
  }))
}

export default function TagPage({ params }: TagPageProps) {
  const tag = tags.find((t) => t.slug === params.slug)

  if (!tag) {
    notFound()
  }

  const tagSoftware = getSoftwareByTag(params.slug)

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
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">Tag: {tag.name}</span>
        </nav>

        {/* Tag Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-6 rounded-2xl bg-gray-100">
              <Tag className="h-12 w-12 text-gray-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Badge className={`text-2xl px-6 py-3 ${tag.color}`}>{tag.name}</Badge>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Discover Indian software solutions tagged with {tag.name}
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {tagSoftware.length} software found
          </Badge>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={`Search ${tag.name} software...`}
              className="pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Software Grid */}
        {tagSoftware.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tagSoftware.map((software) => (
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
                    <div className="flex flex-wrap gap-1">
                      {software.tags.map((softwareTag) => (
                        <Badge
                          key={softwareTag.id}
                          className={softwareTag.id === tag.id ? "bg-orange-500 text-white" : softwareTag.color}
                        >
                          {softwareTag.name}
                        </Badge>
                      ))}
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
        ) : (
          <div className="text-center py-12">
            <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No software found</h3>
            <p className="text-gray-600 mb-6">We don't have any software tagged with "{tag.name}" yet.</p>
            <Button asChild>
              <Link href="/submit">Submit Software</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
