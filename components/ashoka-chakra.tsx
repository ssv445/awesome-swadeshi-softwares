interface AshokaChakraProps {
  className?: string
  color?: string
}

export function AshokaChakra({ className = "h-6 w-6", color = "currentColor" }: AshokaChakraProps) {
  // Generate 24 spokes (one every 15 degrees)
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 15 * Math.PI) / 180
    const x1 = 50 + 45 * Math.cos(angle)
    const y1 = 50 + 45 * Math.sin(angle)
    const x2 = 50 + 15 * Math.cos(angle)
    const y2 = 50 + 15 * Math.sin(angle)

    return `M${x1},${y1} L${x2},${y2}`
  }).join(' ')

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="3" fill="none" />

      {/* Inner circle */}
      <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="2" fill="none" />

      {/* 24 spokes */}
      <path d={spokes} stroke={color} strokeWidth="1.5" strokeLinecap="round" />

      {/* Center dot */}
      <circle cx="50" cy="50" r="3" fill={color} />
    </svg>
  )
}