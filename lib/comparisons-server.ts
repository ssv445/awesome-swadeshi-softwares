export interface ComparisonData {
  slug: string
  internationalTool: {
    name: string
    description: string
    category: string
    logo: string
    website: string
    popularity: string
  }
  indianAlternatives: {
    name: string
    company: string
    location: string
    description: string
    website: string
    pricing: string
    features: string[]
    advantages: string[]
    faviconUrl?: string
  }[]
  comparison?: {
    features: {
      name: string
      international: boolean
      indian: boolean
      note?: string
    }[]
  }
  benefits: {
    title: string
    description: string
    icon: string
  }[]
}

// High-value comparison data
const comparisons: ComparisonData[] = [
  {
    slug: "salesforce-vs-zoho-crm",
    internationalTool: {
      name: "Salesforce",
      description: "World's #1 CRM platform for sales, service, and marketing",
      category: "CRM",
      logo: "https://www.salesforce.com/favicon.ico",
      website: "https://www.salesforce.com",
      popularity: "Most popular CRM globally"
    },
    indianAlternatives: [
      {
        name: "Zoho CRM",
        company: "Zoho Corporation",
        location: "Chennai",
        description: "Customer relationship management software for sales teams and businesses",
        website: "https://www.zoho.com/crm/",
        pricing: "Freemium",
        features: [
          "Sales Pipeline Management",
          "Lead & Contact Management",
          "Email Integration",
          "Mobile CRM App",
          "Workflow Automation",
          "Analytics & Reporting"
        ],
        advantages: [
          "Lower cost with more features",
          "Indian customer support",
          "Data stored in India",
          "No vendor lock-in"
        ],
        faviconUrl: "https://www.zohowebstatic.com/sites/zweb/images/productlogos/crm.svg"
      },
      {
        name: "Freshsales",
        company: "Freshworks",
        location: "Chennai",
        description: "Modern CRM software with built-in phone, email, and lead scoring",
        website: "https://www.freshworks.com/crm/sales/",
        pricing: "Freemium",
        features: [
          "Contact Management",
          "Deal Management",
          "Email Tracking",
          "Built-in Phone",
          "Lead Scoring",
          "Visual Sales Pipeline"
        ],
        advantages: [
          "Intuitive interface",
          "Quick setup and deployment",
          "Excellent customer support",
          "Affordable pricing"
        ]
      }
    ],
    comparison: {
      features: [
        { name: "Contact Management", international: true, indian: true },
        { name: "Sales Pipeline", international: true, indian: true },
        { name: "Email Integration", international: true, indian: true },
        { name: "Mobile App", international: true, indian: true },
        { name: "Workflow Automation", international: true, indian: true },
        { name: "Advanced Analytics", international: true, indian: true },
        { name: "Data Storage in India", international: false, indian: true },
        { name: "Local Customer Support", international: false, indian: true },
        { name: "Cost Effective Pricing", international: false, indian: true },
        { name: "No Vendor Lock-in", international: false, indian: true }
      ]
    },
    benefits: [
      {
        title: "Cost Savings",
        description: "Save up to 60% on licensing costs compared to Salesforce",
        icon: "TrendingUp"
      },
      {
        title: "Data Sovereignty",
        description: "Keep your customer data secure in Indian data centers",
        icon: "Shield"
      },
      {
        title: "Local Support",
        description: "Get support in Indian languages and time zones",
        icon: "Users"
      },
      {
        title: "Economic Impact",
        description: "Support Indian economy and job creation",
        icon: "Flag"
      }
    ]
  },
  {
    slug: "zoom-vs-jiomeet",
    internationalTool: {
      name: "Zoom",
      description: "Video conferencing platform for meetings, webinars, and collaboration",
      category: "Video Conferencing",
      logo: "https://zoom.us/favicon.ico",
      website: "https://zoom.us",
      popularity: "Most popular video conferencing tool"
    },
    indianAlternatives: [
      {
        name: "JioMeet",
        company: "Jio Platforms",
        location: "Mumbai",
        description: "Video conferencing platform with HD video calls and screen sharing",
        website: "https://jiomeet.jio.com/",
        pricing: "Free",
        features: [
          "HD Video Conferencing",
          "Screen Sharing",
          "Recording & Playback",
          "Chat Messaging",
          "Meeting Scheduling",
          "Mobile & Desktop Apps"
        ],
        advantages: [
          "Completely free to use",
          "No time limits on meetings",
          "Indian data centers",
          "Better connectivity in India"
        ]
      },
      {
        name: "Say Namaste",
        company: "Inscripts",
        location: "Mumbai",
        description: "Video calling platform made in India with focus on privacy",
        website: "https://saynamaste.com/",
        pricing: "Free",
        features: [
          "HD Video Calls",
          "Group Video Calling",
          "Screen Sharing",
          "Chat Integration",
          "No App Required",
          "Privacy Focused"
        ],
        advantages: [
          "Privacy-first approach",
          "No data sharing with foreign entities",
          "Works in browser",
          "Made for Indian users"
        ]
      }
    ],
    comparison: {
      features: [
        { name: "HD Video Quality", international: true, indian: true },
        { name: "Screen Sharing", international: true, indian: true },
        { name: "Meeting Recording", international: true, indian: true },
        { name: "Mobile Apps", international: true, indian: true },
        { name: "No Time Limits (Free)", international: false, indian: true },
        { name: "Data Stored in India", international: false, indian: true },
        { name: "No Privacy Concerns", international: false, indian: true },
        { name: "Better India Connectivity", international: false, indian: true }
      ]
    },
    benefits: [
      {
        title: "Zero Cost",
        description: "Completely free with no time limits or hidden charges",
        icon: "TrendingUp"
      },
      {
        title: "Data Privacy",
        description: "Your meeting data stays in India, not shared with foreign entities",
        icon: "Shield"
      },
      {
        title: "Better Performance",
        description: "Optimized for Indian networks and connectivity",
        icon: "Zap"
      },
      {
        title: "Support Local",
        description: "Support Indian companies and digital sovereignty",
        icon: "Flag"
      }
    ]
  },
  {
    slug: "microsoft-office-vs-zoho-workplace",
    internationalTool: {
      name: "Microsoft Office 365",
      description: "Productivity suite with Word, Excel, PowerPoint, and cloud services",
      category: "Productivity",
      logo: "https://www.microsoft.com/favicon.ico",
      website: "https://www.microsoft.com/microsoft-365",
      popularity: "Most widely used office suite globally"
    },
    indianAlternatives: [
      {
        name: "Zoho Workplace",
        company: "Zoho Corporation",
        location: "Chennai",
        description: "Complete suite of productivity and collaboration applications",
        website: "https://www.zoho.com/workplace/",
        pricing: "Freemium",
        features: [
          "Zoho Writer (Word processor)",
          "Zoho Sheet (Spreadsheet)",
          "Zoho Show (Presentations)",
          "Cloud Storage",
          "Email & Calendar",
          "Team Collaboration"
        ],
        advantages: [
          "Lower cost than Office 365",
          "No vendor lock-in",
          "Indian data centers",
          "Excellent customer support"
        ]
      }
    ],
    comparison: {
      features: [
        { name: "Word Processing", international: true, indian: true },
        { name: "Spreadsheets", international: true, indian: true },
        { name: "Presentations", international: true, indian: true },
        { name: "Cloud Storage", international: true, indian: true },
        { name: "Email Integration", international: true, indian: true },
        { name: "Mobile Apps", international: true, indian: true },
        { name: "Affordable Pricing", international: false, indian: true },
        { name: "Data in India", international: false, indian: true },
        { name: "No Vendor Lock-in", international: false, indian: true }
      ]
    },
    benefits: [
      {
        title: "Cost Effective",
        description: "Save significantly on licensing costs compared to Office 365",
        icon: "TrendingUp"
      },
      {
        title: "Data Control",
        description: "Keep your documents and data in Indian servers",
        icon: "Shield"
      },
      {
        title: "Local Support",
        description: "Get support from Indian teams in local languages",
        icon: "Users"
      },
      {
        title: "Independence",
        description: "Reduce dependency on foreign software giants",
        icon: "Flag"
      }
    ]
  }
]

export function getComparison(slug: string): ComparisonData | null {
  return comparisons.find(comp => comp.slug === slug) || null
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map(comp => comp.slug)
}

export function getAllComparisons(): ComparisonData[] {
  return comparisons
}