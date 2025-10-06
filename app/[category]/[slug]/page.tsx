import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ArrowLeft, Calendar, MapPin, Building2, Tag, Globe, Users } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { getAppBySlug, getAllAppPaths, getRelatedApps } from "@/lib/server-data"
import { getCategoryDisplayName, getAppUrl, getAlternativeUrl, getCategoryUrl } from "@/lib/data"
import { Favicon } from "@/components/favicon"
import { Breadcrumbs, generateBreadcrumbs } from "@/components/ui/Breadcrumbs"

interface AppPageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const paths = getAllAppPaths()
  return paths.map(({ category, slug }) => ({
    category,
    slug
  }))
}

export async function generateMetadata({ params }: AppPageProps) {
  const { category, slug } = await params
  const app = getAppBySlug(category, slug)

  if (!app) {
    return {
      title: 'App Not Found',
    }
  }

  const ogTitle = app.opengraph?.title || `${app.name} - Indian ${app.category} App`
  const ogDescription = app.opengraph?.description || app.description

  return {
    title: `${app.name} by ${app.company} - Indian ${app.category} App | Swadeshi Apps`,
    description: ogDescription,
    keywords: `${app.name}, ${app.company}, Indian apps, ${app.alternatives.join(', ')} alternative, ${app.category}`,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: app.opengraph?.image ? [app.opengraph.image] : [],
      type: 'website',
      siteName: 'Swadeshi Apps',
    },
    twitter: {
      card: app.opengraph?.twitter_card === 'summary_large_image' ? 'summary_large_image' : 'summary',
      title: app.opengraph?.twitter_title || ogTitle,
      description: app.opengraph?.twitter_description || ogDescription,
      images: app.opengraph?.twitter_image ? [app.opengraph.twitter_image] : (app.opengraph?.image ? [app.opengraph.image] : []),
    },
    alternates: {
      canonical: `/${category}/${slug}`,
    },
  }
}

