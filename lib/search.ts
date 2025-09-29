"use client"

/**
 * Client-side search utilities using pre-built search index
 */

import { SEARCH_MIN_LENGTH } from './constants'

interface SearchIndexEntry {
  id: string
  name: string
  company: string
  category: string
  slug: string
  searchTerms: string
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
 * Calculate search score for an entry (simplified)
 */
function calculateScore(entry: SearchIndexEntry, query: string): {
  score: number
  matchType: 'exact' | 'partial' | 'fuzzy'
  matchedFields: string[]
} {
  const queryLower = query.toLowerCase()
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

  // General search terms match
  if (entry.searchTerms.includes(queryLower)) {
    score += 50
    matchedFields.push('searchTerms')
  }

  // Partial matches in search terms
  const queryWords = queryLower.split(' ')
  queryWords.forEach(word => {
    if (word.length > 2 && entry.searchTerms.includes(word)) {
      score += 10
    }
  })

  return { score, matchType, matchedFields }
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

    // Get most common company names and app names
    const termCounts = new Map<string, number>()

    index.entries.forEach(entry => {
      // Count app names
      termCounts.set(entry.name, (termCounts.get(entry.name) || 0) + 1)
      // Count company names
      termCounts.set(entry.company, (termCounts.get(entry.company) || 0) + 1)
    })

    return Array.from(termCounts.entries())
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