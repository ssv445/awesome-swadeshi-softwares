"use client"

import { useState } from "react"

interface SafeImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
}

export function SafeImage({ src, alt, className, fallbackSrc }: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImageSrc(fallbackSrc)
      setHasError(true)
    } else {
      setHasError(true)
    }
  }

  if (hasError && !fallbackSrc) {
    return null
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  )
}