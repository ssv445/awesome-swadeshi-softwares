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
      <footer className={`bg-gray-800 py-6 sm:py-8 px-3 sm:px-4 ${className}`}>
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <AshokaChakra className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
            <span className="text-base sm:text-lg font-bold text-white">{SITE_NAME}</span>
          </div>
          <p className="text-gray-300 text-xs sm:text-sm">
            &copy; 2024 Made with ❤️ in India
          </p>
        </div>
      </footer>
    )
  }

  return (
    <footer className={`bg-gray-800 py-8 sm:py-10 md:py-12 px-3 sm:px-4 relative ${className}`}>
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c-2 6-6 10-12 10s-10-4-12-10c2-6 6-10 12-10s10 4 12 10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        {/* CTA Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto">
          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
            Know an Indian Product?
          </h3>
          <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
            Help us grow this directory! If you know a great Indian software product that's not listed yet, share it with the community.
          </p>
          <Link
            href="https://forms.zohopublic.in/zeptomail130082022600088602161/form/SubmitSwadeshiProduct/formperma/F-ZRELy4mEyYK4eKIreXVmVDROVqszZyZbFzu2gtQ4A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all text-sm sm:text-base"
          >
            Submit Swadeshi Product
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <AshokaChakra className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">{SITE_NAME}</span>
            </div>
            <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 max-w-md leading-relaxed">
              Promoting Indian software innovation and helping users discover quality alternatives.
              Supporting <em>Swadeshi</em> movement and <em>Atmanirbhar Bharat</em> through technology.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {FOOTER_LINKS.social.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
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
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Explore</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Categories</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8">
          <div className="flex justify-center items-center">
            <p className="text-gray-300 text-xs sm:text-sm">
              &copy; 2025 Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}