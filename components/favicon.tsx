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
}

export function Favicon({
  websiteUrl,
  name,
  size = 32,
  className = "h-6 w-6 rounded-sm flex-shrink-0",
  fallbackClassName = "h-5 w-5 text-blue-600 flex-shrink-0"
}: FaviconProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  if (imageError) {
    return <AshokaChakra className={fallbackClassName} />
  }

  return (
    <img
      src={getFaviconUrl(websiteUrl, size)}
      alt={`${name} favicon`}
      className={className}
      onError={handleImageError}
      loading="lazy"
    />
  )
}