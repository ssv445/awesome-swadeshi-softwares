interface StructuredDataProps {
  type: 'website' | 'software' | 'organization' | 'breadcrumbList'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': getSchemaType(type),
    ...data
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

function getSchemaType(type: string): string {
  switch (type) {
    case 'website':
      return 'WebSite'
    case 'software':
      return 'SoftwareApplication'
    case 'organization':
      return 'Organization'
    case 'breadcrumbList':
      return 'BreadcrumbList'
    default:
      return 'Thing'
  }
}

// Common structured data generators
export const websiteStructuredData = {
  name: "Awesome Swadeshi Apps",
  description: "Discover the best Indian software alternatives to popular international tools. Support homegrown innovation and the Swadeshi movement.",
  url: "https://swadeshiapps.com/",
  sameAs: [
    "https://github.com/ssv445/awesome-swadeshi-softwares"
  ],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://swadeshiapps.com/?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export const organizationStructuredData = {
  name: "Awesome Swadeshi Apps",
  description: "A community-driven directory of Indian software alternatives",
  url: "https://swadeshiapps.com/",
  logo: "https://swadeshiapps.com/logo.png",
  foundingDate: "2024",
  founders: [
    {
      "@type": "Person",
      name: "Shyam Verma"
    }
  ],
  sameAs: [
    "https://github.com/ssv445/awesome-swadeshi-softwares"
  ]
}