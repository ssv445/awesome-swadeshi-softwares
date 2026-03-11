'use client'

import { getSwadeshiTier } from '@/lib/data'
import type { SwadeshiMeterData } from '@/lib/data'

interface SwadeshiMeterBadgeProps {
  meter: SwadeshiMeterData
  className?: string
}

export function SwadeshiMeterBadge({ meter, className = '' }: SwadeshiMeterBadgeProps) {
  const tier = getSwadeshiTier(meter.score)

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${tier.bgClass} ${className}`}
      title={`${tier.label} — ${meter.score}% Swadeshi score based on ${meter.dataCompleteness} of 7 factors`}
    >
      <span className="text-[10px]">🇮🇳</span>
      <span>{meter.score}%</span>
      {meter.dataCompleteness < 7 && (
        <span className="text-[10px] opacity-70">({meter.dataCompleteness}/7)</span>
      )}
    </span>
  )
}
