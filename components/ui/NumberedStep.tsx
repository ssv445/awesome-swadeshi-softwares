import { cn } from "@/lib/utils"

interface NumberedStepProps {
  number: number
  text: string
  className?: string
}

export function NumberedStep({ number, text, className }: NumberedStepProps) {
  return (
    <div className={cn("flex items-start space-x-4", className)}>
      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
        {number}
      </div>
      <p className="text-gray-700 font-medium">{text}</p>
    </div>
  )
}