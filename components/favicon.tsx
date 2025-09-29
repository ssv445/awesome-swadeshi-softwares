"use client"

import { useState } from "react"
import { AshokaChakra } from "@/components/ashoka-chakra"
import { getFaviconUrl } from "@/lib/data"

interface FaviconProps {
  websiteUrl: string
  name: string
  size?: number
  className?: string
  fallbackClassName?: string
  customFaviconUrl?: string // Optional custom favicon URL
  fixedHeight?: boolean // Whether to maintain fixed height with flexible width
}

export function Favicon({
  websiteUrl,
  name,
  size = 32,
  className = "h-6 w-6 rounded-sm flex-shrink-0",
  fallbackClassName = "h-5 w-5 text-blue-600 flex-shrink-0",
  customFaviconUrl,
  fixedHeight = false
}: FaviconProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  if (imageError) {
    return <AshokaChakra className={fallbackClassName} />
  }

  // Use custom favicon URL if provided, otherwise fall back to Google's API
  const faviconUrl = customFaviconUrl || getFaviconUrl(websiteUrl, size)

  // Apply flexible width styling for logos when fixedHeight is true
  const imageClassName = fixedHeight
    ? `h-12 max-w-24 object-contain object-right ${className}`.replace(/h-\d+|w-\d+/, '').trim()
    : className

  return (
    <img
      src={faviconUrl}
      alt={`${name} favicon`}
      className={imageClassName}
      onError={handleImageError}
      loading="lazy"
    />
  )
}