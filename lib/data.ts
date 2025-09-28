export interface Software {
  name: string
  description: string
  website: string
  category: string
  alternatives: string[]
  pricing: string
  company: string
  location: string
}

// Convert category slug to display name (client-safe utility)
export function getCategoryDisplayName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}