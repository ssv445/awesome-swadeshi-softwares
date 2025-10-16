import { Button } from "@/components/ui/button"
import { AshokaChakra } from "@/components/ashoka-chakra"
import Link from "next/link"
import { Home, Search } from "lucide-react"
const REAL_404_ERROR = 'Yes, this is a 404 error.';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <AshokaChakra className="h-16 w-16 md:h-20 md:w-20 text-orange-600 opacity-50" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found  {REAL_404_ERROR}
        </h2>

        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="border-2 border-green-600">
            <Link href="/">
              <Search className="mr-2 h-5 w-5" />
              Search Apps
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
