import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Flag,
  Star,
  Download,
  ExternalLink,
  Github,
  Building,
  MapPin,
  Calendar,
  Users,
  Check,
  ArrowRight,
  Share2,
  Heart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { featuredSoftware } from "@/lib/data"
import { generateSoftwareSchema } from "@/lib/utils/seo"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface SoftwarePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SoftwarePageProps): Promise<Metadata> {
  const software = featuredSoftware.find((s) => s.id === params.id)

  if (!software) {
    return {
      title: "Software Not Found - Indian Software Directory",
    }
  }

  return {
    title: `${software.name} - Indian Alternative to ${software.alternatives[0]} | Indian Software Directory`,
    description: `${software.description} Made in ${software.location} by ${software.company}. ${software.pricing} alternative to ${software.alternatives.join(", ")}.`,
    keywords: `${software.name}, ${software.company}, Indian software, ${software.alternatives.join(", ")} alternative, Made in India, ${software.category.name}`,
    authors: [{ name: software.company }],
    openGraph: {
      title: `${software.name} - Indian Alternative`,
      description: software.shortDescription,
      url: `https://indiansoftware.directory/software/${software.id}`,
      siteName: "Indian Software Directory",
      images: [
        {
          url: software.logo || "/placeholder.svg?height=400&width=400",
          width: 400,
          height: 400,
          alt: `${software.name} logo`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${software.name} - Indian Alternative`,
      description: software.shortDescription,
      images: [software.logo || "/placeholder.svg?height=400&width=400"],
    },
  }
}

export async function generateStaticParams() {
  return featuredSoftware.map((software) => ({
    id: software.id,
  }))
}

export default function SoftwarePage({ params }: SoftwarePageProps) {
  const software = featuredSoftware.find((s) => s.id === params.id)

  if (!software) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSoftwareSchema(software)),
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

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <Link href={`/category/${software.category.slug}`} className="hover:text-gray-900">
            {software.category.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{software.name}</span>
        </nav>

        {/* Software Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-start space-x-6 mb-6">
              <Image
                src={software.logo || "/placeholder.svg?height=80&width=80"}
                alt={`${software.name} logo`}
                width={80}
                height={80}
                className="rounded-xl shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{software.name}</h1>
                  {software.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xl text-gray-600 mb-4">{software.shortDescription}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{software.rating}</span>
                    <span className="ml-1">({software.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    <span>
                      {software.downloads ? `${Math.floor(software.downloads / 1000000)}M+ downloads` : "N/A"}
                    </span>
                  </div>
                  <Badge variant="outline">{software.pricing}</Badge>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button asChild size="lg" className="flex-1 sm:flex-none">
                <Link href={software.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Visit Website
                </Link>
              </Button>
              {software.github && (
                <Button asChild variant="outline" size="lg">
                  <Link href={software.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="lg">
                <Heart className="mr-2 h-5 w-5" />
                Save
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge className="bg-orange-100 text-orange-800">{software.category.name}</Badge>
              {software.tags.map((tag) => (
                <Link key={tag.id} href={`/tag/${tag.slug}`}>
                  <Badge variant="outline" className="hover:bg-gray-50 cursor-pointer">
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* Company Info Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{software.company}</h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {software.location}
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Founded
                    </div>
                    <div className="font-medium">{software.founded}</div>
                  </div>
                  {software.employees && (
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Users className="h-4 w-4 mr-1" />
                        Size
                      </div>
                      <div className="font-medium">{software.employees}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>About {software.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{software.description}</p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <Badge variant="outline">{software.category.name}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pricing</span>
                      <Badge variant="outline">{software.pricing}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {software.rating}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Downloads</span>
                      <span>{software.downloads ? `${Math.floor(software.downloads / 1000000)}M+` : "N/A"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>What makes {software.name} stand out</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {software.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="screenshots" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Screenshots</CardTitle>
                <CardDescription>See {software.name} in action</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {software.screenshots.map((screenshot, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border">
                      <Image
                        src={screenshot || "/placeholder.svg"}
                        alt={`${software.name} screenshot ${index + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alternatives" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>International Alternatives</CardTitle>
                <CardDescription>
                  {software.name} serves as an Indian alternative to these popular international tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {software.alternatives.map((alternative, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{alternative}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">International software</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">Why Choose the Indian Alternative?</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Support Indian innovation and economy</li>
                    <li>• Often more cost-effective pricing</li>
                    <li>• Better understanding of Indian market needs</li>
                    <li>• Local customer support and compliance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Software */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More {software.category.name} Software</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSoftware
              .filter((s) => s.id !== software.id && s.category.id === software.category.id)
              .slice(0, 3)
              .map((relatedSoftware) => (
                <Link key={relatedSoftware.id} href={`/software/${relatedSoftware.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={relatedSoftware.logo || "/placeholder.svg?height=40&width=40"}
                          alt={`${relatedSoftware.name} logo`}
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                        <div>
                          <CardTitle className="text-lg">{relatedSoftware.name}</CardTitle>
                          <p className="text-sm text-gray-600">{relatedSoftware.company}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-2">{relatedSoftware.shortDescription}</CardDescription>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {relatedSoftware.rating}
                        </div>
                        <Badge variant="outline">{relatedSoftware.pricing}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-orange-500 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Found a Great Indian Software?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Help us grow our directory by submitting more Indian software alternatives. Let's showcase the best of
            Indian innovation together.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/submit">
              Submit Software
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
