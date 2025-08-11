export interface Software {
  id: string
  name: string
  description: string
  shortDescription: string
  website: string
  github?: string
  logo?: string
  screenshots: string[]
  category: Category
  tags: Tag[]
  alternatives: string[] // Names of non-Indian software this replaces
  features: string[]
  pricing: "Free" | "Freemium" | "Paid" | "Open Source"
  company: string
  location: string // Indian city/state
  founded: string
  employees?: string
  verified: boolean
  featured: boolean
  downloads?: number
  rating: number
  reviews: number
  submittedBy?: string
  submittedAt: Date
  updatedAt: Date
  status: "pending" | "approved" | "rejected"
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  softwareCount: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  color: string
}

export interface Submission {
  id: string
  software: Omit<Software, "id" | "verified" | "featured" | "status" | "submittedAt" | "updatedAt">
  submitterName: string
  submitterEmail: string
  submitterRole: string
  additionalNotes?: string
  status: "pending" | "approved" | "rejected"
  submittedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
  reviewNotes?: string
}

export interface Stats {
  totalSoftware: number
  totalCategories: number
  totalCompanies: number
  totalDownloads: number
  featuredSoftware: number
}
