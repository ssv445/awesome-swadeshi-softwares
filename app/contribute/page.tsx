import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, FileText, GitPullRequest, ExternalLink } from "lucide-react"
import { HeroSection } from "@/components/ui/HeroSection"
import { Breadcrumbs, generateBreadcrumbs } from "@/components/ui/Breadcrumbs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contribute to Swadeshi Apps - Add Indian Software",
  description: "Help grow our directory by contributing Indian Alternatives Apps. Submit via GitHub or request a product addition through our form.",
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
    title: "Contribute to Swadeshi Apps",
    description: "Help grow our directory by contributing Indian Alternatives Apps. Submit via GitHub or request a product addition.",
    url: "/contribute",
    type: "website",
    images: [
      {
        url: "/og-contribute.png",
        width: 1200,
        height: 630,
        alt: "Contribute to Swadeshi Apps"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contribute to Swadeshi Apps",
    description: "Help grow our directory by contributing Indian Alternatives Apps.",
    images: ["/og-contribute.png"]
  },
  alternates: {
    canonical: "/contribute",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function ContributePage() {
  const breadcrumbs = generateBreadcrumbs('static', {
    staticPageName: 'Contribute'
  })

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
            title="Contribute to Swadeshi Apps"
            highlightWord="Contribute"
            highlightColor="text-blue-600"
            description="Help us grow this directory by adding Indian software products. Choose the option that works best for you."
            chakraSize="large"
          />

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Developer Option */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Code className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-gray-900 text-center">
                  For Developers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 text-center">
                  Familiar with GitHub? Contribute directly to our repository by creating a pull request.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 mb-3 font-medium">Quick Steps:</p>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li>1. Fork the repository</li>
                    <li>2. Add JSON file in category folder</li>
                    <li>3. Submit a Pull Request</li>
                  </ol>
                </div>

                <Button asChild size="lg" className="w-full">
                  <Link href="https://github.com/ssv445/awesome-swadeshi-softwares" target="_blank" rel="noopener noreferrer">
                    <GitPullRequest className="mr-2 h-5 w-5" />
                    Contribute on GitHub
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link href="https://github.com/ssv445/awesome-swadeshi-softwares/blob/main/data/README.md" target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    View Guidelines
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Non-Developer Option */}
            <Card className="border-2 border-green-200 hover:border-green-400 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <FileText className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-gray-900 text-center">
                  Not a Developer?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 text-center">
                  No problem! Simply fill out our form and we'll review and add the product for you.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 mb-3 font-medium">What we need:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Product name</li>
                    <li>• Website URL</li>
                  </ul>
                </div>

                <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="https://forms.zohopublic.in/zeptomail130082022600088602161/form/SubmitSwadeshiProduct/formperma/F-ZRELy4mEyYK4eKIreXVmVDROVqszZyZbFzu2gtQ4A" target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-5 w-5" />
                    Submit Product Request
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  We'll review your submission and add it to the directory
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Guidelines Note */}
          <Card className="bg-blue-50 border border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-700 text-center">
                <span className="font-semibold">Important:</span> Products must be developed by Indian companies and actively maintained.
                We verify all submissions before adding them to the directory.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
