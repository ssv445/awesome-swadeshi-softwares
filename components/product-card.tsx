'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getAlternativeUrl, getAppUrl } from "@/lib/data"
import { Favicon } from "@/components/favicon"
import { SwadeshiMeter } from "@/components/SwadeshiMeter"
import type { Software } from "@/lib/data"
import type { SoftwareWithMeta } from "@/lib/server-data"

interface ProductCardProps {
  software: Software | SoftwareWithMeta
  index?: number
}

export function ProductCard({ software, index = 0 }: ProductCardProps) {
  // Use slug from SoftwareWithMeta if available, otherwise fallback
  const appUrl = 'slug' in software && 'categorySlug' in software
    ? `/${software.categorySlug}/${software.slug}`
    : getAppUrl(software.category, software.slug)

  return (
    <Link href={appUrl} className="block group">
      <Card className="group-hover:shadow-lg transition-all duration-300 border border-green-200 group-hover:border-green-400 bg-white group-hover:scale-[1.02]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="min-w-0 flex-1 pr-3">
              <CardTitle className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
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

          {software.swadeshiMeter && (
            <div className="pt-2">
              <SwadeshiMeter meter={software.swadeshiMeter} compact={true} />
            </div>
          )}

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">Alternative to:</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {software.alternatives.slice(0, 2).map((alt, altIndex) => (
                <Link
                  key={altIndex}
                  href={getAlternativeUrl(alt)}
                  className="inline-block"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Badge variant="outline" className="text-sm py-1.5 px-3 min-h-[36px] border-blue-300 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-700 cursor-pointer transition-colors">
                    {alt}
                  </Badge>
                </Link>
              ))}
              {software.alternatives.length > 2 && (
                <Badge variant="outline" className="text-sm py-1.5 px-3 min-h-[36px] border-gray-300 text-gray-600 bg-gray-50">
                  +{software.alternatives.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}