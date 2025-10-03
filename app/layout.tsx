import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { StructuredData, websiteStructuredData, organizationStructuredData } from "@/components/StructuredData"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://swadeshiapps.com/"),
  title: {
    default: "Awesome Swadeshi Apps - Discover Made in India Alternatives",
    template: "%s | Awesome Swadeshi Apps"
  },
  description:
    "Discover the best Indian software alternatives to popular international tools. Support homegrown innovation with our curated directory of Made in India software solutions. Join the Swadeshi movement and support Atmanirbhar Bharat.",
  keywords: [
    "Indian software",
    "Made in India",
    "software alternatives",
    "Indian startups",
    "homegrown software",
    "Indian tech companies",
    "Swadeshi software",
    "Atmanirbhar Bharat",
    "Indian SaaS",
    "indigenous software",
    "Swadeshi movement",
    "Indian technology"
  ],
  authors: [{ name: "Awesome Swadeshi Apps Community" }],
  creator: "Awesome Swadeshi Apps",
  publisher: "Awesome Swadeshi Apps",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Awesome Swadeshi Apps - Discover Made in India Alternatives",
    description: "Discover the best Indian software alternatives to popular international tools. Support homegrown innovation and the Swadeshi movement.",
    url: "https://swadeshiapps.com/",
    siteName: "Awesome Swadeshi Apps",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Awesome Swadeshi Apps - Indian Apps Directory"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Awesome Swadeshi Apps - Discover Made in India Alternatives",
    description: "Discover the best Indian software alternatives to popular international tools. Support homegrown innovation and the Swadeshi movement.",
    images: ["/og-image.png"]
  },
  alternates: {
    canonical: "https://swadeshiapps.com/",
  },
  category: "Technology",
  classification: "Software Directory",
  generator: "Next.js"
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
        <StructuredData type="website" data={websiteStructuredData} />
        <StructuredData type="organization" data={organizationStructuredData} />
      </head>
      <body>{children}</body>
    </html>
  )
}
