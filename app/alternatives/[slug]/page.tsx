import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flag, ExternalLink, ArrowRight, Check, Shield, Users, Star, Target, MessageSquare, CheckCircle, Video, Palette, Zap, Mail, Link as LinkIcon, Cloud, Globe, Crown } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAlternativeBySlug, getAllAlternativeSlugs } from "@/lib/alternatives-server"
import { getTotalAppsCount } from "@/lib/server-data"
import { Favicon } from "@/components/favicon"
import { getAlternativeUrl, getNotSwadeshiUrl, getAppUrl } from "@/lib/data"
import { generateBreadcrumbSchema } from "@/components/ui/Breadcrumbs"
import { getBaseUrl } from "@/lib/links"

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

// Only generate paths defined in generateStaticParams, return 404 for others
export const dynamicParams = false

// Force static generation - no ISR
export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  const slugs = getAllAlternativeSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: AlternativePageProps) {
  const { slug } = await params
  const alternative = getAlternativeBySlug(slug)

  if (!alternative) {
    return {
      title: 'Alternative Not Found',
    }
  }

  const mainApp = alternative.indianAlternatives[0]?.name || 'Indian Software'

  const baseUrl = getBaseUrl()

  return {
    title: `${mainApp} - ${alternative.internationalTool.name} Indian Alternative | Made in India`,
    description: `${mainApp} is a powerful Indian alternative to ${alternative.internationalTool.name}. Made in India ${alternative.internationalTool.category.toLowerCase()} app with local support, data sovereignty, and better pricing.`,
    keywords: `${alternative.internationalTool.name} Indian alternative, Made in India app, Swadeshi app, Indian ${alternative.internationalTool.category.toLowerCase()} software, ${mainApp}, Atmanirbhar Bharat`,
    alternates: {
      canonical: `${baseUrl}/alternatives/${slug}`,
    },
  }
}

