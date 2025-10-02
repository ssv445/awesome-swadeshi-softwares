import { AppShell } from "@/components/layout/AppShell"
import { HeroSection } from "@/components/ui/HeroSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Users, Star, Target } from "lucide-react"
import Link from "next/link"
import { getAllComparisons } from "@/lib/comparisons-server"
import { getAllSoftware } from "@/lib/server-data"
import { SafeImage } from "@/components/SafeImage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Software Comparisons - Indian vs International Tools | Awesome Swadeshi Softwares",
  description: "Compare popular international software tools with their Indian alternatives. See detailed feature comparisons, cost savings, and benefits of choosing Swadeshi software solutions.",
  keywords: [
    "software comparison",
    "Indian vs international software",
    "Salesforce vs Zoho",
    "Zoom vs JioMeet",
    "Microsoft Office vs Indian alternatives",
    "software alternatives comparison",
    "Swadeshi software benefits",
    "cost comparison software tools"
  ],
  openGraph: {
    title: "Software Comparisons - Indian vs International Tools",
    description: "Compare popular international software tools with their Indian alternatives. Discover cost savings and benefits of Swadeshi software.",
    url: "/compare",
    type: "website",
    images: [
      {
        url: "/og-compare.png",
        width: 1200,
        height: 630,
        alt: "Software Comparisons - Indian vs International Tools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Comparisons - Indian vs International Tools",
    description: "Compare popular international software tools with their Indian alternatives. Discover cost savings and benefits of Swadeshi software.",
    images: ["/og-compare.png"]
  },
  alternates: {
    canonical: "/compare",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function ComparePage() {
  const comparisons = getAllComparisons()
  const totalApps = getAllSoftware().length

  return (
    <AppShell>
      <div className="relative min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
          <HeroSection
            title="Software Comparisons"
            subtitle="Compare Popular International Tools with Indian Alternatives"
            description="Discover how Indian software solutions stack up against global giants. See detailed comparisons, cost savings, and benefits of choosing Swadeshi alternatives."
            chakraSize="large"
            className="mb-16"
          />

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center border border-green-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">60%</div>
                <div className="text-sm text-gray-600">Average Cost Savings</div>
              </CardContent>
            </Card>
            <Card className="text-center border border-green-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">100M+</div>
                <div className="text-sm text-gray-600">Users Trust Indian Software</div>
              </CardContent>
            </Card>
            <Card className="text-center border border-green-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <Star className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">4.5+</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </CardContent>
            </Card>
            <Card className="text-center border border-green-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{totalApps}+</div>
                <div className="text-sm text-gray-600">Indian Alternatives</div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Comparisons */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Featured <span className="text-orange-600">Comparisons</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {comparisons.map((comparison) => (
                <Card key={comparison.slug} className="border border-green-200 hover:border-green-400 bg-white shadow-sm hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <SafeImage
                        src={comparison.internationalTool.logo}
                        alt={`${comparison.internationalTool.name} logo`}
                        className="h-8 w-8"
                      />
                      <div className="text-gray-400 font-bold">VS</div>
                      <SafeImage
                        src={comparison.indianAlternatives[0].faviconUrl || `https://www.google.com/s2/favicons?sz=32&domain=${new URL(comparison.indianAlternatives[0].website).hostname}`}
                        alt={`${comparison.indianAlternatives[0].name} logo`}
                        className="h-8 w-8"
                      />
                    </div>
                    <CardTitle className="text-xl text-gray-900 text-center">
                      {comparison.internationalTool.name} vs {comparison.indianAlternatives[0].name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-center">{comparison.internationalTool.description}</p>
                    <div className="flex justify-center">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {comparison.internationalTool.category}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-center">Why Choose Indian Alternative?</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {comparison.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="text-center">
                            • {benefit.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild className="w-full group-hover:bg-blue-700 transition-colors">
                      <Link href={`/compare/${comparison.slug}`}>
                        View Detailed Comparison
                        <ArrowRight className="ml-2 h-4 w-4" />
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
                Can't Find a Comparison?
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Help us add more comparisons to support the Swadeshi movement and help others discover Indian alternatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/about">
                    <Users className="mr-2 h-5 w-5" />
                    Suggest a Comparison
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/">
                    Browse All Alternatives
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