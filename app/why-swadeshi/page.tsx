import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, ExternalLink, Shield, TrendingUp, Users, Building, Star, Heart, Target, Globe, Zap, Crown } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import { AppShell } from "@/components/layout/AppShell"
import Link from "next/link"

export default function WhySwadeshiPage() {
  return (
    <AppShell>
      <div className="relative min-h-screen">

      <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">

        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-8">
              <AshokaChakra className="h-20 w-20 text-blue-600" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Why Choose <span className="text-orange-600">Swadeshi</span>?
          </h1>
          <p className="text-2xl text-gray-800 mb-6 font-medium max-w-4xl mx-auto">
            The power of choosing Indian software for a stronger, self-reliant digital future
          </p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover why supporting <em>Swadeshi</em> software isn't just good for India—it's good for innovation,
            competition, and building a truly diverse global technology ecosystem.
          </p>
        </div>

        {/* Core Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Card className="group border-2 border-green-200 hover:border-green-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-gray-700">
                Economic Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-800 leading-relaxed">
                Every rupee spent on Indian software stays in India, creating jobs, fostering innovation,
                and building a stronger digital economy that benefits all Indians.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-2 border-green-200 hover:border-green-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-gray-700">
                Data Sovereignty
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-800 leading-relaxed">
                Indian software often means Indian data centers, better privacy protection,
                and reduced dependency on foreign entities for critical digital infrastructure.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-2 border-green-200 hover:border-green-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-gray-700">
                Local Understanding
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-800 leading-relaxed">
                Indian developers understand Indian needs—from language support to local business practices,
                cultural nuances, and regulatory requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-2 border-green-200 hover:border-green-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-gray-700">
                Innovation Hub
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-800 leading-relaxed">
                Supporting Indian software encourages local innovation, R&D investment,
                and the development of cutting-edge solutions tailored for global markets.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-2 border-green-200 hover:border-green-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-gray-700">
                Cost Effectiveness
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-800 leading-relaxed">
                Indian software often provides exceptional value, competitive pricing,
                and cost structures designed for diverse market segments and budgets.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-2 border-green-200 hover:border-green-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-gray-700">
                Global Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-800 leading-relaxed">
                Many Indian software solutions are built for global scale, offering world-class features
                while maintaining the flexibility to serve diverse international markets.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Atmanirbhar Bharat Section */}
        <div className="bg-orange-50 rounded-3xl p-12 mb-20 border border-orange-300 relative">
          <div className="text-center mb-8">
            <AshokaChakra className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Supporting <span className="text-orange-600">Atmanirbhar Bharat</span>
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              The vision of a self-reliant India starts with technology independence
            </p>
          </div>

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
        </div>

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