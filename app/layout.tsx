import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Indian Software Directory - Discover Made in India Alternatives",
  description:
    "Discover the best Indian software alternatives to popular international tools. Support homegrown innovation with our curated directory of Made in India software solutions.",
  keywords:
    "Indian software, Made in India, software alternatives, Indian startups, homegrown software, Indian tech companies",
  authors: [{ name: "Indian Software Directory" }],
  creator: "Indian Software Directory",
  publisher: "Indian Software Directory",
  robots: "index, follow",
  openGraph: {
    title: "Indian Software Directory - Discover Made in India Alternatives",
    description: "Discover the best Indian software alternatives to popular international tools.",
    url: "https://indiansoftware.directory",
    siteName: "Indian Software Directory",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Software Directory - Discover Made in India Alternatives",
    description: "Discover the best Indian software alternatives to popular international tools.",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