export default async function AlternativePage({ params }: AlternativePageProps) {
  const { slug } = await params
  const alternative = getAlternativeBySlug(slug)
  const totalApps = getTotalAppsCount()

  if (!alternative) {
    notFound()
  }

  const mainAlternative = alternative.indianAlternatives[0]
  const IconComponent = iconMap[alternative.internationalTool.icon as keyof typeof iconMap] || AshokaChakra

  // Generate breadcrumb schema
  const baseUrl = getBaseUrl()
  const breadcrumbItems = [
    { label: 'Alternatives', href: '/alternatives' },
    { label: alternative.internationalTool.name, current: true }
  ]
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems, baseUrl)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="relative min-h-screen">

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Hero Section - Mobile Optimized */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <AshokaChakra className="h-12 w-12 md:h-16 md:w-16 text-blue-600" />
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            <span className="text-blue-600">Indian Alternative</span> of {alternative.internationalTool.name} 
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4 mb-2">
            {alternative.internationalTool.category} • {alternative.indianAlternatives[0]?.company}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
              {alternative.indianAlternatives.length} Alternative{alternative.indianAlternatives.length > 1 ? 's' : ''}
            </Badge>
          </div>
        </div>


        {/* Indian Alternatives Listing */}
        <div className="mb-8 md:mb-12">
          {alternative.indianAlternatives.length === 0 ? (
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="mb-6">
                  <AshokaChakra className="h-16 w-16 md:h-20 md:w-20 text-orange-600 mx-auto opacity-50" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  No Swadeshi Alternatives Found Yet
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
                  We don't currently have any <strong>Made in India</strong> alternatives listed for {alternative.internationalTool.name}.
                  {alternative.internationalTool.name} is a foreign-owned company, and we're actively looking for Indian alternatives.
                </p>
                <div className="bg-white rounded-xl p-6 border-2 border-orange-300 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
                    <Flag className="h-5 w-5 text-orange-600" />
                    Know a Swadeshi Alternative?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    If you know of an Indian-owned alternative to {alternative.internationalTool.name},
                    please help us build this directory by suggesting it!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                      <Link href="/about">
                        <Flag className="mr-2 h-5 w-5" />
                        Suggest an Alternative
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-2 border-green-600">
                      <Link href="/">
                        Browse All Swadeshi Apps
                      </Link>
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Learn more about{' '}
                  <Link href={getNotSwadeshiUrl(alternative.internationalTool.name)} className="text-blue-600 hover:underline font-medium">
                    why {alternative.internationalTool.name} is not Swadeshi
                  </Link>
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {alternative.indianAlternatives.map((indianAlt, index) => (
              <Link
                key={index}
                href={getAppUrl(indianAlt.categorySlug, indianAlt.slug)}
                className="block group"
              >
                <Card className="group-hover:shadow-xl transition-all duration-300 border-2 border-green-200 group-hover:border-green-400 bg-white">
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      {/* Logo */}
                      <div className="flex-shrink-0 flex items-center justify-center md:justify-start">
                        <Favicon
                          websiteUrl={indianAlt.website}
                          name={indianAlt.name}
                          size={64}
                          className="h-16 w-16 md:h-20 md:w-20 object-contain"
                          fallbackClassName="h-16 w-16 md:h-20 md:w-20 text-blue-600"
                          customFaviconUrl={indianAlt.faviconUrl}
                          fixedHeight={true}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-3 mb-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                              {indianAlt.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <p className="text-sm md:text-base text-gray-600 font-medium">
                                by {indianAlt.company}
                              </p>
                              <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                                <Flag className="h-3 w-3 mr-1" />
                                Made in India
                              </Badge>
                              <Badge variant="outline" className="text-xs">{indianAlt.pricing}</Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                          {indianAlt.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs border-blue-300 text-blue-700 bg-blue-50 group-hover:bg-blue-100 transition-colors">
                            Alternative to {alternative.internationalTool.name}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-gray-300 text-gray-600 bg-gray-50">
                            {indianAlt.location}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
            </div>
          )}
        </div>

        {/* SEO Content - Below Listing */}
        {alternative.indianAlternatives.length > 0 && (
          <div className="mt-8 md:mt-12 space-y-6 md:space-y-8">
            {/* Why Choose Indian Alternative */}
            <div className="bg-gradient-to-br from-orange-50 via-white to-green-50 rounded-xl p-6 md:p-8 border-2 border-green-200">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Flag className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
                Why Choose Indian Alternative to {alternative.internationalTool.name}?
              </h2>
              <div className="space-y-3 md:space-y-4">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <strong>{alternative.indianAlternatives[0]?.name}</strong> is a <strong>Made in India</strong> {alternative.internationalTool.category.toLowerCase()} app
                  that serves as a powerful <strong>Indian alternative</strong> to {alternative.internationalTool.name}.
                  As a <strong>Swadeshi app</strong>, it supports India's Atmanirbhar Bharat initiative while delivering world-class features.
                </p>

              <div className="grid md:grid-cols-3 gap-3 md:gap-4 mt-4">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Data Sovereignty</h4>
                      <p className="text-xs text-gray-600">Your data stays within India</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Local Support</h4>
                      <p className="text-xs text-gray-600">Indian timezone assistance</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Better Pricing</h4>
                      <p className="text-xs text-gray-600">Optimized for Indian market</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gray-50 rounded-xl p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              About {alternative.internationalTool.name} Indian Alternative{alternative.indianAlternatives.length > 1 ? 's' : ''}
            </h3>
            <div className="prose prose-sm md:prose-base prose-gray max-w-none space-y-3 md:space-y-4">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {alternative.internationalTool.name} is a widely-used {alternative.internationalTool.category.toLowerCase()} platform globally.
                However, Indian businesses and individuals are increasingly choosing <strong>Made in India apps</strong> like{' '}
                {alternative.indianAlternatives.slice(0, 2).map(alt => alt.name).join(' and ')} as their preferred{' '}
                <strong>Indian alternative</strong> to {alternative.internationalTool.name}.
              </p>

              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                These <strong>Swadeshi apps</strong> are developed by Indian companies—{alternative.indianAlternatives[0]?.company}
                {alternative.indianAlternatives.length > 1 && `, ${alternative.indianAlternatives[1]?.company}`}—offering
                competitive features while ensuring your data sovereignty, local customer support, and contributing to India's digital economy.
              </p>

              <h4 className="text-base md:text-lg font-semibold text-gray-900 mt-4 md:mt-6 mb-3">
                Key Benefits of Choosing Indian App Alternatives:
              </h4>
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Made in India</strong>: Support Indian innovation and job creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Data Privacy</strong>: Your business data remains within Indian jurisdiction</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Local Support</strong>: Customer service in Indian time zones with cultural understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Market Pricing</strong>: Competitive pricing optimized for Indian businesses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Atmanirbhar Bharat</strong>: Contribute to India's self-reliant digital ecosystem</span>
                </li>
              </ul>
            </div>
          </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 md:p-8 border-2 border-blue-200 mt-8 md:mt-12">
          <div className="mb-4">
            <AshokaChakra className="h-10 w-10 md:h-12 md:w-12 text-blue-600 mx-auto" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
            Explore More Swadeshi Apps
          </h2>
          <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 max-w-2xl mx-auto px-4">
            Discover {totalApps}+ <strong>Made in India</strong> software alternatives and support the Swadeshi movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
              <Link href="/">
                Browse All Indian Apps
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-green-600 text-green-700 hover:bg-green-50">
              <Link href="/alternatives">View All Alternatives</Link>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}