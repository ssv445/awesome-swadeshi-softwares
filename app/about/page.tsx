import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, ExternalLink, GitPullRequest, FileText, Users, Star, Flower2, Crown, Zap } from "lucide-react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import { AppShell } from "@/components/layout/AppShell"
import { HeroSection } from "@/components/ui/HeroSection"
import { NumberedStep } from "@/components/ui/NumberedStep"
import { Breadcrumbs, generateBreadcrumbs } from "@/components/ui/Breadcrumbs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contribute to Awesome Swadeshi Softwares - Add Indian Software",
  description: "Help grow our directory by contributing Indian software alternatives. Learn how to add your Swadeshi software to support the Atmanirbhar Bharat movement through community collaboration.",
  keywords: [
    "contribute Indian software",
    "add Swadeshi apps",
    "Indian software directory",
    "Atmanirbhar Bharat",
    "open source contribution",
    "GitHub pull request",
    "Indian tech community",
    "software submission"
  ],
  openGraph: {
    title: "Contribute to Awesome Swadeshi Softwares",
    description: "Help grow our directory by contributing Indian software alternatives. Support the Swadeshi movement through community collaboration.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "Contribute to Awesome Swadeshi Softwares"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contribute to Awesome Swadeshi Softwares",
    description: "Help grow our directory by contributing Indian software alternatives. Support the Swadeshi movement through community collaboration.",
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
    staticPageName: 'Contribute'
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

        <div className="container mx-auto px-4 py-16 max-w-4xl relative z-10">

        <HeroSection
          title="Add Your Awesome Swadeshi Software"
          highlightWord="Awesome"
          highlightColor="text-blue-600"
          description="Help grow our directory by contributing Indian software alternatives. Support the Swadeshi movement and Atmanirbhar Bharat through community collaboration."
          chakraSize="large"
        />

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border border-green-200 hover:border-green-400 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <GitPullRequest className="h-10 w-10 text-gray-500" />
              </div>
              <CardTitle className="text-2xl text-gray-900">
                How to Contribute
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <NumberedStep number={1} text="Fork our GitHub repository" />
                <NumberedStep number={2} text="Create JSON file in category folder" />
                <NumberedStep number={3} text="Add your software entry" />
                <NumberedStep number={4} text="Submit a Pull Request" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-green-200 hover:border-green-400 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-10 w-10 text-gray-500" />
              </div>
              <CardTitle className="text-2xl text-gray-900">
                Required Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
<span className="font-medium">Software name and description</span>
                </li>
                <li className="flex items-center space-x-2">
<span className="font-medium">Company name and location in India</span>
                </li>
                <li className="flex items-center space-x-2">
<span className="font-medium">Website URL (must be working)</span>
                </li>
                <li className="flex items-center space-x-2">
<span className="font-medium">Category (Business, Finance, etc.)</span>
                </li>
                <li className="flex items-center space-x-2">
<span className="font-medium">International alternatives it replaces</span>
                </li>
                <li className="flex items-center space-x-2">
<span className="font-medium">Pricing model (Free/Freemium/Paid)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-16 border border-green-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-8 w-8 text-gray-500" />
              <Flower2 className="h-5 w-5 text-orange-500" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-green-700 to-orange-700 bg-clip-text text-transparent">
              Example Entry Format
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-50 p-6 rounded-xl text-sm overflow-x-auto border border-green-200">
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
              <Users className="h-8 w-8 text-gray-500 mb-2" />
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
              <AshokaChakra className="h-8 w-8 text-gray-500 mb-2" />
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
      </div>
    </AppShell>
  )
}