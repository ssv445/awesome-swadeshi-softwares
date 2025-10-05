import { Header } from "./Header"
import { Footer } from "./Footer"
import type { Software } from "@/lib/data"

interface AppShellProps {
  children: React.ReactNode
  headerVariant?: "default" | "minimal"
  footerVariant?: "default" | "minimal"
  className?: string
  allSoftware?: Software[]
}

export function AppShell({
  children,
  headerVariant = "default",
  footerVariant = "default",
  className = "",
  allSoftware
}: AppShellProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-white to-green-50 ${className}`}>
      {/* Subtle Lotus Pattern Overlay */}
      <div className="fixed inset-0 opacity-3 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.2'%3E%3Cpath d='M40 20c-2 8-8 14-16 14s-14-6-16-14c2-8 8-14 16-14s14 6 16 14zm-16 20c8 0 14-6 16-14-2-8-8-14-16-14s-14 6-16 14c2 8 8 14 16 14z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header */}
      <Header variant={headerVariant} allSoftware={allSoftware} />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <Footer variant={footerVariant} />
    </div>
  )
}