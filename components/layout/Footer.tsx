import Link from "next/link"
import { AshokaChakra } from "@/components/ashoka-chakra"
import { SITE_NAME, FOOTER_LINKS } from "@/lib/constants"

interface FooterProps {
  variant?: "default" | "minimal"
  className?: string
}

export function Footer({ variant = "default", className = "" }: FooterProps) {
  if (variant === "minimal") {
    return (
      <footer className={`bg-gray-800 py-8 px-4 ${className}`}>
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <AshokaChakra className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold text-white">{SITE_NAME}</span>
          </div>
          <p className="text-gray-300 text-sm">
            &copy; 2024 Made with ❤️ in India
          </p>
        </div>
      </footer>
    )
  }

  return (
    <footer className={`bg-gray-800 py-12 px-4 relative ${className}`}>
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c-2 6-6 10-12 10s-10-4-12-10c2-6 6-10 12-10s10 4 12 10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <AshokaChakra className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">{SITE_NAME}</span>
            </div>
            <p className="text-gray-200 text-lg mb-4 max-w-md leading-relaxed">
              Promoting Indian software innovation and helping users discover quality alternatives.
              Supporting <em>Swadeshi</em> movement and <em>Atmanirbhar Bharat</em> through technology.
            </p>
            <div className="flex space-x-4">
              {FOOTER_LINKS.social.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Main Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              &copy; 2024 Made with ❤️ in India
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}