import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  variant?: 'default' | 'hover-scale' | 'simple'
  className?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = 'default',
  className
}: FeatureCardProps) {
  const variants = {
    default: "border-2 border-green-200 hover:border-green-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300",
    'hover-scale': "group border-2 border-green-200 hover:border-green-400 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105",
    simple: "border border-green-200 hover:border-green-400 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
  }

  return (
    <Card className={cn(variants[variant], className)}>
      <CardHeader className="text-center">
        <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <CardTitle className="text-2xl text-gray-700">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-800 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}