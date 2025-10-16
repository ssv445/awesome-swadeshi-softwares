import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1 text-sm text-gray-600", className)}>
      <Link
        href="/"
        className="flex items-center hover:text-blue-600 transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.href && !item.current ? (
            <Link
              href={item.href}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={cn(
                "text-gray-900 font-medium",
                item.current && "text-blue-600"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Helper function to generate breadcrumbs for different page types
export function generateBreadcrumbs(
  type: 'category' | 'software' | 'alternative' | 'static',
  data: {
    category?: string
    categoryName?: string
    softwareName?: string
    alternativeName?: string
    staticPageName?: string
  }
): BreadcrumbItem[] {
  switch (type) {
    case 'category':
      return [
        { label: data.categoryName || 'Category', current: true }
      ]

    case 'software':
      return [
        {
          label: data.categoryName || 'Category',
          href: `/${data.category}`
        },
        {
          label: data.softwareName || 'Software',
          current: true
        }
      ]

    case 'alternative':
      return [
        {
          label: 'Alternatives',
          href: '/alternatives'
        },
        {
          label: data.alternativeName || 'Alternative',
          current: true
        }
      ]

    case 'static':
      return [
        {
          label: data.staticPageName || 'Page',
          current: true
        }
      ]

    default:
      return []
  }
}

// Helper function to generate BreadcrumbList structured data
export function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl = 'https://swadeshiapps.com') {
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.label,
      ...(item.href && { item: `${baseUrl}${item.href}` })
    }))
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  }
}