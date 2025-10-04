import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAlternativeUrl, getAppUrl } from "@/lib/data"
import { Favicon } from "@/components/favicon"
import type { Software } from "@/lib/data"
import type { SoftwareWithMeta } from "@/lib/server-data"

interface ProductCardProps {
  software: Software | SoftwareWithMeta
  index?: number
}

export function ProductCard({ software, index = 0 }: ProductCardProps) {
  // Use slug from SoftwareWithMeta if available, otherwise generate from name
  const appUrl = 'slug' in software && 'categorySlug' in software
    ? `/${software.categorySlug}/${software.slug}`
    : getAppUrl(software.category, software.name)

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-green-200 hover:border-green-400 bg-white hover:scale-[1.02]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="min-w-0 flex-1 pr-3">
            <CardTitle className="text-xl font-bold text-gray-900 truncate">
              {software.name}
            </CardTitle>
            <p className="text-sm text-gray-600 font-medium mt-1">{software.company}</p>
          </div>
          <div className="flex-shrink-0">
            <Favicon
              websiteUrl={software.website}
              name={software.name}
              size={256}
              className="h-12 max-w-24 object-contain"
              fallbackClassName="h-10 w-10 text-blue-600"
              customFaviconUrl={software.faviconUrl}
              fixedHeight={true}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-sm">{software.description}</p>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-600">Alternative to:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {software.alternatives.map((alt, altIndex) => (
              <Link key={altIndex} href={getAlternativeUrl(alt)}>
                <Badge variant="outline" className="text-xs border-blue-300 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-700 cursor-pointer transition-colors">
                  {alt}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-gray-100">
          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
            <Link href={appUrl}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}