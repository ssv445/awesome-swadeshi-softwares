import Image from "next/image"

interface AshokaChakraProps {
  className?: string
  width?: number
}

export function AshokaChakra({ className = "h-6 w-6" }: AshokaChakraProps) {
  return (
    <Image
      src="/logo.png"
      alt="Swadeshi Apps Logo"
      width={160}
      height={160}
      className={className}
    />
  )
}