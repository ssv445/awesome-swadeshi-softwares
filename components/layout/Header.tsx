import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AshokaChakra } from "@/components/ashoka-chakra"
import { SITE_NAME, NAV_LINKS } from "@/lib/constants"

interface HeaderProps {
  variant?: "default" | "minimal"
  className?: string
}

export function Header({ variant = "default", className = "" }: HeaderProps) {
  return (
    <header className={`border-b border-green-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and site name */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <AshokaChakra className="h-10 w-10 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {SITE_NAME}
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Indian Apps Directory • Atmanirbhar Bharat
              </p>
            </div>
          </Link>

          {/* Navigation */}
          {variant === "default" && (
            <nav className="hidden md:flex items-center space-x-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" className="border border-gray-300 text-gray-600 hover:bg-gray-50 bg-white">
              <Link href="/why-swadeshi">Why Swadeshi?</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white border-none">
              <Link href="/about">Add App</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {variant === "default" && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}