import { Check, X } from 'lucide-react'

interface ComparisonData {
  title: string
  international: {
    label: string
    points: string[]
  }
  swadeshi: {
    label: string
    points: string[]
  }
}

interface ComparisonTableProps {
  comparison: ComparisonData
}

export function ComparisonTable({ comparison }: ComparisonTableProps) {
  const maxPoints = Math.max(
    comparison.international.points.length,
    comparison.swadeshi.points.length
  )

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {comparison.title}
        </h2>
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2">
                <th className="p-4 text-left font-semibold text-lg">
                  {comparison.international.label}
                </th>
                <th className="p-4 text-left font-semibold text-lg bg-primary/5">
                  {comparison.swadeshi.label}
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxPoints }).map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    <div className="flex items-start gap-2">
                      <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        {comparison.international.points[index] || '—'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 bg-primary/5">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">
                        {comparison.swadeshi.points[index] || '—'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
