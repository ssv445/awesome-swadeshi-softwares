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
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo and site name */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity min-w-0 flex-shrink">
            <AshokaChakra className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                {SITE_NAME}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium hidden sm:block">
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
        </div>

        {/* Mobile Navigation */}
        {variant === "default" && (
          <nav className="lg:hidden mt-3 pt-3 border-t border-gray-200">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium transition-colors"
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