import { notFound } from "next/navigation"
import { HeroSection } from "@/components/ui/HeroSection"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs, generateBreadcrumbs } from "@/components/ui/Breadcrumbs"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, XCircle, Flag, Building, Users, DollarSign, TrendingDown, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import acquiredCompaniesData from "@/data/acquired-companies.json"
import { getAlternativeUrl } from "@/lib/data"

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
  stockMarket?: string
}

interface PageProps {
  params: Promise<{ slug: string }>
}

function getCompanyBySlug(slug: string): AcquiredCompany | undefined {
  return acquiredCompaniesData.companies.find(
    (company) => company.name.toLowerCase().replace(/\s+/g, '-') === slug
  )
}

export async function generateStaticParams() {
  return acquiredCompaniesData.companies.map((company) => ({
    slug: company.name.toLowerCase().replace(/\s+/g, '-')
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const company = getCompanyBySlug(slug)

  if (!company) {
    return {
      title: "Company Not Found"
    }
  }

  const title = `Is ${company.name} a Swadeshi Company? Indian Owned? | Ownership Analysis`
  const description = `Find out if ${company.name} is an Indian-owned company. Learn about ${company.name}'s ownership structure, acquisition by ${company.acquiredBy}, and why it's not considered Swadeshi.`

  return {
    title,
    description,
    keywords: [
      `is ${company.name} indian owned`,
      `is ${company.name} swadeshi`,
      `${company.name} ownership`,
      `${company.name} indian company`,
      `${company.name} foreign ownership`,
      `who owns ${company.name}`,
      `${company.name} ${company.acquiredBy}`,
      `${company.name} acquisition`
    ],
    openGraph: {
      title,
      description,
      url: `/not-swadeshi-apps/${slug}`,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    },
    alternates: {
      canonical: `/not-swadeshi-apps/${slug}`
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

export default async function CompanyCheckPage({ params }: PageProps) {
  const { slug } = await params
  const company = getCompanyBySlug(slug)

  if (!company) {
    notFound()
  }

  const isSwadeshi = company.name === "BigBasket"
  const isIndianOwned = company.acquirerCountry.toLowerCase().includes('india')
  const isPubliclyTraded = company.stockMarket !== undefined

  const breadcrumbs = [
    { label: 'Not Swadeshi Apps', href: '/not-swadeshi-apps' },
    { label: `Is ${company.name} Swadeshi?`, current: true }
  ]

  // Generate FAQs
  const faqs = [
    {
      question: `Is ${company.name} owned by Indians?`,
      answer: isIndianOwned
        ? `Yes, ${company.name} is owned by Indian entity ${company.acquiredBy}.`
        : `No, ${company.name} is not owned by Indians. It is currently owned by ${company.acquiredBy} from ${company.acquirerCountry}. ${company.currentOwnership}.`,
      isPositive: isIndianOwned
    },
    {
      question: `Is ${company.name} an Indian company?`,
      answer: `${company.name} was founded in India in ${company.founded} by ${company.founders}. However, ${isSwadeshi ? 'it is now owned by the Tata Group, maintaining its Indian ownership.' : `it was acquired by ${company.acquiredBy} in ${company.acquisitionYear}, making it a foreign-controlled company despite its Indian origins.`}`,
      isPositive: isSwadeshi
    },
    {
      question: `Is ${company.name} a Swadeshi company?`,
      answer: isSwadeshi
        ? `Yes! ${company.name} is considered Swadeshi as it was acquired by the Tata Group, an Indian conglomerate, maintaining Indian ownership and control.`
        : `No, ${company.name} is not a Swadeshi company. ${company.whyNotSwadeshi}`,
      isPositive: isSwadeshi
    },
    {
      question: `Who owns ${company.name}?`,
      answer: `${company.name} is owned by ${company.acquiredBy} from ${company.acquirerCountry}. ${company.currentOwnership}. The acquisition took place in ${company.acquisitionYear} for ${company.acquisitionAmount}.`,
      isPositive: false
    },
    {
      question: `Is ${company.name} listed on the Indian stock market?`,
      answer: company.stockMarket
        ? `Yes, ${company.name} is listed on ${company.stockMarket}.`
        : `${company.name} is ${company.name === 'Zomato' || company.name === 'PolicyBazaar' ? 'listed on Indian stock exchanges (NSE/BSE) but has significant foreign ownership.' : 'not publicly listed on Indian stock exchanges as a standalone entity.'}`,
      isPositive: isPubliclyTraded
    },
    {
      question: `When was ${company.name} acquired?`,
      answer: `${company.name} was acquired in ${company.acquisitionYear} by ${company.acquiredBy} for ${company.acquisitionAmount}.`,
      isPositive: false
    },
    {
      question: `What is the impact of ${company.name}'s foreign ownership?`,
      answer: company.impact,
      isPositive: false
    }
  ]

  return (
    <>
      <div className="relative min-h-screen">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              {isSwadeshi ? (
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              ) : (
                <XCircle className="h-16 w-16 text-red-600" />
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
              Is <span className="text-orange-600">{company.name}</span> a Swadeshi Company?
            </h1>
            <div className="text-center">
              <Badge className={`${isSwadeshi ? 'bg-green-600' : 'bg-red-600'} text-white text-lg px-6 py-2`}>
                {isSwadeshi ? 'YES - Swadeshi Company' : 'NO - Foreign Owned'}
              </Badge>
            </div>
            <p className="text-xl text-gray-700 text-center mt-6 max-w-2xl mx-auto">
              {company.description}
            </p>
          </div>

          {/* Quick Facts */}
          <Card className="mb-12 border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Quick Facts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">Founded:</span>
                  <span className="text-gray-700 ml-2">{company.founded}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Founders:</span>
                  <span className="text-gray-700 ml-2">{company.founders}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Original Location:</span>
                  <span className="text-gray-700 ml-2">{company.originalLocation}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Category:</span>
                  <span className="text-gray-700 ml-2">{company.category}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Acquired By:</span>
                  <span className="text-gray-700 ml-2">{company.acquiredBy} ({company.acquirerCountry})</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Acquisition Year:</span>
                  <span className="text-gray-700 ml-2">{company.acquisitionYear}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Acquisition Amount:</span>
                  <span className="text-gray-700 ml-2">{company.acquisitionAmount}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Current Ownership:</span>
                  <span className="text-gray-700 ml-2">{company.currentOwnership}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-2 border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-gray-900 flex items-start gap-2">
                      {faq.isPositive ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      )}
                      <span>{faq.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-orange-50 to-green-50 border-2 border-green-300 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Looking for Swadeshi Alternatives?
            </h3>
            <p className="text-gray-700 mb-6">
              Discover Indian-owned companies that keep innovation, profits, and strategic control within India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link href={getAlternativeUrl(company.name)}>
                  <Flag className="mr-2 h-5 w-5" />
                  View Swadeshi Alternatives
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-orange-400">
                <Link href="/not-swadeshi-apps">
                  <Building className="mr-2 h-5 w-5" />
                  See All Foreign-Owned Companies
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
