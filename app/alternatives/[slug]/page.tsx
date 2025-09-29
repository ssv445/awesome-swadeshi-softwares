import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flag, ExternalLink, ArrowRight, Check, Shield, Users, Star, Target, MessageSquare, CheckCircle, Video, Palette, Zap, Mail, Link as LinkIcon, Cloud, Globe, Crown } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import { AppShell } from "@/components/layout/AppShell"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAlternativeBySlug, getAllAlternativeSlugs } from "@/lib/alternatives-server"
import { Favicon } from "@/components/favicon"

// Icon mapping
const iconMap = {
  Crown, Shield, Users, Star, Target, MessageSquare, CheckCircle,
  Video, Palette, Zap, Mail, LinkIcon, Flag, Cloud, Globe, AshokaChakra
}

interface AlternativePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllAlternativeSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace('-alternative', ''),
  }))
}

export async function generateMetadata({ params }: AlternativePageProps) {
  const { slug } = await params
  const fullSlug = `${slug}-alternative`
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

export default async function AlternativePage({ params }: AlternativePageProps) {
  const { slug } = await params
  const fullSlug = `${slug}-alternative`
  const alternative = getAlternativeBySlug(fullSlug)

  if (!alternative) {
    notFound()
  }

  const mainAlternative = alternative.indianAlternatives[0]
  const IconComponent = iconMap[alternative.internationalTool.icon as keyof typeof iconMap] || AshokaChakra

  return (
    <AppShell>
      <div className="relative min-h-screen">

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div>
              <AshokaChakra className="h-20 w-20 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Best Indian Alternatives to <span className="text-blue-600">{alternative.internationalTool.name}</span>
          </h1>
          <p className="text-xl text-gray-700 mb-4 font-medium">
            {alternative.indianAlternatives.length} Indian {alternative.internationalTool.category} Solutions
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
            Discover powerful Indian software alternatives to {alternative.internationalTool.name} that offer competitive features,
            local customer support, data sovereignty, and help build India's digital ecosystem.
            These {alternative.internationalTool.category.toLowerCase()} tools are developed by Indian companies and designed
            for global markets while understanding Indian business needs.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-3xl mx-auto">
            <p className="text-blue-800 font-medium">
              Why choose Indian alternatives? Support <em>Atmanirbhar Bharat</em>, ensure data stays within India,
              get customer support in your timezone, and often enjoy better pricing for the Indian market.
            </p>
          </div>
        </div>


        {/* Indian Alternatives */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {alternative.indianAlternatives.length} Indian Software Alternative{alternative.indianAlternatives.length > 1 ? 's' : ''} to {alternative.internationalTool.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alternative.indianAlternatives.map((indianAlt, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-green-200 hover:border-green-400 bg-white hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="min-w-0 flex-1 pr-3">
                      <CardTitle className="text-xl font-bold text-gray-900 truncate">
                        {indianAlt.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 font-medium mt-1">by {indianAlt.company}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Favicon
                        websiteUrl={indianAlt.website}
                        name={indianAlt.name}
                        size={48}
                        className="h-12 max-w-24 object-contain"
                        fallbackClassName="h-10 w-10 text-blue-600"
                        customFaviconUrl={indianAlt.faviconUrl}
                        fixedHeight={true}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm">{indianAlt.description}</p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Alternative to:</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs border-blue-300 text-blue-600 bg-blue-50">
                        {alternative.internationalTool.name}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3 border-t border-gray-100">
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                      <Link href={indianAlt.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* SEO Content */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              About {alternative.internationalTool.name} Alternatives
            </h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                {alternative.internationalTool.name} is a popular {alternative.internationalTool.category.toLowerCase()} tool used by businesses worldwide.
                However, many Indian companies are now choosing Indian alternatives that offer similar functionality while providing
                additional benefits like data sovereignty, local customer support, and better understanding of the Indian market.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our curated list features {alternative.indianAlternatives.length} verified Indian software solution{alternative.indianAlternatives.length > 1 ? 's' : ''}
                that can effectively replace {alternative.internationalTool.name}. These alternatives are developed by Indian companies,
                ensuring your data stays within India and supporting the Atmanirbhar Bharat initiative.
              </p>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits of Choosing Indian Alternatives:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Data sovereignty - Your business data remains within Indian borders</li>
                <li>Local customer support in Indian time zones</li>
                <li>Better pricing tailored for the Indian market</li>
                <li>Cultural understanding of Indian business practices</li>
                <li>Support for Indian languages and local requirements</li>
                <li>Contributing to India's digital economy and job creation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-50 rounded-xl p-8 border border-blue-200 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Explore More Indian Software Alternatives
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Discover 100+ Indian software alternatives across all categories and join the Swadeshi movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
              <Link href="/">
                Browse All Software
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border border-gray-300 text-gray-600 hover:bg-gray-50">
              <Link href="/alternatives">View All Alternatives</Link>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </AppShell>
  )
}