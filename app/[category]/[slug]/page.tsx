import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ArrowLeft, Calendar, MapPin, Building2, Tag, Globe, Users } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import { AppShell } from "@/components/layout/AppShell"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAppBySlug, getAllAppPaths, getRelatedApps } from "@/lib/server-data"
import { getCategoryDisplayName, getAppUrl } from "@/lib/data"
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
    title: `${app.name} by ${app.company} - Indian ${app.category} App | Awesome Swadeshi Apps`,
    description: ogDescription,
    keywords: `${app.name}, ${app.company}, Indian apps, ${app.alternatives.join(', ')} alternative, ${app.category}`,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: app.opengraph?.image ? [app.opengraph.image] : [],
      type: 'website',
      siteName: 'Awesome Swadeshi Apps',
    },
    twitter: {
      card: (app.opengraph?.twitter_card as 'summary' | 'summary_large_image' | 'app' | 'player') || 'summary',
      title: app.opengraph?.twitter_title || ogTitle,
      description: app.opengraph?.twitter_description || ogDescription,
      images: app.opengraph?.twitter_image ? [app.opengraph.twitter_image] : (app.opengraph?.image ? [app.opengraph.image] : []),
    }
  }
}

export default async function AppPage({ params }: AppPageProps) {
  const { category, slug } = await params
  const app = getAppBySlug(category, slug)

  if (!app) {
    notFound()
  }

  const categoryDisplayName = getCategoryDisplayName(category)
  const { sameCompany, sameCategory } = getRelatedApps(app)
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

  return (
    <AppShell>
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
                size={96}
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
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                <Link href={app.website} target="_blank" rel="noopener noreferrer">
                  Visit App Website
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
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
                  <Link href={`/${category}`} className="text-blue-600 hover:underline">
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
              <div className="flex flex-wrap gap-2">
                {app.alternatives.map((alt, index) => (
                  <Badge key={index} variant="outline" className="text-sm border-blue-300 text-blue-600 bg-blue-50">
                    {alt}
                  </Badge>
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
                  <Link href={`/${category}`}>
                    Browse All {categoryDisplayName} Apps
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </AppShell>
  )
}