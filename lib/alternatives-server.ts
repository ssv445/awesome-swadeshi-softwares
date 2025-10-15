import fs from 'fs'
import path from 'path'
import { Software } from './data'
import acquiredCompaniesData from '@/data/acquired-companies.json'

export interface AlternativeMapping {
  slug: string
  internationalTool: {
    name: string
    description: string
    category: string
    icon: string
    color: string
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
    faviconUrl?: string // Optional custom favicon URL
    categorySlug: string // Category slug for app detail page URL
    slug: string // App slug for detail page URL
  }[]
  benefits: {
    title: string
    description: string
    icon: string
  }[]
  comparison?: {
    feature: string
    indian: boolean | string
    international: boolean | string
  }[]
}

// Icon mapping for international tools
const internationalToolIcons: Record<string, string> = {
  'Linktree': 'LinkIcon',
  'Zoom': 'Video',
  'Google Meet': 'Video',
  'Microsoft Teams': 'Video',
  'Canva': 'Palette',
  'Adobe Creative Suite': 'Palette',
  'Figma': 'Palette',
  'HubSpot': 'Target',
  'MailChimp': 'Mail',
  'Miro': 'Palette',
  'Intercom': 'MessageSquare',
  'SEMrush': 'Target',
  'Datadog': 'Shield',
  'DocuSign': 'CheckCircle',
  'Eventbrite': 'Crown',
  'SurveyMonkey': 'Target',
  'Dropbox': 'Cloud',
  'Google Drive': 'Cloud',
  'Asana': 'Target',
  'Grammarly': 'CheckCircle',
  'Slack': 'MessageSquare',
  'Trello': 'Target',
  'Zendesk': 'MessageSquare',
  'Zendesk Chat': 'MessageSquare',
  'Help Scout': 'MessageSquare'
}

// Category mapping for international tools
const internationalToolCategories: Record<string, string> = {
  'Linktree': 'Social Media Tools',
  'Zoom': 'Communication',
  'Google Meet': 'Communication',
  'Microsoft Teams': 'Communication',
  'Canva': 'Design',
  'Adobe Creative Suite': 'Design',
  'Figma': 'Design',
  'HubSpot': 'Marketing & CRM',
  'MailChimp': 'Email Marketing',
  'Miro': 'Collaboration',
  'Intercom': 'Customer Support',
  'SEMrush': 'Digital Marketing',
  'Datadog': 'DevOps & Monitoring',
  'DocuSign': 'Document Management',
  'Eventbrite': 'Event Management',
  'SurveyMonkey': 'Survey & Analytics',
  'Dropbox': 'Cloud Storage',
  'Google Drive': 'Cloud Storage',
  'Asana': 'Project Management',
  'Grammarly': 'Writing Tools',
  'Slack': 'Communication',
  'Trello': 'Project Management',
  'Zendesk': 'Customer Support',
  'Zendesk Chat': 'Customer Support',
  'Help Scout': 'Customer Support'
}

// Tool descriptions
const internationalToolDescriptions: Record<string, string> = {
  'Linktree': 'Link-in-bio tool for social media profiles',
  'Zoom': 'Video conferencing and online meeting platform',
  'Google Meet': 'Video conferencing platform by Google',
  'Microsoft Teams': 'Business communication platform',
  'Canva': 'Graphic design platform for creating visual content',
  'Adobe Creative Suite': 'Professional design and creative software suite',
  'Figma': 'Collaborative interface design tool',
  'HubSpot': 'Inbound marketing, sales, and service platform',
  'MailChimp': 'Email marketing automation platform',
  'Miro': 'Online collaborative whiteboard platform for visual collaboration',
  'Intercom': 'Customer messaging platform for sales, marketing and support',
  'SEMrush': 'SEO and digital marketing toolkit for online visibility',
  'Datadog': 'Monitoring and analytics platform for cloud applications',
  'DocuSign': 'Electronic signature and digital transaction management platform',
  'Eventbrite': 'Event management and ticketing platform',
  'SurveyMonkey': 'Online survey development and data collection platform',
  'Dropbox': 'Cloud storage and file synchronization service',
  'Google Drive': 'Cloud storage and collaboration platform',
  'Asana': 'Project management and team collaboration platform',
  'Grammarly': 'AI-powered writing assistant for grammar and style checking',
  'Slack': 'Business communication and collaboration platform',
  'Trello': 'Visual project management tool with boards and cards',
  'Zendesk': 'Customer service and support ticket management platform',
  'Zendesk Chat': 'Live chat and customer messaging platform',
  'Help Scout': 'Customer service and help desk software'
}

