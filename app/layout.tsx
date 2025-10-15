import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { StructuredData, websiteStructuredData, organizationStructuredData } from "@/components/StructuredData"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"
import { AppShell } from "@/components/layout/AppShell"
import { getAllSoftware, getTotalAppsCount } from "@/lib/server-data"
import "./globals.css"

// Generate dynamic metadata with actual app count
export async function generateMetadata(): Promise<Metadata> {
  const totalApps = getTotalAppsCount()

  return {
    metadataBase: new URL("https://swadeshiapps.com/"),
    icons: {
      icon: "/logo.png",
      apple: "/logo.png"
    },
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Swadeshi Apps"
    },
    applicationName: "Swadeshi Apps",
    formatDetection: {
      telephone: false
    },
    title: {
      default: `Swadeshi Apps & Indian App Directory | ${totalApps}+ Made in India Software`,
      template: "%s | Swadeshi Apps"
    },
    description:
      `Discover ${totalApps}+ Swadeshi apps and Indian Alternatives Apps. Find messaging apps, browsers, maps, cloud storage & more - all Made in India. Support Atmanirbhar Bharat.`,
    keywords: [
      "swadeshi apps",
      "swadeshi app",
      "indian swadeshi app",
      "swadeshi software",
      "Indian software",
      "Made in India",
      "software alternatives",
      "Indian messaging app",
      "Indian browser",
      "Indian map app",
      "Indian cloud storage",
      "Indian startups",
      "Swadeshi movement",
      "Atmanirbhar Bharat",
      "Indian SaaS",
      "indigenous software",
      "Indian technology"
    ],
    authors: [{ name: "Swadeshi Apps Community" }],
    creator: "Swadeshi Apps",
    publisher: "Swadeshi Apps",
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
      title: `Swadeshi Apps & Indian App Directory | ${totalApps}+ Made in India Software`,
      description: `Discover ${totalApps}+ Swadeshi apps and Indian Alternatives Apps. Find messaging apps, browsers, maps, cloud storage & more - all Made in India.`,
      url: "https://swadeshiapps.com/",
      siteName: "Swadeshi Apps",
      locale: "en_IN",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Swadeshi Apps - Indian Apps Directory"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `Swadeshi Apps & Indian App Directory | ${totalApps}+ Made in India Software`,
      description: `Discover ${totalApps}+ Swadeshi apps and Indian Alternatives Apps. Find messaging apps, browsers, maps, cloud storage & more - all Made in India.`,
      images: ["/og-image.png"]
    },
    alternates: {
      canonical: "https://swadeshiapps.com/",
    },
    category: "Technology",
    classification: "Software Directory",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Load all software data once at the layout level
  const allSoftware = getAllSoftware()

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#FF9933" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <StructuredData type="website" data={websiteStructuredData} />
        <StructuredData type="organization" data={organizationStructuredData} />
        <GoogleAnalytics />
      </head>
      <body>
        <AppShell allSoftware={allSoftware}>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
