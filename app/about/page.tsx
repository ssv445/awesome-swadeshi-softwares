import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, ExternalLink, GitPullRequest, FileText, Users, Star, Flower2 } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
                  Indian Software Directory
                </h1>
                <p className="text-sm text-amber-700 font-medium">Made in India • Atmanirbhar Bharat</p>
              </div>
            </Link>
            <Button asChild className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white border-none shadow-lg">
              <Link href="/">Back to Directory</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 text-amber-300 opacity-20">
          <Star className="h-16 w-16" />
        </div>
        <div className="absolute bottom-20 left-10 text-red-300 opacity-20">
          <Flower2 className="h-20 w-20" />
        </div>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Flag className="h-20 w-20 text-amber-600 drop-shadow-lg" />
              <div className="absolute -top-2 -left-2 w-24 h-24 border-2 border-amber-300 rounded-full opacity-50"></div>
              <div className="absolute -bottom-1 -right-1">
                <Flower2 className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Add Your <span className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 bg-clip-text text-transparent">Swadeshi</span> Software
          </h1>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto leading-relaxed">
            Help grow our directory by contributing Indian software alternatives.
            Support <em>Atmanirbhar Bharat</em> through community collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-2 border-amber-200 hover:border-amber-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <GitPullRequest className="h-10 w-10 text-amber-600" />
                <Star className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
                How to Contribute
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">1</div>
                  <p className="text-amber-800 font-medium">Fork our GitHub repository</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">2</div>
                  <p className="text-amber-800 font-medium">Create JSON file in category folder</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">3</div>
                  <p className="text-amber-800 font-medium">Add your software entry</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">4</div>
                  <p className="text-amber-800 font-medium">Submit a Pull Request</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-200 hover:border-amber-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-10 w-10 text-amber-600" />
                <Flower2 className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
                Required Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-amber-800">
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">Software name and description</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">Company name and location in India</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">Website URL (must be working)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">Category (Business, Finance, etc.)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">International alternatives it replaces</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">Pricing model (Free/Freemium/Paid)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-16 border-2 border-amber-200 bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-8 w-8 text-amber-600" />
              <Flower2 className="h-5 w-5 text-red-500" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
              Example Entry Format
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gradient-to-r from-amber-50 to-red-50 p-6 rounded-2xl text-sm overflow-x-auto border-2 border-amber-200 shadow-inner">
{`{
  "name": "Your Software Name",
  "description": "Brief description of what your software does",
  "website": "https://yourwebsite.com",
  "category": "Business",
  "alternatives": ["International Software 1", "International Software 2"],
  "pricing": "Freemium",
  "company": "Your Company Name",
  "location": "City, State"
}`}
            </pre>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle>Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Must be developed by an Indian company</li>
                <li>• Software must be live and functional</li>
                <li>• Clear, concise descriptions</li>
                <li>• Accurate alternative listings</li>
                <li>• No duplicate entries</li>
                <li>• Family-friendly content only</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Flag className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>• Business</div>
                <div>• Finance</div>
                <div>• Education</div>
                <div>• E-commerce</div>
                <div>• Transportation</div>
                <div>• Food Delivery</div>
                <div>• Gaming</div>
                <div>• Development</div>
                <div>• Design</div>
                <div>• Communication</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="https://github.com/shyam-verma/awesome-swadeshi-softwares" target="_blank" rel="noopener noreferrer">
                <GitPullRequest className="mr-2 h-5 w-5" />
                Contribute on GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="https://github.com/shyam-verma/awesome-swadeshi-softwares/blob/main/data/README.md" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-5 w-5" />
                Read Full Guidelines
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="text-gray-500 text-sm">
            Questions? Open an issue on GitHub or contact us through the repository.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Flag className="h-5 w-5 text-orange-500" />
            <span className="font-bold">Indian Software Directory</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Promoting Indian software innovation and helping users discover quality alternatives.
          </p>
          <p className="text-gray-500 text-xs">&copy; 2024 Made with ❤️ in India</p>
        </div>
      </footer>
    </div>
  )
}