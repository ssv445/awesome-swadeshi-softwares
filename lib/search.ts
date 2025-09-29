"use client"

/**
 * Client-side search utilities using pre-built search index
 */

import { SEARCH_MIN_LENGTH } from './constants'

interface SearchIndexEntry {
  id: string
  name: string
  company: string
  description: string
  category: string
  alternatives: string[]
  website: string
  pricing: string
  location: string
  faviconUrl?: string
  nameTokens: string[]
  descriptionTokens: string[]
  alternativesTokens: string[]
  companyTokens: string[]
  allTokens: string[]
  slug: string
}

interface SearchIndex {
  entries: SearchIndexEntry[]
  meta: {
    totalEntries: number
    categories: string[]
    generatedAt: string
    version: string
  }
}

interface SearchResult {
  entry: SearchIndexEntry
  score: number
  matchType: 'exact' | 'partial' | 'fuzzy'
  matchedFields: string[]
}

let searchIndex: SearchIndex | null = null
let indexPromise: Promise<SearchIndex> | null = null

/**
 * Load search index from static file
 */
async function loadSearchIndex(): Promise<SearchIndex> {
  if (searchIndex) {
    return searchIndex
  }

  if (indexPromise) {
    return indexPromise
  }

  indexPromise = fetch('/search-index.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load search index: ${response.status}`)
      }
      return response.json()
    })
    .then((data: SearchIndex) => {
      searchIndex = data
      console.log(`🔍 Loaded search index with ${data.entries.length} entries`)
      return data
    })
    .catch(error => {
      console.error('Error loading search index:', error)
      indexPromise = null
      throw error
    })

  return indexPromise
}

/**
 * Calculate search score for an entry
 */
function calculateScore(entry: SearchIndexEntry, query: string): {
  score: number
  matchType: 'exact' | 'partial' | 'fuzzy'
  matchedFields: string[]
} {
  const queryLower = query.toLowerCase()
  const queryTokens = queryLower.split(/\s+/).filter(token => token.length > 0)

  let score = 0
  let matchType: 'exact' | 'partial' | 'fuzzy' = 'fuzzy'
  const matchedFields: string[] = []

  // Exact name match (highest priority)
  if (entry.name.toLowerCase() === queryLower) {
    score += 1000
    matchType = 'exact'
    matchedFields.push('name')
  }
  // Partial name match
  else if (entry.name.toLowerCase().includes(queryLower)) {
    score += 500
    matchType = 'partial'
    matchedFields.push('name')
  }
  // Name starts with query
  else if (entry.name.toLowerCase().startsWith(queryLower)) {
    score += 300
    matchType = 'partial'
    matchedFields.push('name')
  }

  // Company exact match
  if (entry.company.toLowerCase() === queryLower) {
    score += 200
    matchedFields.push('company')
  }
  // Company partial match
  else if (entry.company.toLowerCase().includes(queryLower)) {
    score += 100
    matchedFields.push('company')
  }

  // Alternative exact match
  const exactAltMatch = entry.alternatives.some(alt =>
    alt.toLowerCase() === queryLower
  )
  if (exactAltMatch) {
    score += 150
    matchedFields.push('alternatives')
  }
  // Alternative partial match
  else {
    const partialAltMatch = entry.alternatives.some(alt =>
      alt.toLowerCase().includes(queryLower)
    )
    if (partialAltMatch) {
      score += 75
      matchedFields.push('alternatives')
    }
  }

  // Description match
  if (entry.description.toLowerCase().includes(queryLower)) {
    score += 25
    matchedFields.push('description')
  }

  // Token-based matching
  queryTokens.forEach(token => {
    if (entry.nameTokens.includes(token)) {
      score += 50
    }
    if (entry.companyTokens.includes(token)) {
      score += 25
    }
    if (entry.alternativesTokens.includes(token)) {
      score += 30
    }
    if (entry.descriptionTokens.includes(token)) {
      score += 10
    }
  })

  // Fuzzy matching using n-grams (for typos)
  const queryNgrams = generateNgrams(queryLower, 3)
  const entryNgrams = [
    ...generateNgrams(entry.name.toLowerCase(), 3),
    ...generateNgrams(entry.company.toLowerCase(), 3)
  ]

  const ngramMatches = queryNgrams.filter(ngram => entryNgrams.includes(ngram))
  if (ngramMatches.length > 0) {
    score += ngramMatches.length * 2
    if (matchType === 'fuzzy' && score > 0) {
      matchType = 'fuzzy'
    }
  }

  return { score, matchType, matchedFields }
}

