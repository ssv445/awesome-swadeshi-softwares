#!/usr/bin/env node

/**
 * Simple URL Crawler for Link Validation
 *
 * Usage:
 *   pnpm validate:urls --url=http://localhost:3000
 *
 * Features:
 * - Takes start URL as input
 * - Validates start URL before crawling
 * - Crawls all pages within the same domain
 * - Tracks visited URLs to avoid duplicates
 * - Reports broken internal links
 * - Continues until no new links are found
 */

import { load } from 'cheerio'

interface CrawlStats {
  totalPages: number
  totalLinks: number
  brokenLinks: BrokenLink[]
  validLinks: number
}

interface BrokenLink {
  page: string
  link: string
  status: number | string
}

const stats: CrawlStats = {
  totalPages: 0,
  totalLinks: 0,
  brokenLinks: [],
  validLinks: 0
}

// Tracks visited URLs to avoid duplicates
const visitedUrls = new Set<string>()
// Queue of URLs to crawl
const urlQueue: string[] = []

/**
 * Parse command line arguments
 */
function parseArgs(): { startUrl: string } {
  const args = process.argv.slice(2)
  const urlArg = args.find(arg => arg.startsWith('--url='))

  if (!urlArg) {
    console.error('❌ Error: Missing required --url parameter')
    console.error('\nUsage:')
    console.error('  pnpm validate:urls --url=http://localhost:3000')
    console.error('  pnpm validate:urls --url=https://swadeshiapps.com\n')
    process.exit(1)
  }

  const startUrl = urlArg.replace('--url=', '')
  return { startUrl }
}

/**
 * Get base URL from full URL
 */
function getBaseUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return `${urlObj.protocol}//${urlObj.host}`
  } catch {
    return ''
  }
}

/**
 * Normalize URL (remove trailing slash, query params, anchors)
 */
function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    // Remove query params and hash
    urlObj.search = ''
    urlObj.hash = ''
    let normalized = urlObj.toString()
    // Remove trailing slash (except for root)
    if (normalized.endsWith('/') && normalized !== getBaseUrl(normalized) + '/') {
      normalized = normalized.slice(0, -1)
    }
    return normalized
  } catch {
    return url
  }
}

/**
 * Check if URL belongs to the same domain
 */
function isSameDomain(url: string, baseUrl: string): boolean {
  try {
    const urlObj = new URL(url)
    const baseObj = new URL(baseUrl)
    return urlObj.host === baseObj.host
  } catch {
    return false
  }
}

/**
 * Resolve relative URL to absolute URL
 */
function resolveUrl(url: string, baseUrl: string, currentPage: string): string | null {
  // Skip anchor links
  if (url.startsWith('#')) return null

  // Skip mailto, tel, etc.
  if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('javascript:')) return null

  try {
    // If already absolute URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return isSameDomain(url, baseUrl) ? normalizeUrl(url) : null
    }

    // Resolve relative URLs
    const currentPageUrl = new URL(currentPage)
    const resolved = new URL(url, currentPageUrl.toString())

    // Only return if same domain
    return isSameDomain(resolved.toString(), baseUrl) ? normalizeUrl(resolved.toString()) : null
  } catch {
    return null
  }
}

/**
 * Fetch URL and return HTML or error
 */
async function fetchUrl(url: string): Promise<{ html: string | null; status: number | string }> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'URL-Validator-Bot/1.0'
      }
    })

    if (!response.ok) {
      return { html: null, status: response.status }
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text/html')) {
      // Not HTML, skip parsing but consider valid
      return { html: null, status: response.status }
    }

    const html = await response.text()
    return { html, status: response.status }
  } catch (error) {
    return { html: null, status: error instanceof Error ? error.message : 'Network error' }
  }
}

/**
 * Extract all links from HTML
 */
