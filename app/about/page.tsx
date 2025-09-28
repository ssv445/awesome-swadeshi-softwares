import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, ExternalLink, GitPullRequest, FileText, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Flag className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Indian Software Directory</h1>
                <p className="text-sm text-gray-600">Made in India, Made for the World</p>
              </div>
            </Link>
            <Button asChild variant="outline">
              <Link href="/">Back to Directory</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <Flag className="h-16 w-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Add Your Software</h1>
          <p className="text-xl text-gray-600">
            Help grow our directory by contributing Indian software alternatives
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <GitPullRequest className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle>How to Contribute</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <p className="text-gray-600">Fork our GitHub repository</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <p className="text-gray-600">Edit <code className="bg-gray-100 px-1 rounded">data/software.json</code></p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <p className="text-gray-600">Add your software entry</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                  <p className="text-gray-600">Submit a Pull Request</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle>Required Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Software name and description</li>
                <li>• Company name and location in India</li>
                <li>• Website URL (must be working)</li>
                <li>• Category (Business, Finance, etc.)</li>
                <li>• International alternatives it replaces</li>
                <li>• Pricing model (Free/Freemium/Paid)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Example Entry Format</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
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