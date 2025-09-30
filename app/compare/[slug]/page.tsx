import { notFound } from "next/navigation"
import { AppShell } from "@/components/layout/AppShell"
import { HeroSection } from "@/components/ui/HeroSection"
import { FeatureCard } from "@/components/ui/FeatureCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, ExternalLink, ArrowRight, Shield, TrendingUp, Users, Flag } from "lucide-react"
import Link from "next/link"
import { getComparison, getAllComparisonSlugs } from "@/lib/comparisons-server"
import { SafeImage } from "@/components/SafeImage"
import { Breadcrumbs, generateBreadcrumbs } from "@/components/ui/Breadcrumbs"
import type { Metadata } from "next"

interface ComparisonPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllComparisonSlugs()
  return slugs.map((slug) => ({
    slug
  }))
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const { slug } = await params
  const comparison = getComparison(slug)

  if (!comparison) {
    return {
      title: 'Comparison Not Found',
    }
  }

  return {
    title: `${comparison.internationalTool.name} vs ${comparison.indianAlternatives[0].name} - Indian Alternative Comparison`,
    description: `Compare ${comparison.internationalTool.name} with ${comparison.indianAlternatives[0].name} and other Indian alternatives. Discover why Swadeshi software offers better value, privacy, and local support.`,
    keywords: [
      `${comparison.internationalTool.name} vs ${comparison.indianAlternatives[0].name}`,
      `${comparison.internationalTool.name} alternative`,
      `Indian ${comparison.internationalTool.name} replacement`,
      "Swadeshi software comparison",
      "Indian software alternative",
      `${comparison.internationalTool.name} competitor`,
      "Atmanirbhar Bharat"
    ],
    openGraph: {
      title: `${comparison.internationalTool.name} vs ${comparison.indianAlternatives[0].name} - Indian Alternative`,
      description: `Compare ${comparison.internationalTool.name} with ${comparison.indianAlternatives[0].name} and discover why Indian alternatives offer better value.`,
      url: `/compare/${slug}`,
      type: "website",
      images: [
        {
          url: `/og-compare-${slug}.png`,
          width: 1200,
          height: 630,
          alt: `${comparison.internationalTool.name} vs Indian Alternatives Comparison`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${comparison.internationalTool.name} vs ${comparison.indianAlternatives[0].name} - Indian Alternative`,
      description: `Compare ${comparison.internationalTool.name} with ${comparison.indianAlternatives[0].name} and discover why Indian alternatives offer better value.`,
      images: [`/og-compare-${slug}.png`]
    },
    alternates: {
      canonical: `/compare/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { slug } = await params
  const comparison = getComparison(slug)

  if (!comparison) {
    notFound()
  }

  const primaryAlternative = comparison.indianAlternatives[0]

  const breadcrumbs = generateBreadcrumbs('comparison', {
    comparisonName: `${comparison.internationalTool.name} vs ${primaryAlternative.name}`
  })

  return (
    <AppShell>
      <div className="relative min-h-screen">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
          <HeroSection
            title={`${comparison.internationalTool.name} vs ${primaryAlternative.name}`}
            highlightWord={primaryAlternative.name}
            subtitle={`Compare ${comparison.internationalTool.name} with ${primaryAlternative.name} and other Indian alternatives`}
            description="Discover why Swadeshi software offers better value, privacy, and local support while supporting the Indian economy."
            chakraSize="large"
            className="mb-16"
          />

          {/* Quick Comparison Table */}
          <Card className="mb-16 border border-green-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-center text-gray-900">Quick Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                      <th className="text-center p-4 font-semibold text-gray-900">
                        {comparison.internationalTool.name}
                      </th>
                      <th className="text-center p-4 font-semibold text-blue-600">
                        {primaryAlternative.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.comparison?.features.map((feature, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="p-4 font-medium text-gray-700">{feature.name}</td>
                        <td className="p-4 text-center">
                          {feature.international ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {feature.indian ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Benefits of Indian Alternatives */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Why Choose <span className="text-orange-600">Indian Alternatives</span>?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={Shield}
                title="Data Privacy"
                description="Keep your data in India with better privacy protection and regulatory compliance."
                variant="simple"
              />
              <FeatureCard
                icon={TrendingUp}
                title="Cost Effective"
                description="Get more features at lower cost with pricing designed for Indian markets."
                variant="simple"
              />
              <FeatureCard
                icon={Users}
                title="Local Support"
                description="Access support in Indian languages and time zones for better service."
                variant="simple"
              />
              <FeatureCard
                icon={Flag}
                title="Support Economy"
                description="Support Indian economy and job creation by choosing Swadeshi software."
                variant="simple"
              />
            </div>
          </div>

          {/* Indian Alternatives Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Indian Alternatives to <span className="text-blue-600">{comparison.internationalTool.name}</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {comparison.indianAlternatives.map((alternative, index) => (
                <Card key={index} className="border border-green-200 hover:border-green-400 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 flex items-center gap-3">
                      <SafeImage
                        src={alternative.faviconUrl || `https://www.google.com/s2/favicons?sz=32&domain=${new URL(alternative.website).hostname}`}
                        alt={`${alternative.name} favicon`}
                        className="h-8 w-8"
                      />
                      {alternative.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{alternative.company} • {alternative.location}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{alternative.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {alternative.pricing}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Key Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {alternative.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild className="w-full mt-4">
                      <Link href={alternative.website} target="_blank" rel="noopener noreferrer">
                        Visit {alternative.name}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="text-center bg-gradient-to-r from-blue-50 to-green-50 border-2 border-green-300">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Switch to <span className="text-orange-600">Swadeshi</span>?
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Join thousands of businesses supporting the Atmanirbhar Bharat movement by choosing Indian software alternatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/">
                    <Flag className="mr-2 h-5 w-5" />
                    Explore More Alternatives
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/about">
                    <Users className="mr-2 h-5 w-5" />
                    Contribute to Directory
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}