'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getSwadeshiTier, SWADESHI_WEIGHTS } from '@/lib/data'
import type { SwadeshiMeterData } from '@/lib/data'

interface SwadeshiMeterBreakdownProps {
  meter: SwadeshiMeterData
  companyName: string
}

const FACTOR_LABELS: Record<string, string> = {
  shareholding: 'Indian Shareholding',
  incorporation: 'Incorporation Country',
  boardControl: 'Board Control',
  founders: 'Founders',
  hqAndTeam: 'HQ & Team Location',
  dataSovereignty: 'Data Sovereignty',
  revenueOrigin: 'Revenue Origin',
}

export function SwadeshiMeterBreakdown({ meter, companyName }: SwadeshiMeterBreakdownProps) {
  const [expanded, setExpanded] = useState(false)
  const tier = getSwadeshiTier(meter.score)

  return (
    <Card className="border-l-4" style={{ borderLeftColor: tier.color }}>
      <CardHeader
        className="cursor-pointer py-4 px-6"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">🇮🇳</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">{meter.score}%</span>
                <span className="text-sm text-gray-600">{tier.label}</span>
              </div>
              <p className="text-xs text-gray-500">{companyName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {meter.dataCompleteness < 7 && (
              <span className="text-xs text-gray-400">
                Based on {meter.dataCompleteness} of 7 factors
              </span>
            )}
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Score bar */}
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${meter.score}%`, backgroundColor: tier.color }}
          />
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0 px-6 pb-6">
          <div className="space-y-4">
            {Object.entries(FACTOR_LABELS).map(([key, label]) => {
              const factor = meter.factors[key as keyof typeof meter.factors]
              const weight = SWADESHI_WEIGHTS[key]

              if (!factor) {
                return (
                  <div key={key} className="flex items-center gap-3 opacity-40">
                    <div className="w-40 text-sm text-gray-500">
                      {label} <span className="text-xs">({Math.round(weight * 100)}%)</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full" />
                    <span className="text-xs text-gray-400 w-12 text-right">No data</span>
                  </div>
                )
              }

              const factorTier = getSwadeshiTier(factor.score)

              return (
                <div key={key}>
                  <div className="flex items-center gap-3">
                    <div className="w-40 text-sm text-gray-700">
                      {label} <span className="text-xs text-gray-400">({Math.round(weight * 100)}%)</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${factor.score}%`, backgroundColor: factorTier.color }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{factor.score}%</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-[172px] mt-0.5">
                    {factor.note}
                    {factor.source && <span className="text-gray-400"> — {factor.source}</span>}
                  </p>
                </div>
              )
            })}
          </div>

          <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
            Last verified: {meter.lastVerified}
          </p>
        </CardContent>
      )}
    </Card>
  )
}
