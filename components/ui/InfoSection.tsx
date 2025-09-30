import { AshokaChakra } from "@/components/ashoka-chakra"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface InfoSectionProps {
  title: string
  subtitle?: string
  children: ReactNode
  variant?: 'default' | 'highlighted' | 'cta'
  highlightWord?: string
  highlightColor?: string
  className?: string
  showChakra?: boolean
}

export function InfoSection({
  title,
  subtitle,
  children,
  variant = 'default',
  highlightWord,
  highlightColor = "text-orange-600",
  className,
  showChakra = true
}: InfoSectionProps) {
  const variants = {
    default: "bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8",
    highlighted: "bg-orange-50 rounded-3xl p-12 border border-orange-300",
    cta: "bg-white/80 backdrop-blur-sm border-2 border-green-300 rounded-3xl p-12 shadow-2xl"
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
    <div className={cn(variants[variant], className)}>
      <div className="text-center mb-8">
        {showChakra && (
          <AshokaChakra className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        )}
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {renderTitle()}
        </h2>
        {subtitle && (
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}