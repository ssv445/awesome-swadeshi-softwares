import type { Software, Category, Tag, Stats } from "./types"

export const categories: Category[] = [
  {
    id: "1",
    name: "Communication & Collaboration",
    slug: "communication",
    description: "Chat, video conferencing, and team collaboration tools",
    icon: "MessageSquare",
    color: "bg-blue-500",
    softwareCount: 12,
  },
  {
    id: "2",
    name: "Development Tools",
    slug: "development",
    description: "IDEs, code editors, and developer utilities",
    icon: "Code",
    color: "bg-green-500",
    softwareCount: 18,
  },
  {
    id: "3",
    name: "Business & Productivity",
    slug: "business",
    description: "CRM, project management, and business tools",
    icon: "Briefcase",
    color: "bg-purple-500",
    softwareCount: 15,
  },
  {
    id: "4",
    name: "Design & Creative",
    slug: "design",
    description: "Design tools, image editors, and creative software",
    icon: "Palette",
    color: "bg-pink-500",
    softwareCount: 8,
  },
  {
    id: "5",
    name: "Education & Learning",
    slug: "education",
    description: "E-learning platforms and educational tools",
    icon: "GraduationCap",
    color: "bg-orange-500",
    softwareCount: 10,
  },
  {
    id: "6",
    name: "Finance & Accounting",
    slug: "finance",
    description: "Accounting software, invoicing, and financial tools",
    icon: "Calculator",
    color: "bg-emerald-500",
    softwareCount: 7,
  },
]

export const tags: Tag[] = [
  { id: "1", name: "Open Source", slug: "open-source", color: "bg-green-100 text-green-800" },
  { id: "2", name: "SaaS", slug: "saas", color: "bg-blue-100 text-blue-800" },
  { id: "3", name: "Mobile App", slug: "mobile", color: "bg-purple-100 text-purple-800" },
  { id: "4", name: "Web App", slug: "web-app", color: "bg-indigo-100 text-indigo-800" },
  { id: "5", name: "AI/ML", slug: "ai-ml", color: "bg-red-100 text-red-800" },
  { id: "6", name: "Blockchain", slug: "blockchain", color: "bg-yellow-100 text-yellow-800" },
  { id: "7", name: "Cloud", slug: "cloud", color: "bg-cyan-100 text-cyan-800" },
  { id: "8", name: "Enterprise", slug: "enterprise", color: "bg-gray-100 text-gray-800" },
]

export const featuredSoftware: Software[] = [
  {
    id: "1",
    name: "Zoho Suite",
    description:
      "Complete business suite including CRM, email, office tools, and more. A comprehensive alternative to Google Workspace and Microsoft 365.",
    shortDescription: "Complete business suite for modern enterprises",
    website: "https://zoho.com",
    logo: "/placeholder.svg?height=60&width=60",
    screenshots: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    category: categories[2],
    tags: [tags[1], tags[3], tags[7]],
    alternatives: ["Google Workspace", "Microsoft 365", "Salesforce"],
    features: ["CRM", "Email", "Office Suite", "Project Management", "Analytics"],
    pricing: "Freemium",
    company: "Zoho Corporation",
    location: "Chennai, Tamil Nadu",
    founded: "1996",
    employees: "12,000+",
    verified: true,
    featured: true,
    downloads: 50000000,
    rating: 4.5,
    reviews: 25000,
    submittedAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    status: "approved",
  },
  {
    id: "2",
    name: "Freshworks",
    description:
      "Customer experience platform with CRM, helpdesk, and marketing automation. Indian alternative to Salesforce and HubSpot.",
    shortDescription: "Customer experience platform for growing businesses",
    website: "https://freshworks.com",
    logo: "/placeholder.svg?height=60&width=60",
    screenshots: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    category: categories[2],
    tags: [tags[1], tags[3], tags[7]],
    alternatives: ["Salesforce", "HubSpot", "Zendesk"],
    features: ["CRM", "Helpdesk", "Marketing Automation", "Analytics", "Integrations"],
    pricing: "Freemium",
    company: "Freshworks Inc.",
    location: "Chennai, Tamil Nadu",
    founded: "2010",
    employees: "5,000+",
    verified: true,
    featured: true,
    downloads: 25000000,
    rating: 4.4,
    reviews: 15000,
    submittedAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    status: "approved",
  },
  {
    id: "3",
    name: "Razorpay",
    description:
      "Complete payment solution for businesses in India. Alternative to Stripe and PayPal with local payment methods support.",
    shortDescription: "Complete payment solution for Indian businesses",
    website: "https://razorpay.com",
    logo: "/placeholder.svg?height=60&width=60",
    screenshots: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    category: categories[5],
    tags: [tags[1], tags[3], tags[4]],
    alternatives: ["Stripe", "PayPal", "Square"],
    features: ["Payment Gateway", "UPI", "Digital Wallet", "Invoicing", "Analytics"],
    pricing: "Paid",
    company: "Razorpay Software Pvt Ltd",
    location: "Bangalore, Karnataka",
    founded: "2014",
    employees: "3,000+",
    verified: true,
    featured: true,
    downloads: 15000000,
    rating: 4.6,
    reviews: 12000,
    submittedAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-19"),
    status: "approved",
  },
]

export const stats: Stats = {
  totalSoftware: 156,
  totalCategories: 6,
  totalCompanies: 89,
  totalDownloads: 125000000,
  featuredSoftware: 3,
}

// Mock function to simulate database queries
export const getSoftwareByCategory = (categorySlug: string): Software[] => {
  return featuredSoftware.filter((software) => software.category.slug === categorySlug)
}

export const getSoftwareByTag = (tagSlug: string): Software[] => {
  return featuredSoftware.filter((software) => software.tags.some((tag) => tag.slug === tagSlug))
}

export const searchSoftware = (query: string): Software[] => {
  const lowercaseQuery = query.toLowerCase()
  return featuredSoftware.filter(
    (software) =>
      software.name.toLowerCase().includes(lowercaseQuery) ||
      software.description.toLowerCase().includes(lowercaseQuery) ||
      software.alternatives.some((alt) => alt.toLowerCase().includes(lowercaseQuery)),
  )
}
