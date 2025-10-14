import React from 'react'
import * as LucideIcons from 'lucide-react'

interface Benefit {
  icon: string
  title: string
  description: string
}

interface WhyChooseSectionProps {
  benefits: Benefit[]
}

export function WhyChooseSection({ benefits }: WhyChooseSectionProps) {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Why Choose Swadeshi Apps?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = (LucideIcons as any)[benefit.icon] as React.ComponentType<{ className?: string }>
            return (
              <div key={index} className="flex flex-col items-center text-center p-6">
                <div className="mb-4 p-4 rounded-full bg-primary/10">
                  {React.createElement(IconComponent as any, {
                    className: 'h-8 w-8 text-primary',
                  })}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