// Default benefits for different categories
const getDefaultBenefits = () => {
  const commonBenefits = [
    {
      title: "Made in India",
      description: "Built by Indian talent understanding local business needs",
      icon: "Crown"
    },
    {
      title: "Data Sovereignty",
      description: "Your data stays within Indian borders for better privacy and compliance",
      icon: "Shield"
    },
    {
      title: "Local Support",
      description: "Customer support in Indian time zones with cultural understanding",
      icon: "Users"
    }
  ]

  return commonBenefits
}

export function getAllSoftware(): Software[] {
  const categoriesDir = path.join(process.cwd(), 'data', 'categories')
  const allSoftware: Software[] = []

  function readDirectory(dir: string) {
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const itemPath = path.join(dir, item)
      const stat = fs.statSync(itemPath)

      if (stat.isDirectory()) {
        readDirectory(itemPath)
      } else if (item.endsWith('.json')) {
        try {
          const content = fs.readFileSync(itemPath, 'utf-8')
          const software = JSON.parse(content) as Software
          allSoftware.push(software)
        } catch (error) {
          console.warn(`Error reading ${itemPath}:`, error)
        }
      }
    }
  }

  readDirectory(categoriesDir)
  return allSoftware
}

export function generateAlternativesMapping(): AlternativeMapping[] {
  const allSoftware = getAllSoftware()
  const alternativesMap = new Map<string, Software[]>()

  // Build inverted index: international tool -> Indian alternatives
  allSoftware.forEach(software => {
    // Ensure alternatives is an array
    if (software.alternatives && Array.isArray(software.alternatives)) {
      software.alternatives.forEach(alternative => {
        if (!alternativesMap.has(alternative)) {
          alternativesMap.set(alternative, [])
        }
        alternativesMap.get(alternative)!.push(software)
      })
    }
  })

  // Add acquired companies as alternatives with empty Indian alternatives
  acquiredCompaniesData.companies.forEach(company => {
    const companyName = company.name
    if (!alternativesMap.has(companyName)) {
      alternativesMap.set(companyName, [])
    }
  })

  // Convert to AlternativeMapping format
  const mappings: AlternativeMapping[] = []

  alternativesMap.forEach((indianAlternatives, internationalTool) => {
    const slug = `${internationalTool.toLowerCase().replace(/\s+/g, '-')}`
    const category = internationalToolCategories[internationalTool] || 'Software'

    const mapping: AlternativeMapping = {
      slug,
      internationalTool: {
        name: internationalTool,
        description: internationalToolDescriptions[internationalTool] || `${internationalTool} software solution`,
        category,
        icon: internationalToolIcons[internationalTool] || 'AshokaChakra',
        color: 'blue'
      },
      indianAlternatives: indianAlternatives.map(software => ({
        name: software.name,
        company: software.company,
        location: software.location,
        description: software.description,
        website: software.website,
        pricing: software.pricing,
        features: [], // Could be enhanced by adding features field to JSON
        advantages: [
          "Made in India",
          "Local customer support",
          "Better pricing for Indian market",
          "Cultural understanding"
        ],
        categorySlug: software.category,
        slug: software.slug
      })),
      benefits: getDefaultBenefits()
    }

    mappings.push(mapping)
  })

  return mappings.sort((a, b) => a.internationalTool.name.localeCompare(b.internationalTool.name))
}

export function getAlternativeBySlug(slug: string): AlternativeMapping | undefined {
  const mappings = generateAlternativesMapping()
  return mappings.find(mapping => mapping.slug === slug)
}

export function getAllAlternativeSlugs(): string[] {
  const mappings = generateAlternativesMapping()
  return mappings.map(mapping => mapping.slug)
}

export function getAllAlternatives(): AlternativeMapping[] {
  return generateAlternativesMapping()
}