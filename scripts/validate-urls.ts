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
 * - Crawls all pages within the same base domain (e.g., treats www.example.com and example.com as same)
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
  invalidRoutesChecked: number
  invalidRoutesFailed: number
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
  validLinks: 0,
  invalidRoutesChecked: 0,
  invalidRoutesFailed: 0
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
 * Extract base domain from hostname (e.g., 'www.example.com' -> 'example.com')
 */
function getBaseDomain(hostname: string): string {
  const parts = hostname.split('.')

  // Handle localhost and IP addresses
  if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return hostname
  }

  // For domains with multiple parts, take the last two (domain.tld)
  // This handles: example.com, www.example.com, subdomain.example.com
  if (parts.length >= 2) {
    return parts.slice(-2).join('.')
  }

  return hostname
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
 * Check if URL belongs to the same base domain
 * This treats www.example.com and example.com as the same domain
 */
function isSameDomain(url: string, baseUrl: string): boolean {
  try {
    const urlObj = new URL(url)
    const baseObj = new URL(baseUrl)

    const urlBaseDomain = getBaseDomain(urlObj.hostname)
    const baseBaseDomain = getBaseDomain(baseObj.hostname)

    return urlBaseDomain === baseBaseDomain
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

    // Accept both HTML and XML content (for sitemaps)
    if (!contentType.includes('text/html') &&
        !contentType.includes('application/xml') &&
        !contentType.includes('text/xml')) {
      // Not HTML or XML, skip parsing but consider valid
      return { html: null, status: response.status }
    }

    const html = await response.text()
    return { html, status: response.status }
  } catch (error) {
    return { html: null, status: error instanceof Error ? error.message : 'Network error' }
  }
}

/**
 * Extract all links from HTML or XML sitemap
 */
function extractLinks(html: string, baseUrl: string, currentPage: string): string[] {
  const $ = load(html, { xmlMode: true })
  const links: string[] = []

  // Extract from <a> tags (HTML pages)
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href')
    if (href) {
      const resolvedUrl = resolveUrl(href, baseUrl, currentPage)
      if (resolvedUrl) {
        links.push(resolvedUrl)
      }
    }
  })

  // Extract from <loc> tags (XML sitemaps)
  $('loc').each((_, element) => {
    const loc = $(element).text().trim()
    if (loc) {
      const resolvedUrl = resolveUrl(loc, baseUrl, currentPage)
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
 * Generate invalid test routes that should return 404
 */
function generateInvalidRoutes(baseUrl: string): string[] {
  return [
    // Invalid root-level pages
    `${baseUrl}/nonexistent-page`,
    `${baseUrl}/fake-category`,
    `${baseUrl}/random-slug-12345`,

    // Invalid category routes
    `${baseUrl}/invalid-category`,
    `${baseUrl}/fake-business`,

    // Invalid app routes (valid category, invalid app)
    `${baseUrl}/business/fake-app-that-does-not-exist`,
    `${baseUrl}/finance/nonexistent-software`,
    `${baseUrl}/development/random-tool-xyz`,
    `${baseUrl}/communication/fake-messenger`,

    // Invalid alternative routes
    `${baseUrl}/alternatives/nonexistent-tool-12345`,
    `${baseUrl}/alternatives/fake-international-software`,
    `${baseUrl}/alternatives/random-product-xyz`,

    // Invalid purpose routes
    `${baseUrl}/fake-purpose-slug`,
    `${baseUrl}/nonexistent-app-type`,

    // Routes with special characters that were cleaned or old format
    `${baseUrl}/alternatives/disney+-hotstar`, // Old format with +
    `${baseUrl}/alternatives/mondaycom`,        // Old format without hyphen (should be monday-com)
    `${baseUrl}/alternatives/monday.com`,        // Old format without hyphen (should be monday-com)
    `${baseUrl}/alternatives/bookingcom`,       // Old format without hyphen (should be booking-com)
    `${baseUrl}/business/fake@app`,
    `${baseUrl}/finance/tool#invalid`,
  ]
}

/**
 * Test that invalid routes return 404
 */
async function testInvalidRoutes(baseUrl: string): Promise<void> {
  console.log('\n' + '='.repeat(60))
  console.log('🧪 Testing Invalid Routes (should return 404):')
  console.log('='.repeat(60) + '\n')

  const invalidRoutes = generateInvalidRoutes(baseUrl)
  const failedTests: Array<{ url: string; status: number | string }> = []

  for (const url of invalidRoutes) {
    stats.invalidRoutesChecked++
    console.log(`🧪 Testing: ${url}`)

    const { status } = await fetchUrl(url)

    if (typeof status === 'number' && status === 404) {
      console.log(`   ✅ Correctly returns 404\n`)
    } else {
      console.log(`   ❌ Expected 404, got: ${status}\n`)
      stats.invalidRoutesFailed++
      failedTests.push({ url, status })
    }
  }

  console.log('='.repeat(60))
  console.log('🧪 Invalid Route Test Results:')
  console.log('='.repeat(60))
  console.log(`   Total tests:             ${stats.invalidRoutesChecked}`)
  console.log(`   ✅ Passed (returned 404): ${stats.invalidRoutesChecked - stats.invalidRoutesFailed}`)
  console.log(`   ❌ Failed:                ${stats.invalidRoutesFailed}`)
  console.log('='.repeat(60))

  if (failedTests.length > 0) {
    console.log('\n❌ Failed Invalid Route Tests:\n')
    for (const test of failedTests) {
      console.log(`   ❌ ${test.url}`)
      console.log(`      Expected: 404`)
      console.log(`      Got: ${test.status}`)
      console.log('')
    }
  }
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
  }

  // Test invalid routes
  await testInvalidRoutes(baseUrl)

  // Final summary and exit
  console.log('\n' + '='.repeat(60))
  console.log('🏁 Final Results:')
  console.log('='.repeat(60))
  console.log(`   Valid pages crawled:          ${stats.validLinks}`)
  console.log(`   Broken links found:           ${stats.brokenLinks.length}`)
  console.log(`   Invalid route tests passed:   ${stats.invalidRoutesChecked - stats.invalidRoutesFailed}`)
  console.log(`   Invalid route tests failed:   ${stats.invalidRoutesFailed}`)
  console.log('='.repeat(60) + '\n')

  const hasErrors = stats.brokenLinks.length > 0 || stats.invalidRoutesFailed > 0

  if (hasErrors) {
    console.log('❌ Validation failed! Please fix the issues above.\n')
    process.exit(1)
  } else {
    console.log('✅ All validation checks passed!\n')
  }
}

// Parse arguments and start crawling
const { startUrl } = parseArgs()
crawl(startUrl).catch(error => {
  console.error('\n❌ Crawler error:', error)
  process.exit(1)
})
