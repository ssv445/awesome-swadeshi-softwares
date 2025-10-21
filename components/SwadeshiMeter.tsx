'use client'

import { SwadeshiMeter as SwadeshiMeterType, calculateSwadeshiScore, getSwadeshiRating } from '@/lib/data'
import { Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface SwadeshiMeterProps {
  meter: SwadeshiMeterType
  showDetails?: boolean
  compact?: boolean
}

export function SwadeshiMeter({ meter, showDetails = false, compact = false }: SwadeshiMeterProps) {
  const score = calculateSwadeshiScore(meter)
  const rating = getSwadeshiRating(score)

  // Calculate stroke offset for circular progress
  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeOffset = circumference - (score / 100) * circumference

  // Color mapping
  const colorMap = {
    green: 'stroke-green-600',
    lime: 'stroke-lime-600',
    yellow: 'stroke-yellow-600',
    orange: 'stroke-orange-600',
    red: 'stroke-red-600',
  }

  const bgColorMap = {
    green: 'bg-green-50 border-green-200',
    lime: 'bg-lime-50 border-lime-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200',
  }

  const textColorMap = {
    green: 'text-green-700',
    lime: 'text-lime-700',
    yellow: 'text-yellow-700',
    orange: 'text-orange-700',
    red: 'text-red-700',
  }

  const badgeVariantMap = {
    green: 'default',
    lime: 'secondary',
    yellow: 'secondary',
    orange: 'secondary',
    red: 'destructive',
  } as const

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-flex items-center gap-2 cursor-help">
              <div className="relative w-12 h-12">
                <svg className="transform -rotate-90 w-12 h-12">
                  {/* Background circle */}
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-200"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className={colorMap[rating.color as keyof typeof colorMap]}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xs font-bold ${textColorMap[rating.color as keyof typeof textColorMap]}`}>
                    {score}
                  </span>
                </div>
              </div>
              <Badge variant={badgeVariantMap[rating.color as keyof typeof badgeVariantMap]}>
                {rating.label}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <div className="space-y-2">
              <p className="font-semibold">Swadeshi Score: {score}/100</p>
              <p className="text-sm">{rating.description}</p>
              <div className="text-xs space-y-1 pt-2 border-t">
                <div className="flex justify-between">
                  <span>Indian Ownership:</span>
                  <span className="font-medium">{meter.indianOwnership}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Indian Founders:</span>
                  <span className="font-medium">{meter.indianFounders}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Indian Employees:</span>
                  <span className="font-medium">{meter.indianEmployees}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Originated in India:</span>
                  <span className="font-medium">{meter.originatedInIndia ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span>HQ in India:</span>
                  <span className="font-medium">{meter.headquartersInIndia ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Registered in India:</span>
                  <span className="font-medium">{meter.registeredInIndia ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className={`rounded-lg border p-6 ${bgColorMap[rating.color as keyof typeof bgColorMap]}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Swadeshi Meter</h3>
          <p className="text-sm text-muted-foreground">How Indian is this product?</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-5 w-5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p className="text-sm">
                The Swadeshi meter measures how Indian a product is based on ownership, founders,
                origin, headquarters, employees, and legal registration.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-6">
        {/* Circular gauge */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="transform -rotate-90 w-32 h-32">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className={colorMap[rating.color as keyof typeof colorMap]}
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${textColorMap[rating.color as keyof typeof textColorMap]}`}>
              {score}
            </span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>

        {/* Rating and details */}
        <div className="flex-1">
          <Badge
            variant={badgeVariantMap[rating.color as keyof typeof badgeVariantMap]}
            className="mb-2"
          >
            {rating.label}
          </Badge>
          <p className="text-sm text-muted-foreground mb-3">{rating.description}</p>

          {showDetails && (
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <span className="text-muted-foreground">Ownership:</span>
                  <div className="font-medium">{meter.indianOwnership}% Indian</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Founders:</span>
                  <div className="font-medium">{meter.indianFounders}% Indian</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Employees:</span>
                  <div className="font-medium">{meter.indianEmployees}% in India</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Origin:</span>
                  <div className="font-medium">{meter.originatedInIndia ? 'India' : 'Outside India'}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Headquarters:</span>
                  <div className="font-medium">{meter.headquartersInIndia ? 'India' : 'Outside India'}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Registration:</span>
                  <div className="font-medium">{meter.registeredInIndia ? 'India' : 'Outside India'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
