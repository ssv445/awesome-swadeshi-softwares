import { AshokaChakra } from "@/components/ashoka-chakra"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  highlightWord?: string
  highlightColor?: string
  className?: string
  chakraSize?: 'small' | 'medium' | 'large'
}

export function HeroSection({
  title,
  subtitle,
  description,
  highlightWord,
  highlightColor = "text-orange-600",
  className,
  chakraSize = 'medium'
}: HeroSectionProps) {
  const chakraSizes = {
    small: "h-12 w-12",
    medium: "h-16 w-16",
    large: "h-20 w-20"
  }

  const renderTitle = () => {
    if (!highlightWord) {
      return <span>{title}</span>
    }

    const parts = title.split(highlightWord)
    return (
      <>
        {parts[0]}
        <span className={highlightColor}>{highlightWord}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <div className={cn("text-center mb-16", className)}>
      <div className="flex items-center justify-center mb-8">
        <AshokaChakra className={cn(chakraSizes[chakraSize], "text-blue-600")} />
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        {renderTitle()}
      </h1>
      {subtitle && (
        <p className="text-xl md:text-2xl text-gray-800 mb-6 font-medium max-w-4xl mx-auto">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}