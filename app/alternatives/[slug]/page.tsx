import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flag, ExternalLink, Crown, Flower2, ArrowRight, Check, Shield, Users, Star, Target, MessageSquare, CheckCircle, Video, Palette, Zap, Mail, Link as LinkIcon, Cloud, Globe } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAlternativeBySlug, getAllAlternativeSlugs } from "@/lib/alternatives-server"

// Icon mapping
const iconMap = {
  Crown, Flower2, Shield, Users, Star, Target, MessageSquare, CheckCircle,
  Video, Palette, Zap, Mail, LinkIcon, Flag, Cloud, Globe, AshokaChakra
}

interface AlternativePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllAlternativeSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace('-alternative', ''),
  }))
}

export async function generateMetadata({ params }: AlternativePageProps) {
  const fullSlug = `${params.slug}-alternative`
  const alternative = getAlternativeBySlug(fullSlug)

  if (!alternative) {
    return {
      title: 'Alternative Not Found',
    }
  }

  return {
    title: `${alternative.internationalTool.name} Alternative - Indian Software | Awesome Swadeshi`,
    description: `Discover ${alternative.indianAlternatives[0]?.name} - a powerful Indian alternative to ${alternative.internationalTool.name}. ${alternative.internationalTool.description}`,
    keywords: `${alternative.internationalTool.name} alternative, Indian software, ${alternative.indianAlternatives[0]?.name}, Swadeshi, Atmanirbhar Bharat`,
  }
}

export default function AlternativePage({ params }: AlternativePageProps) {
  const fullSlug = `${params.slug}-alternative`
  const alternative = getAlternativeBySlug(fullSlug)

  if (!alternative) {
    notFound()
  }

  const mainAlternative = alternative.indianAlternatives[0]
  const IconComponent = iconMap[alternative.internationalTool.icon as keyof typeof iconMap] || AshokaChakra

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b border-green-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <AshokaChakra className="h-10 w-10 text-blue-600" />
                <Crown className="h-4 w-4 text-orange-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Awesome Swadeshi
                </h1>
                <p className="text-sm text-gray-600 font-medium">Indian Software Directory • Atmanirbhar Bharat</p>
              </div>
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white border-none">
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
              <IconComponent className="h-20 w-20 text-green-600" />
              <div className="absolute -top-2 -left-2 w-24 h-24 border border-green-300 rounded-full opacity-40"></div>
              <div className="absolute -bottom-1 -right-1">
                <Flower2 className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-green-600">{alternative.internationalTool.name}</span> Alternative
          </h1>
          <p className="text-xl text-gray-700 mb-4 font-medium">
            Indian {alternative.internationalTool.category} Solutions
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            {alternative.internationalTool.description}. Discover powerful Indian alternatives
            that offer better features, local support, and help support the Indian tech ecosystem.
          </p>
        </div>

        {/* Why Choose Indian Alternative */}
        <div className="bg-white rounded-xl p-8 mb-12 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Choose an Indian <span className="text-green-600">{alternative.internationalTool.name} Alternative</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {alternative.benefits.map((benefit, index) => {
              const BenefitIcon = iconMap[benefit.icon as keyof typeof iconMap] || Crown
              return (
                <div key={index} className="text-center">
                  <BenefitIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Indian Alternatives */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Indian {alternative.internationalTool.name} Alternatives ({alternative.indianAlternatives.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alternative.indianAlternatives.map((indianAlt, index) => (
              <Card key={index} className="border border-green-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-10 w-10 text-green-600" />
                      <div>
                        <CardTitle className="text-xl text-gray-900">{indianAlt.name}</CardTitle>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">{indianAlt.pricing}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {indianAlt.description}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    by {indianAlt.company}
                  </p>

                  {indianAlt.features.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {indianAlt.features.slice(0, 3).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700 text-xs">{feature}</span>
                          </li>
                        ))}
                        {indianAlt.features.length > 3 && (
                          <li className="text-xs text-gray-500">
                            +{indianAlt.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2">
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-none w-full">
                      <Link href={indianAlt.website} target="_blank" rel="noopener noreferrer">
                        Try {indianAlt.name}
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {alternative.comparison && (
          <div className="bg-white rounded-xl p-8 mb-12 border border-green-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {mainAlternative.name} vs {alternative.internationalTool.name}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-green-600">{mainAlternative.name} (Indian)</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600">{alternative.internationalTool.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {alternative.comparison.map((comp, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 px-4 text-gray-700">{comp.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {comp.indian === true ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-gray-700">{comp.indian}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {comp.international === true ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : comp.international === false ? (
                          <span className="text-gray-400">No</span>
                        ) : (
                          <span className="text-gray-400">{comp.international}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-green-50 rounded-xl p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Switch to an Indian Alternative?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Choose from {alternative.indianAlternatives.length} powerful Indian alternatives to {alternative.internationalTool.name} and support the Indian tech ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
              <Link href={mainAlternative.website} target="_blank" rel="noopener noreferrer">
                Try {mainAlternative.name}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border border-gray-300 text-gray-600 hover:bg-gray-50">
              <Link href="/alternatives">Explore More Alternatives</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 px-4 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <AshokaChakra className="h-8 w-8 text-blue-400" />
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