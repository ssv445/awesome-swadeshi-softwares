import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, ExternalLink, Shield, TrendingUp, Users, Building, Star, Heart, Target, Globe, Zap, Crown } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import { AppShell } from "@/components/layout/AppShell"
import { HeroSection } from "@/components/ui/HeroSection"
import { FeatureCard } from "@/components/ui/FeatureCard"
import { InfoSection } from "@/components/ui/InfoSection"
import { Breadcrumbs, generateBreadcrumbs } from "@/components/ui/Breadcrumbs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Why Choose Swadeshi Software - Support Atmanirbhar Bharat",
  description: "Discover why supporting Swadeshi software isn't just good for India—it's good for innovation, competition, and building a truly diverse global technology ecosystem. Join the movement for economic growth and data sovereignty.",
  keywords: [
    "Swadeshi software",
    "Atmanirbhar Bharat",
    "Indian software benefits",
    "economic growth",
    "data sovereignty",
    "technology independence",
    "Indian innovation",
    "self-reliant India",
    "homegrown technology",
    "Indian startups success"
  ],
  openGraph: {
    title: "Why Choose Swadeshi Software - Support Atmanirbhar Bharat",
    description: "Discover why supporting Swadeshi software drives innovation, economic growth, and technology independence. Join the movement for a self-reliant India.",
    url: "/why-swadeshi",
    type: "website",
    images: [
      {
        url: "/og-why-swadeshi.png",
        width: 1200,
        height: 630,
        alt: "Why Choose Swadeshi Software - Benefits and Impact"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose Swadeshi Software - Support Atmanirbhar Bharat",
    description: "Discover why supporting Swadeshi software drives innovation, economic growth, and technology independence. Join the movement for a self-reliant India.",
    images: ["/og-why-swadeshi.png"]
  },
  alternates: {
    canonical: "/why-swadeshi",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function WhySwadeshiPage() {
  const breadcrumbs = generateBreadcrumbs('static', {
    staticPageName: 'Why Swadeshi'
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
          title="Why Choose Swadeshi?"
          highlightWord="Swadeshi"
          subtitle="The power of choosing Indian software for a stronger, self-reliant digital future"
          description="Discover why supporting Swadeshi software isn't just good for India—it's good for innovation, competition, and building a truly diverse global technology ecosystem."
          chakraSize="large"
          className="mb-20"
        />

        {/* Core Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={TrendingUp}
            title="Economic Growth"
            description="Every rupee spent on Indian software stays in India, creating jobs, fostering innovation, and building a stronger digital economy that benefits all Indians."
            variant="hover-scale"
          />

          <FeatureCard
            icon={Shield}
            title="Data Sovereignty"
            description="Indian software often means Indian data centers, better privacy protection, and reduced dependency on foreign entities for critical digital infrastructure."
            variant="hover-scale"
          />

          <FeatureCard
            icon={Users}
            title="Local Understanding"
            description="Indian developers understand Indian needs—from language support to local business practices, cultural nuances, and regulatory requirements."
            variant="hover-scale"
          />

          <FeatureCard
            icon={Zap}
            title="Innovation Hub"
            description="Supporting Indian software encourages local innovation, R&D investment, and the development of cutting-edge solutions tailored for global markets."
            variant="hover-scale"
          />

          <FeatureCard
            icon={Target}
            title="Cost Effectiveness"
            description="Indian software often provides exceptional value, competitive pricing, and cost structures designed for diverse market segments and budgets."
            variant="hover-scale"
          />

          <FeatureCard
            icon={Globe}
            title="Global Impact"
            description="Many Indian software solutions are built for global scale, offering world-class features while maintaining the flexibility to serve diverse international markets."
            variant="hover-scale"
          />
        </div>

        <InfoSection
          title="Supporting Atmanirbhar Bharat"
          highlightWord="Atmanirbhar Bharat"
          subtitle="The vision of a self-reliant India starts with technology independence"
          variant="highlighted"
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Building className="h-6 w-6 mr-2" />
                Economic Benefits
              </h3>
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-start space-x-2">
                  <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                  <span>Reduces foreign exchange outflow by billions of dollars</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                  <span>Creates high-value jobs in the technology sector</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                  <span>Builds intellectual property and technological assets</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                  <span>Attracts investment in Indian innovation ecosystem</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Strategic Advantages
              </h3>
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-start space-x-2">
                  <Flag className="h-5 w-5 text-red-600 mt-0.5" />
                  <span>Reduces dependency on foreign technology platforms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Flag className="h-5 w-5 text-red-600 mt-0.5" />
                  <span>Enhances national security through technology sovereignty</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Flag className="h-5 w-5 text-red-600 mt-0.5" />
                  <span>Provides better control over critical digital infrastructure</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Flag className="h-5 w-5 text-red-600 mt-0.5" />
                  <span>Enables customization for Indian regulatory requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </InfoSection>

        {/* Success Stories */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            <span className="text-orange-600">Success</span> Stories
          </h2>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Indian software companies that started local and conquered global markets
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="border-2 border-green-200 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <Flag className="h-5 w-5 mr-2" />
                Zoho Corporation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 text-sm">
                Started in Chennai, now serves 80+ million users globally with a complete business software suite,
                proving Indian software can compete with the best in the world.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <Flag className="h-5 w-5 mr-2" />
                Razorpay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 text-sm">
                Revolutionized digital payments in India and expanded internationally,
                demonstrating how understanding local needs can create globally relevant solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <Flag className="h-5 w-5 mr-2" />
                Freshworks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 text-sm">
                Built in Chennai, listed on NASDAQ, serving 50,000+ businesses worldwide with customer experience software,
                showcasing the global potential of Indian innovation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/80 backdrop-blur-sm border-2 border-green-300 rounded-3xl p-12 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <AshokaChakra className="h-16 w-16 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join the <span className="text-orange-600">Swadeshi</span> Movement
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
            Every choice matters. Every adoption counts. Together, we can build a stronger,
            more innovative, and truly self-reliant digital India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
              <Link href="/">
                <Flag className="mr-2 h-5 w-5" />
                Explore Swadeshi Software
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-green-400 text-gray-700 hover:bg-green-50">
              <Link href="/about">
                <Users className="mr-2 h-5 w-5" />
                Contribute to Directory
              </Link>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </AppShell>
  )
}