import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, ExternalLink, Shield, TrendingUp, Users, Building, Star, Flower2, Heart, Target, Globe, Zap } from "lucide-react"
import Link from "next/link"

export default function WhySwadeshiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Decorative Pattern Overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20-15a15 15 0 100 30 15 15 0 000-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header */}
      <header className="border-b-2 border-amber-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Flag className="h-10 w-10 text-amber-600" />
                <Flower2 className="h-4 w-4 text-red-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 bg-clip-text text-transparent">
                  Awesome Swadeshi
                </h1>
                <p className="text-sm text-amber-700 font-medium">Indian Software Directory • Atmanirbhar Bharat</p>
              </div>
            </Link>
            <div className="flex space-x-4">
              <Button asChild variant="outline" className="border-2 border-amber-400 text-amber-700 hover:bg-amber-100">
                <Link href="/about">Contribute</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white border-none shadow-lg">
                <Link href="/">Back to Directory</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 text-amber-300 opacity-20">
          <Star className="h-16 w-16" />
        </div>
        <div className="absolute bottom-20 left-10 text-red-300 opacity-20">
          <Flower2 className="h-20 w-20" />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Flag className="h-24 w-24 text-amber-600 drop-shadow-lg" />
              <div className="absolute -top-3 -left-3 w-30 h-30 border-3 border-amber-300 rounded-full opacity-50"></div>
              <div className="absolute -bottom-2 -right-2">
                <Heart className="h-10 w-10 text-red-500" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Why Choose <span className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 bg-clip-text text-transparent">Swadeshi</span>?
          </h1>
          <p className="text-2xl text-amber-800 mb-6 font-medium max-w-4xl mx-auto">
            The power of choosing Indian software for a stronger, self-reliant digital future
          </p>
          <p className="text-lg text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Discover why supporting <em>Swadeshi</em> software isn't just good for India—it's good for innovation,
            competition, and building a truly diverse global technology ecosystem.
          </p>
        </div>

        {/* Core Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Card className="group border-2 border-amber-200 hover:border-amber-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-amber-600" />
                <Star className="h-6 w-6 text-red-500 ml-2" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
                Economic Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-amber-800 leading-relaxed">
                Every rupee spent on Indian software stays in India, creating jobs, fostering innovation,
                and building a stronger digital economy that benefits all Indians.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-2 border-amber-200 hover:border-amber-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-12 w-12 text-amber-600" />
                <Flower2 className="h-6 w-6 text-red-500 ml-2" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
                Data Sovereignty
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-amber-800 leading-relaxed">
                Indian software often means Indian data centers, better privacy protection,
                and reduced dependency on foreign entities for critical digital infrastructure.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-2 border-amber-200 hover:border-amber-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-amber-600" />
                <Star className="h-6 w-6 text-red-500 ml-2" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
                Local Understanding
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-amber-800 leading-relaxed">
                Indian developers understand Indian needs—from language support to local business practices,
                cultural nuances, and regulatory requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-2 border-amber-200 hover:border-amber-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-12 w-12 text-amber-600" />
                <Flower2 className="h-6 w-6 text-red-500 ml-2" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
                Innovation Hub
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-amber-800 leading-relaxed">
                Supporting Indian software encourages local innovation, R&D investment,
                and the development of cutting-edge solutions tailored for global markets.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-2 border-amber-200 hover:border-amber-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Target className="h-12 w-12 text-amber-600" />
                <Star className="h-6 w-6 text-red-500 ml-2" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
                Cost Effectiveness
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-amber-800 leading-relaxed">
                Indian software often provides exceptional value, competitive pricing,
                and cost structures designed for diverse market segments and budgets.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-2 border-amber-200 hover:border-amber-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Globe className="h-12 w-12 text-amber-600" />
                <Flower2 className="h-6 w-6 text-red-500 ml-2" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
                Global Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-amber-800 leading-relaxed">
                Many Indian software solutions are built for global scale, offering world-class features
                while maintaining the flexibility to serve diverse international markets.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Atmanirbhar Bharat Section */}
        <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 rounded-3xl p-12 mb-20 border-2 border-amber-300 shadow-2xl relative">
          <div className="absolute top-6 right-6 text-amber-300 opacity-30">
            <Star className="h-16 w-16" />
          </div>
          <div className="text-center mb-8">
            <Flag className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Supporting <span className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 bg-clip-text text-transparent">Atmanirbhar Bharat</span>
            </h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto">
              The vision of a self-reliant India starts with technology independence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-amber-900 flex items-center">
                <Building className="h-6 w-6 mr-2" />
                Economic Benefits
              </h3>
              <ul className="space-y-3 text-amber-800">
                <li className="flex items-start space-x-2">
                  <Star className="h-5 w-5 text-amber-600 mt-0.5" />
                  <span>Reduces foreign exchange outflow by billions of dollars</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Star className="h-5 w-5 text-amber-600 mt-0.5" />
                  <span>Creates high-value jobs in the technology sector</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Star className="h-5 w-5 text-amber-600 mt-0.5" />
                  <span>Builds intellectual property and technological assets</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Star className="h-5 w-5 text-amber-600 mt-0.5" />
                  <span>Attracts investment in Indian innovation ecosystem</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-amber-900 flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Strategic Advantages
              </h3>
              <ul className="space-y-3 text-amber-800">
                <li className="flex items-start space-x-2">
                  <Flower2 className="h-5 w-5 text-red-600 mt-0.5" />
                  <span>Reduces dependency on foreign technology platforms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Flower2 className="h-5 w-5 text-red-600 mt-0.5" />
                  <span>Enhances national security through technology sovereignty</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Flower2 className="h-5 w-5 text-red-600 mt-0.5" />
                  <span>Provides better control over critical digital infrastructure</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Flower2 className="h-5 w-5 text-red-600 mt-0.5" />
                  <span>Enables customization for Indian regulatory requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 bg-clip-text text-transparent">Success</span> Stories
          </h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            Indian software companies that started local and conquered global markets
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="border-2 border-amber-200 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-amber-900 flex items-center">
                <Flag className="h-5 w-5 mr-2" />
                Zoho Corporation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-800 text-sm">
                Started in Chennai, now serves 80+ million users globally with a complete business software suite,
                proving Indian software can compete with the best in the world.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-200 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-amber-900 flex items-center">
                <Flag className="h-5 w-5 mr-2" />
                Razorpay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-800 text-sm">
                Revolutionized digital payments in India and expanded internationally,
                demonstrating how understanding local needs can create globally relevant solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-200 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-amber-900 flex items-center">
                <Flag className="h-5 w-5 mr-2" />
                Freshworks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-800 text-sm">
                Built in Chennai, listed on NASDAQ, serving 50,000+ businesses worldwide with customer experience software,
                showcasing the global potential of Indian innovation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/80 backdrop-blur-sm border-2 border-amber-300 rounded-3xl p-12 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-red-500 mr-3" />
            <Flag className="h-16 w-16 text-amber-600" />
            <Star className="h-10 w-10 text-amber-500 ml-3" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join the <span className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 bg-clip-text text-transparent">Swadeshi</span> Movement
          </h2>
          <p className="text-xl text-amber-800 mb-8 max-w-3xl mx-auto">
            Every choice matters. Every adoption counts. Together, we can build a stronger,
            more innovative, and truly self-reliant digital India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white border-none shadow-lg">
              <Link href="/">
                <Flag className="mr-2 h-5 w-5" />
                Explore Swadeshi Software
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-amber-400 text-amber-700 hover:bg-amber-100">
              <Link href="/about">
                <Users className="mr-2 h-5 w-5" />
                Contribute to Directory
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 via-red-900 to-amber-900 py-12 px-4 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm-20-12a12 12 0 100 24 12 12 0 000-24z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Flag className="h-8 w-8 text-amber-400" />
              <Flower2 className="h-4 w-4 text-red-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-red-300 bg-clip-text text-transparent">
              Awesome Swadeshi
            </span>
            <Star className="h-6 w-6 text-amber-400" />
          </div>
          <p className="text-amber-200 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Promoting awesome Indian software innovation and helping users discover quality alternatives.
            Supporting <em>Swadeshi</em> movement and <em>Atmanirbhar Bharat</em> through technology.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Flower2 className="h-5 w-5 text-red-400" />
            <p className="text-amber-300 text-sm">&copy; 2024 Made with ❤️ in India</p>
            <Star className="h-4 w-4 text-amber-400" />
          </div>
        </div>
      </footer>
    </div>
  )
}