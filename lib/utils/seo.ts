import type { Software, Category } from "../types"

export const generateSoftwareSchema = (software: Software) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: software.name,
    description: software.description,
    url: software.website,
    applicationCategory: software.category.name,
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: software.pricing === "Free" ? "0" : "varies",
      priceCurrency: "INR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: software.rating,
      reviewCount: software.reviews,
    },
    author: {
      "@type": "Organization",
      name: software.company,
      address: {
        "@type": "PostalAddress",
        addressLocality: software.location,
        addressCountry: "IN",
      },
    },
  }
}

export const generateCategorySchema = (category: Category) => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `/category/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: category.softwareCount,
    },
  }
}

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