export default async function AppPage({ params }: AppPageProps) {
  const { category, slug } = await params
  const app = getAppBySlug(category, slug)

  if (!app) {
    notFound()
  }

  // Redirect if accessing via alias instead of canonical slug
  if (app.slug && app.slug !== slug) {
    redirect(`/${category}/${app.slug}`)
  }

  const categoryDisplayName = getCategoryDisplayName(category)
  const { sameCompany, sameCategory } = getRelatedApps(app, 6)
  const relatedApps = [...sameCompany, ...sameCategory]

  // Format last updated date
  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return '1 day ago'
    if (diffDays < 30) return `${diffDays} days ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  const breadcrumbs = generateBreadcrumbs('software', {
    category,
    categoryName: categoryDisplayName,
    softwareName: app.name
  })

  // JSON-LD Structured Data for SoftwareApplication
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": app.name,
    "applicationCategory": app.category,
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": app.pricing === "Free" ? "0" : undefined,
      "priceCurrency": "INR"
    },
    "provider": {
      "@type": "Organization",
      "name": app.company,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": app.location,
        "addressCountry": "IN"
      }
    },
    "description": app.opengraph?.description || app.description,
    "url": app.website,
    "image": app.opengraph?.image || app.faviconUrl,
    "sameAs": app.opengraph?.twitter_site ? `https://twitter.com/${app.opengraph.twitter_site.replace('@', '')}` : undefined
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="relative min-h-screen">

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <Favicon
                websiteUrl={app.website}
                name={app.name}
                size={256}
                className="h-24 w-24 object-contain"
                fallbackClassName="h-20 w-20 text-blue-600"
                customFaviconUrl={app.faviconUrl}
                fixedHeight={true}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.name}</h1>
              <p className="text-lg text-gray-600 mb-4">by {app.company}</p>
              {app.opengraph?.title && app.opengraph.title !== app.name && (
                <p className="text-xl text-gray-800 mb-4 font-medium leading-relaxed">
                  {app.opengraph.title}
                </p>
              )}
              <div className="flex items-center space-x-4 mb-6">
                <Badge variant={app.pricing === 'Free' ? 'default' : app.pricing === 'Freemium' ? 'secondary' : 'outline'} className="text-sm">
                  {app.pricing}
                </Badge>
                <span className="text-sm text-gray-500 flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {app.category}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {app.location}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                  <Link href={app.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                {(app.playStoreUrl || app.opengraph?.play_store_url) && (
                  <Button asChild size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50">
                    <Link href={app.playStoreUrl || app.opengraph?.play_store_url || ''} target="_blank" rel="noopener noreferrer">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                      Google Play
                    </Link>
                  </Button>
                )}
                {(app.appStoreUrl || app.opengraph?.app_store_url) && (
                  <Button asChild size="lg" variant="outline" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-50">
                    <Link href={app.appStoreUrl || app.opengraph?.app_store_url || ''} target="_blank" rel="noopener noreferrer">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                      </svg>
                      App Store
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About This App */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-600" />
                About This App
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                {app.opengraph?.description || app.description}
              </p>
              {app.opengraph?.last_updated && (
                <p className="text-sm text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Information updated {formatLastUpdated(app.opengraph.last_updated)}
                </p>
              )}
            </CardContent>
          </Card>

          {/* App Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                App Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-600">Company</dt>
                <dd className="text-sm text-gray-900">{app.company}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Location</dt>
                <dd className="text-sm text-gray-900">{app.location}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Category</dt>
                <dd className="text-sm text-gray-900">
                  <Link href={getCategoryUrl(category)} className="text-blue-600 hover:underline">
                    {app.category}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Pricing</dt>
                <dd className="text-sm text-gray-900">{app.pricing}</dd>
              </div>
              {app.opengraph?.twitter_site && (
                <div>
                  <dt className="text-sm font-medium text-gray-600">Twitter</dt>
                  <dd className="text-sm text-gray-900">
                    <Link
                      href={`https://twitter.com/${app.opengraph.twitter_site.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {app.opengraph.twitter_site}
                    </Link>
                  </dd>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Replaces Section */}
        {app.alternatives.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Indian Alternative To
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                {app.name} is a powerful Indian alternative to these international apps:
              </p>
              <div className="space-y-3">
                {app.alternatives.map((alt, index) => (
                  <div key={index} className="border-l-4 border-blue-300 pl-4 py-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Is {app.name} an alternative to {alt}?
                    </h3>
                    <p className="text-gray-700">
                      Yes, {app.name} by {app.company} is an Indian alternative to {alt}.
                      It offers similar functionality while being developed and maintained in India.
                      <Link href={getAlternativeUrl(alt)} className="text-blue-600 hover:underline ml-1">
                        Explore other Indian alternatives to {alt} →
                      </Link>
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* OpenGraph Image Section */}
        {app.opengraph?.image && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <img
                src={app.opengraph.image}
                alt={`${app.name} preview`}
                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                loading="lazy"
              />
            </CardContent>
          </Card>
        )}

        {/* Related Apps */}
        {relatedApps.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Related Indian Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedApps.map((relatedApp, index) => (
                  <div key={index} className="group p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <Favicon
                        websiteUrl={relatedApp.website}
                        name={relatedApp.name}
                        size={32}
                        className="h-8 w-8 object-contain"
                        fallbackClassName="h-6 w-6 text-blue-600"
                        customFaviconUrl={relatedApp.faviconUrl}
                        fixedHeight={true}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 truncate">{relatedApp.name}</h3>
                        <p className="text-sm text-gray-600">{relatedApp.company}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{relatedApp.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {relatedApp.pricing}
                      </Badge>
                      <Link
                        href={getAppUrl(relatedApp.category, relatedApp.name)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button asChild variant="outline">
                  <Link href={getCategoryUrl(category)}>
                    Browse All {categoryDisplayName} Apps
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </>
  )
}