function extractLinks(html: string, baseUrl: string, currentPage: string): string[] {
  const $ = load(html)
  const links: string[] = []

  $('a[href]').each((_, element) => {
    const href = $(element).attr('href')
    if (href) {
      const resolvedUrl = resolveUrl(href, baseUrl, currentPage)
      if (resolvedUrl) {
        links.push(resolvedUrl)
      }
    }
  })

  return links
}

/**
 * Crawl a single URL
 */
async function crawlUrl(url: string, baseUrl: string): Promise<void> {
  // Skip if already visited
  if (visitedUrls.has(url)) {
    return
  }

  visitedUrls.add(url)
  stats.totalPages++

  console.log(`📄 Crawling [${stats.totalPages}]: ${url}`)

  const { html, status } = await fetchUrl(url)

  // If page failed to load, mark as broken
  if (!html && typeof status !== 'number') {
    stats.brokenLinks.push({
      page: 'N/A',
      link: url,
      status
    })
    console.log(`   ❌ Failed to load: ${status}`)
    return
  }

  // If got HTTP error status, mark as broken
  if (typeof status === 'number' && status >= 400) {
    stats.brokenLinks.push({
      page: 'N/A',
      link: url,
      status
    })
    console.log(`   ❌ HTTP ${status}`)
    return
  }

  // If no HTML (e.g., PDF, image), skip link extraction
  if (!html) {
    stats.validLinks++
    return
  }

  // Extract links from HTML
  const links = extractLinks(html, baseUrl, url)

  console.log(`   ✅ Found ${links.length} internal link(s)`)

  // Add new links to queue
  for (const link of links) {
    stats.totalLinks++
    if (!visitedUrls.has(link) && !urlQueue.includes(link)) {
      urlQueue.push(link)
    }
  }

  stats.validLinks++
}

/**
 * Main crawler function
 */
async function crawl(startUrl: string): Promise<void> {
  console.log('🔍 Simple URL Crawler')
  console.log('=' .repeat(60))
  console.log(`Start URL: ${startUrl}`)
  console.log('=' .repeat(60) + '\n')

  const baseUrl = getBaseUrl(startUrl)

  // Validate start URL
  console.log('⏳ Validating start URL...\n')
  const { html, status } = await fetchUrl(startUrl)

  if (!html && typeof status !== 'number') {
    console.error(`❌ Start URL is not reachable: ${status}`)
    console.error('\nPlease ensure:')
    console.error('  1. The URL is correct')
    console.error('  2. The server is running (if localhost)')
    console.error('  3. The domain is accessible\n')
    process.exit(1)
  }

  if (typeof status === 'number' && status >= 400) {
    console.error(`❌ Start URL returned HTTP ${status}`)
    console.error('\nThe start URL is not accessible.\n')
    process.exit(1)
  }

  console.log(`✅ Start URL is valid (HTTP ${status})\n`)

  // Add start URL to queue
  urlQueue.push(normalizeUrl(startUrl))

  // Crawl until queue is empty
  while (urlQueue.length > 0) {
    const url = urlQueue.shift()!
    await crawlUrl(url, baseUrl)
  }

  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Crawl Summary:')
  console.log('='.repeat(60))
  console.log(`   Total pages crawled:     ${stats.totalPages}`)
  console.log(`   Total internal links:    ${stats.totalLinks}`)
  console.log(`   ✅ Valid pages:           ${stats.validLinks}`)
  console.log(`   ❌ Broken links:          ${stats.brokenLinks.length}`)
  console.log('='.repeat(60))

  if (stats.brokenLinks.length > 0) {
    console.log('\n❌ Broken Links Report:\n')

    for (const broken of stats.brokenLinks) {
      console.log(`   ❌ ${broken.link}`)
      console.log(`      Status: ${broken.status}`)
      console.log('')
    }

    console.log('⚠️  Crawl completed with broken links found!')
    process.exit(1)
  } else {
    console.log('\n✅ All internal links are valid!\n')
  }
}

// Parse arguments and start crawling
const { startUrl } = parseArgs()
crawl(startUrl).catch(error => {
  console.error('\n❌ Crawler error:', error)
  process.exit(1)
})
