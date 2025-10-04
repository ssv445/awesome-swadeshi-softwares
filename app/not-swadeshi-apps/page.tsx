import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ExternalLink, Building, Users, DollarSign, Flag, ArrowLeft, Info, ArrowRight } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { HeroSection } from "@/components/ui/HeroSection"
import { InfoSection } from "@/components/ui/InfoSection"
import { Breadcrumbs, generateBreadcrumbs } from "@/components/ui/Breadcrumbs"
import { getAlternativeUrl } from "@/lib/data"
import Link from "next/link"
import type { Metadata } from "next"
import acquiredCompaniesData from "@/data/acquired-companies.json"

export const metadata: Metadata = {
  title: "Not Swadeshi Apps - Indian-Origin Companies with Foreign Ownership",
  description: "Learn about Indian-origin tech companies that are no longer Indian-owned, including Flipkart, Paytm, MakeMyTrip, and others. Understand the impact of foreign acquisitions on India's tech ecosystem.",
  keywords: [
    "not swadeshi apps",
    "foreign owned indian companies",
    "Flipkart Walmart",
    "Paytm Chinese investment",
    "Indian startups acquisitions",
    "foreign investment India",
    "tech company acquisitions",
    "Indian unicorns foreign ownership"
  ],
  openGraph: {
    title: "Not Swadeshi Apps - Indian-Origin Companies with Foreign Ownership",
    description: "Learn about Indian-origin tech companies that are no longer Indian-owned. Understand the impact of foreign acquisitions on India's tech ecosystem.",
    url: "/not-swadeshi-apps",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Not Swadeshi Apps - Indian-Origin Companies with Foreign Ownership",
    description: "Learn about Indian-origin tech companies that are no longer Indian-owned. Understand the impact of foreign acquisitions on India's tech ecosystem."
  },
  alternates: {
    canonical: "/not-swadeshi-apps",
  },
  robots: {
    index: true,
    follow: true,
  }
}

interface AcquiredCompany {
  name: string
  description: string
  website: string
  category: string
  founded: string
  founders: string
  originalLocation: string
  acquisitionYear: string
  acquiredBy: string
  acquirerCountry: string
  acquisitionAmount: string
  currentOwnership: string
  whyNotSwadeshi: string
  impact: string
}

export default function NotSwadeshiAppsPage() {
  const breadcrumbs = generateBreadcrumbs('static', {
    staticPageName: 'Not Swadeshi Apps'
  })

  const companies: AcquiredCompany[] = acquiredCompaniesData.companies

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
          title="Not Swadeshi Apps"
          highlightWord="Not Swadeshi"
          subtitle="Indian-origin companies that are no longer Indian-owned"
          description="Understanding how foreign acquisitions and investments have changed the ownership landscape of India's tech ecosystem."
          chakraSize="large"
          className="mb-12"
        />

        {/* Information Banner */}
        <InfoSection
          title="Why This Matters"
          highlightWord="Matters"
          subtitle="Understanding ownership is crucial for making informed choices"
          variant="highlighted"
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 text-gray-800">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Flag className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Economic Impact:</strong> Foreign ownership means profits, strategic decisions, and control move abroad</span>
              </div>
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span><strong>Data Sovereignty:</strong> User data may be subject to foreign jurisdiction and regulations</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Building className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Strategic Control:</strong> Foreign investors often influence major business decisions and direction</span>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span><strong>Know Before You Choose:</strong> Understanding ownership helps support truly Swadeshi alternatives</span>
              </div>
            </div>
          </div>
        </InfoSection>

        {/* Companies Grid */}
        <div className="space-y-8">
          {companies.map((company) => (
            <Card
              key={company.name}
              className={`border-2 ${
                company.name === "BigBasket"
                  ? "border-green-300 bg-green-50/50"
                  : "border-orange-200 bg-orange-50/30"
              } shadow-lg hover:shadow-xl transition-shadow`}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-gray-900 mb-2 flex items-center gap-2">
                      {company.name}
                      {company.name === "BigBasket" && (
                        <Badge className="bg-green-600 text-white">Still Swadeshi!</Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{company.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      <Badge variant="outline" className="bg-white">
                        <Building className="h-3 w-3 mr-1" />
                        {company.category}
                      </Badge>
                      <Badge variant="outline" className="bg-white">
                        Founded {company.founded}
                      </Badge>
                      <Badge variant="outline" className="bg-white">
                        {company.originalLocation}
                      </Badge>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      Visit Site <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-blue-600" />
                        Indian Founders
                      </h4>
                      <p className="text-sm text-gray-700">{company.founders}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Building className="h-4 w-4 mr-2 text-orange-600" />
                        Acquired By
                      </h4>
                      <p className="text-sm text-gray-700">
                        <strong>{company.acquiredBy}</strong> ({company.acquirerCountry})
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Year: {company.acquisitionYear} • Amount: {company.acquisitionAmount}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                        Current Ownership
                      </h4>
                      <p className="text-sm text-gray-700">{company.currentOwnership}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                        Why Not Swadeshi?
                      </h4>
                      <p className="text-sm text-gray-700 bg-white/70 p-3 rounded-lg border border-orange-200">
                        {company.whyNotSwadeshi}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2 text-purple-600" />
                        Impact
                      </h4>
                      <p className="text-sm text-gray-700 bg-white/70 p-3 rounded-lg border border-purple-200">
                        {company.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Swadeshi Alternatives Link */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button asChild variant="outline" size="sm" className="w-full border-green-500 text-green-700 hover:bg-green-50">
                    <Link href={getAlternativeUrl(company.name)}>
                      <Flag className="mr-2 h-4 w-4" />
                      View Swadeshi Alternatives to {company.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white/80 backdrop-blur-sm border-2 border-green-300 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose <span className="text-orange-600">Swadeshi</span> Alternatives
          </h2>
          <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
            Support truly Indian-owned companies that keep innovation, profits, and strategic control within India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
              <Link href="/">
                <Flag className="mr-2 h-5 w-5" />
                Explore Swadeshi Software
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-orange-400 text-gray-700 hover:bg-orange-50">
              <Link href="/why-swadeshi">
                <Info className="mr-2 h-5 w-5" />
                Why Choose Swadeshi?
              </Link>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </AppShell>
  )
}
