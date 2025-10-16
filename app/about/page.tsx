import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Users, Globe, Heart, Zap, Shield } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import { HeroSection } from "@/components/ui/HeroSection"
import { Breadcrumbs, generateBreadcrumbs } from "@/components/ui/Breadcrumbs"
import { getTotalAppsCount, getCategories } from "@/lib/server-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - Supporting Indian Software Innovation",
  description: "Learn about Swadeshi Apps, a platform dedicated to promoting Indian Alternatives Apps and supporting the Atmanirbhar Bharat movement through technology.",
  keywords: [
    "about Swadeshi Apps",
    "Indian software directory",
    "Atmanirbhar Bharat",
    "Made in India",
    "Indian tech ecosystem",
    "Swadeshi movement",
    "Indian startups"
  ],
  openGraph: {
    title: "About - Swadeshi Apps",
    description: "Learn about our mission to promote Indian Alternatives Apps and support the Atmanirbhar Bharat movement.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "About Swadeshi Apps"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Swadeshi Apps",
    description: "Learn about our mission to promote Indian Alternatives Apps and support the Atmanirbhar Bharat movement.",
    images: ["/og-about.png"]
  },
  alternates: {
    canonical: "/about",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function AboutPage() {
  const breadcrumbs = generateBreadcrumbs('static', {
    staticPageName: 'About'
  })
  const totalApps = getTotalAppsCount()
  const totalCategories = getCategories().length

  return (
    <>
      <div className="relative min-h-screen">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
          <HeroSection
            title="About Swadeshi Apps"
            highlightWord="Swadeshi"
            highlightColor="text-orange-600"
            description="Discover, support, and celebrate Indian software innovation. Join us in building a self-reliant digital India."
            chakraSize="large"
          />

          {/* Mission Section */}
          <Card className="mb-12 border border-orange-200 bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-10 w-10 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Swadeshi Apps is dedicated to promoting and showcasing Indian Alternatives Apps to international tools.
                We believe in the power of Indian innovation and the potential of our tech ecosystem to create world-class products.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our platform helps users discover quality Indian software across various categories - from business tools
                to entertainment apps, supporting the <span className="font-semibold text-orange-600">Atmanirbhar Bharat</span> initiative
                and the broader <span className="font-semibold text-green-600">Swadeshi movement</span>.
              </p>
            </CardContent>
          </Card>

          {/* Why It Matters */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why It Matters</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border border-green-200 hover:border-green-400 transition-all">
                <CardHeader>
                  <Globe className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle className="text-lg">Economic Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Supporting Indian software companies helps create jobs, boost the economy, and keeps revenue within the country.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-orange-200 hover:border-orange-400 transition-all">
                <CardHeader>
                  <Shield className="h-8 w-8 text-orange-600 mb-2" />
                  <CardTitle className="text-lg">Data Sovereignty</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Indian companies are more likely to comply with local data protection laws and keep your data secure within India.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-blue-200 hover:border-blue-400 transition-all">
                <CardHeader>
                  <Zap className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Indian developers create solutions tailored to local needs, languages, and cultural contexts that global tools may miss.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What We Offer */}
          <Card className="mb-12 border border-blue-200 bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span><span className="font-semibold">Comprehensive Directory:</span> Browse {totalApps}+ Indian software products across {totalCategories}+ categories</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span><span className="font-semibold">Alternative Finder:</span> Discover Indian alternatives to popular international tools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span><span className="font-semibold">Community-Driven:</span> Open platform where anyone can contribute and suggest new apps</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span><span className="font-semibold">Free & Open Source:</span> Built with transparency and community collaboration in mind</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span><span className="font-semibold">Curated Content:</span> Every product is verified to be genuinely Indian-developed</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Join the Movement */}
          <Card className="mb-12 border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-green-50">
            <CardHeader>
              <div className="flex items-center justify-center space-x-3 mb-4">
                <AshokaChakra className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                Join the Movement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-center mb-4">
                Every choice matters. By choosing Indian software, you're not just using an app -
                you're investing in India's future, supporting local talent, and contributing to a self-reliant digital ecosystem.
              </p>
              <div className="flex justify-center items-center space-x-2 text-gray-600">
                <Users className="h-5 w-5" />
                <span className="font-medium">Made with ❤️ in India, for India</span>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Form */}
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 text-center">Contact Us with Feedback</CardTitle>
              <p className="text-gray-600 text-center text-sm mt-2">
                We'd love to hear from you! Share your thoughts, suggestions, or report any issues.
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg overflow-hidden">
                <iframe
                  aria-label="Contact with feedback"
                  frameBorder="0"
                  style={{ height: '750px', width: '100%', border: 'none' }}
                  src="https://forms.zohopublic.in/zeptomail130082022600088602161/form/Contactwithfeedback/formperma/tU1S-REJhIPZwGu_vSMbEFB40MAJg11lMgjfqQZ1ZeQ"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
