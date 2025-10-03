import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="animate-pulse border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 pr-3">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-12 w-12 bg-gray-200 rounded"></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
        <div className="flex justify-end pt-3">
          <div className="h-9 bg-gray-200 rounded w-28"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export function CategoryPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-64 mb-4 mx-auto"></div>
        <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function AppPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-pulse">
      <div className="mb-8">
        <div className="h-4 bg-gray-200 rounded w-48"></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-start space-x-6">
          <div className="h-24 w-24 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="flex space-x-4">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-6 bg-gray-200 rounded w-28"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 h-64 bg-gray-200 rounded-xl"></div>
        <div className="h-64 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  )
}
