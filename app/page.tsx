import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, Building, Download, ArrowRight, Flag, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { featuredSoftware, categories, stats } from "@/lib/data"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Indian Software Directory",
            description: "Discover the best Indian software alternatives to popular international tools",
            url: "https://indiansoftware.directory",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://indiansoftware.directory/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flag className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Indian Software Directory</h1>
                <p className="text-sm text-gray-600">Made in India, Made for the World</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                Categories
              </Link>
              <Link href="/submit" className="text-gray-600 hover:text-gray-900">
                Submit Software
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Button asChild>
                <Link href="/submit">Add Your Software</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Flag className="h-12 w-12 text-orange-500 mr-3" />
            <Heart className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover <span className="text-orange-500">Made in India</span> Software Alternatives
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Support homegrown innovation by choosing Indian software alternatives to popular international tools. Find
            quality, reliable, and cost-effective solutions built by Indian companies.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for software alternatives (e.g., 'Slack alternative', 'Zoom alternative')"
                className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-orange-500"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full">Search</Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{stats.totalSoftware}+</div>
              <div className="text-gray-600">Software Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{stats.totalCompanies}+</div>
              <div className="text-gray-600">Indian Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{stats.totalCategories}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{Math.floor(stats.totalDownloads / 1000000)}M+</div>
              <div className="text-gray-600">Downloads</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Software */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Indian Software</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover top-rated Indian software that millions of users trust as alternatives to international tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/software">
                View All Software
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore Indian software solutions across different categories and find the perfect alternative for your
              needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <p className="text-sm text-gray-600">{category.softwareCount} software</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{category.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-orange-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Have an Indian Software to Share?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Help grow our directory by submitting your favorite Indian software or your own product. Let's showcase the
            best of Indian innovation together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/submit">
                Submit Software
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-orange-500 border-white hover:bg-white bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Flag className="h-6 w-6 text-orange-500" />
                <span className="font-bold">Indian Software Directory</span>
              </div>
              <p className="text-gray-400 text-sm">
                Promoting Indian software innovation and helping users discover quality alternatives to international
                tools.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/categories" className="hover:text-white">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/software" className="hover:text-white">
                    All Software
                  </Link>
                </li>
                <li>
                  <Link href="/featured" className="hover:text-white">
                    Featured
                  </Link>
                </li>
                <li>
                  <Link href="/new" className="hover:text-white">
                    Recently Added
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/submit" className="hover:text-white">
                    Submit Software
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="hover:text-white">
                    Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white">
                    API
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Indian Software Directory. Made with ❤️ in India.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
