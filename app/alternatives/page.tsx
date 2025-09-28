import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flag, ExternalLink, Crown, Flower2, ArrowRight, Video, Palette, Target, Mail, Link as LinkIcon, Shield, Users, Star, MessageSquare, CheckCircle, Zap, Cloud, Globe } from "lucide-react"
import Link from "next/link"
import { getAllAlternatives } from "@/lib/alternatives-server"

// Icon mapping
const iconMap = {
  Crown, Flower2, Video, Palette, Target, Mail, LinkIcon, Flag, Shield, Users, Star, MessageSquare, CheckCircle, Zap, Cloud, Globe
}

export default function AlternativesIndexPage() {
  const alternativesData = getAllAlternatives()
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b border-green-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Flag className="h-10 w-10 text-green-600" />
                <Crown className="h-4 w-4 text-orange-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Awesome Swadeshi
                </h1>
                <p className="text-sm text-gray-600 font-medium">Indian Software Directory • Atmanirbhar Bharat</p>
              </div>
            </Link>
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white border-none">
              <Link href="/">Back to Directory</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Flag className="h-20 w-20 text-green-600" />
              <div className="absolute -top-2 -left-2 w-24 h-24 border border-green-300 rounded-full opacity-40"></div>
              <div className="absolute -bottom-1 -right-1">
                <Flower2 className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Indian Software <span className="text-green-600">Alternatives</span>
          </h1>
          <p className="text-xl text-gray-700 mb-4 font-medium">
            Discover Indian Alternatives to Popular International Tools
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore comprehensive guides comparing Indian software solutions with their international counterparts.
            Make informed decisions while supporting the Swadeshi movement and Atmanirbhar Bharat.
          </p>
        </div>

        {/* Alternatives Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {alternativesData.map((alternative) => {
            const IconComponent = iconMap[alternative.internationalTool.icon as keyof typeof iconMap] || Flag
            const slug = alternative.slug.replace('-alternative', '')

            return (
              <Card key={alternative.slug} className="group hover:shadow-lg transition-all duration-300 border border-green-200 hover:border-green-400 bg-white hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3 mb-4">
                    <IconComponent className="h-12 w-12 text-green-600" />
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900">
                        {alternative.internationalTool.name} Alternative
                      </CardTitle>
                      <Badge variant="outline" className="border border-gray-300 text-gray-600 bg-gray-50 mt-1">
                        {alternative.internationalTool.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {alternative.internationalTool.description}
                  </p>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Featured Indian Alternative:
                    </p>
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-700">
                        {alternative.indianAlternatives[0]?.name}
                      </span>
                      <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                        {alternative.indianAlternatives[0]?.pricing}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm text-gray-600">
                      {alternative.indianAlternatives.length} alternative{alternative.indianAlternatives.length > 1 ? 's' : ''}
                    </div>
                    <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white border-none">
                      <Link href={`/alternatives/${slug}`}>
                        View Comparison
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Why Choose Indian Alternatives */}
        <div className="bg-white rounded-xl p-8 mb-12 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Choose <span className="text-green-600">Indian Software Alternatives</span>?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Crown className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Better Features</h3>
              <p className="text-gray-600 text-sm">Often built with more advanced features and better user experience</p>
            </div>
            <div className="text-center">
              <Flag className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Sovereignty</h3>
              <p className="text-gray-600 text-sm">Your data stays within Indian borders for better privacy and compliance</p>
            </div>
            <div className="text-center">
              <Flower2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Support</h3>
              <p className="text-gray-600 text-sm">Customer support in Indian time zones with cultural understanding</p>
            </div>
            <div className="text-center">
              <ExternalLink className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Economic Impact</h3>
              <p className="text-gray-600 text-sm">Support Indian startups and contribute to Atmanirbhar Bharat initiative</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-green-50 rounded-xl p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore the Complete Indian Software Directory
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover 100+ Indian software alternatives across all categories and join the Swadeshi movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white border-none">
              <Link href="/">
                Browse All Software
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border border-gray-300 text-gray-600 hover:bg-gray-50">
              <Link href="/about">Add Your Software</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 px-4 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Flag className="h-8 w-8 text-green-400" />
              <Flower2 className="h-4 w-4 text-orange-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold text-white">
              Awesome Swadeshi
            </span>
            <Crown className="h-6 w-6 text-green-400" />
          </div>
          <p className="text-gray-200 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Promoting Indian software innovation and helping users discover quality alternatives.
            Supporting <em>Swadeshi</em> movement and <em>Atmanirbhar Bharat</em> through technology.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Flower2 className="h-5 w-5 text-orange-400" />
            <p className="text-gray-300 text-sm">&copy; 2024 Made with ❤️ in India</p>
            <Crown className="h-4 w-4 text-green-400" />
          </div>
        </div>
      </footer>
    </div>
  )
}