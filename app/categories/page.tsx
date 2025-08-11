import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Flag, Building, ArrowRight } from "lucide-react"
import Link from "next/link"
import { categories } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Software Categories - Indian Software Directory",
  description:
    "Browse Indian software by categories. Find alternatives in communication, development, business, design, education, and finance.",
  keywords: "Indian software categories, software types, business software, development tools, communication apps",
}

export default function CategoriesPage() {
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
              <Link href="/categories" className="text-orange-500 font-medium">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Software Categories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore Indian software solutions organized by category. Find the perfect alternative for your specific
            needs.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search categories or software..."
              className="pl-12 pr-4 py-3 text-lg rounded-full border-2 border-gray-200 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-4 rounded-xl ${category.color}`}>
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {category.softwareCount} software
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">View all software</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Popular Tags Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Tags</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Open Source", "SaaS", "Mobile App", "Web App", "AI/ML", "Blockchain", "Cloud", "Enterprise"].map(
              (tag) => (
                <Link key={tag} href={`/tag/${tag.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                  <Badge
                    variant="outline"
                    className="px-4 py-2 text-sm hover:bg-orange-50 hover:border-orange-300 cursor-pointer"
                  >
                    {tag}
                  </Badge>
                </Link>
              ),
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-orange-500 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Category?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Help us expand our directory by suggesting new categories or submitting software that doesn't fit existing
            ones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/submit">Submit Software</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-orange-500 border-white hover:bg-white bg-transparent"
            >
              <Link href="/contact">Suggest Category</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