/**
 * Generate n-grams for fuzzy matching
 */
function generateNgrams(text: string, n: number = 3): string[] {
  const ngrams: string[] = []
  const clean = text.replace(/[^\w]/g, '')

  for (let i = 0; i <= clean.length - n; i++) {
    ngrams.push(clean.slice(i, i + n))
  }

  return ngrams
}

/**
 * Search through the index
 */
export async function searchApps(
  query: string,
  options: {
    limit?: number
    categories?: string[]
    minScore?: number
  } = {}
): Promise<SearchResult[]> {
  const {
    limit = 20,
    categories = [],
    minScore = 1
  } = options

  // Validate query
  if (!query || query.trim().length < SEARCH_MIN_LENGTH) {
    return []
  }

  const trimmedQuery = query.trim()

  try {
    const index = await loadSearchIndex()

    // Filter by categories if specified
    let entries = index.entries
    if (categories.length > 0) {
      entries = entries.filter(entry =>
        categories.includes(entry.category.toLowerCase().replace(/\s+/g, '-'))
      )
    }

    // Calculate scores for all entries
    const results: SearchResult[] = entries
      .map(entry => {
        const { score, matchType, matchedFields } = calculateScore(entry, trimmedQuery)

        return {
          entry,
          score,
          matchType,
          matchedFields
        }
      })
      .filter(result => result.score >= minScore)
      .sort((a, b) => {
        // Sort by score descending, then by match type, then by name
        if (b.score !== a.score) {
          return b.score - a.score
        }

        const matchTypeOrder = { exact: 3, partial: 2, fuzzy: 1 }
        if (matchTypeOrder[b.matchType] !== matchTypeOrder[a.matchType]) {
          return matchTypeOrder[b.matchType] - matchTypeOrder[a.matchType]
        }

        return a.entry.name.localeCompare(b.entry.name)
      })
      .slice(0, limit)

    return results

  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}

/**
 * Get search suggestions (autocomplete)
 */
export async function getSearchSuggestions(
  query: string,
  limit: number = 8
): Promise<string[]> {
  if (!query || query.trim().length < 2) {
    return []
  }

  try {
    const results = await searchApps(query, { limit: limit * 2 })

    const suggestions = new Set<string>()

    results.forEach(result => {
      // Add app name
      suggestions.add(result.entry.name)

      // Add company name if it matches
      if (result.matchedFields.includes('company')) {
        suggestions.add(result.entry.company)
      }

      // Add alternatives if they match
      if (result.matchedFields.includes('alternatives')) {
        result.entry.alternatives.forEach(alt => {
          if (alt.toLowerCase().includes(query.toLowerCase())) {
            suggestions.add(alt)
          }
        })
      }
    })

    return Array.from(suggestions).slice(0, limit)

  } catch (error) {
    console.error('Suggestions error:', error)
    return []
  }
}

/**
 * Get popular search terms from index
 */
export async function getPopularSearchTerms(limit: number = 10): Promise<string[]> {
  try {
    const index = await loadSearchIndex()

    // Get most common alternatives (what people search for)
    const alternativeCounts = new Map<string, number>()

    index.entries.forEach(entry => {
      entry.alternatives.forEach(alt => {
        alternativeCounts.set(alt, (alternativeCounts.get(alt) || 0) + 1)
      })
    })

    return Array.from(alternativeCounts.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([term]) => term)

  } catch (error) {
    console.error('Popular terms error:', error)
    return []
  }
}

/**
 * Preload search index (call this on app startup)
 */
export function preloadSearchIndex(): Promise<SearchIndex> {
  return loadSearchIndex()
}

// Export types for use in components
export type { SearchResult, SearchIndexEntry }