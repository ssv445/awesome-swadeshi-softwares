#!/usr/bin/env tsx

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as cheerio from 'cheerio'

// Get current directory (for ES modules)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PROJECT_ROOT = join(__dirname, '..')
const DATA_DIR = join(PROJECT_ROOT, 'data')
const TRACKER_FILE = join(__dirname, 'crawl-tracker.json')

// Interfaces for crawl tracking
interface CrawlItem {
  file: string
  url: string
  status: 'pending' | 'completed' | 'failed' | 'skipped'
  last_attempt?: string
  error?: string
  retries: number
}

interface CrawlTracker {
  session_started: string
  total_files: number
  completed: number
  failed: number
  skipped: number
  queue: CrawlItem[]
}

interface OpenGraphData {
  [key: string]: string | string[] | undefined
  last_updated: string
  app_store_url?: string
  play_store_url?: string
}

// Configuration
const CONFIG = {
  REQUEST_DELAY: 2000, // 2 seconds between requests
  MAX_RETRIES: 3,
  MAX_AGE_DAYS: 30,
  TIMEOUT: 10000, // 10 second timeout
}

// Command line arguments
const args = process.argv.slice(2)
const FORCE_RESCRAPE = args.includes('--force')
const RESUME_SESSION = args.includes('--resume')
const DRY_RUN = args.includes('--dry-run')
const SINGLE_URL = args.find(arg => arg.startsWith('--url='))?.split('=')[1]
const MAX_AGE = parseInt(args.find(arg => arg.startsWith('--max-age='))?.split('=')[1] || '30')

// Utility functions
function log(message: string, type: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const colors = {
    info: '\x1b[36m',    // cyan
    success: '\x1b[32m', // green
    error: '\x1b[31m',   // red
    warn: '\x1b[33m',    // yellow
  }
  const reset = '\x1b[0m'
  const timestamp = new Date().toISOString().slice(11, 19)
  console.log(`${colors[type]}[${timestamp}] ${message}${reset}`)
}

function loadTracker(): CrawlTracker {
  if (existsSync(TRACKER_FILE) && RESUME_SESSION) {
    try {
      const data = readFileSync(TRACKER_FILE, 'utf-8')
      const tracker = JSON.parse(data) as CrawlTracker
      log(`Resuming session started at ${tracker.session_started}`, 'info')
      return tracker
    } catch (error) {
      log(`Failed to load tracker file: ${error}`, 'warn')
    }
  }

  // Create new tracker
  return {
    session_started: new Date().toISOString(),
    total_files: 0,
    completed: 0,
    failed: 0,
    skipped: 0,
    queue: []
  }
}

function saveTracker(tracker: CrawlTracker) {
  try {
    writeFileSync(TRACKER_FILE, JSON.stringify(tracker, null, 2))
  } catch (error) {
    log(`Failed to save tracker: ${error}`, 'error')
  }
}

function getAllJsonFiles(dir: string, basePath: string = ''): string[] {
  const files: string[] = []
  const items = readdirSync(dir)

  for (const item of items) {
    const fullPath = join(dir, item)
    const relativePath = join(basePath, item)

    if (statSync(fullPath).isDirectory()) {
      files.push(...getAllJsonFiles(fullPath, relativePath))
    } else if (item.endsWith('.json')) {
      files.push(relativePath)
    }
  }

  return files
}

function shouldScrapeFile(filePath: string): { should: boolean; reason: string } {
  if (FORCE_RESCRAPE) {
    return { should: true, reason: 'force flag enabled' }
  }

  try {
    const fullPath = join(DATA_DIR, filePath)
    const content = readFileSync(fullPath, 'utf-8')
    const data = JSON.parse(content)

    if (!data.opengraph) {
      return { should: true, reason: 'no opengraph data' }
    }

    if (!data.opengraph.last_updated) {
      return { should: true, reason: 'no timestamp' }
    }

    const lastUpdated = new Date(data.opengraph.last_updated)
    const daysSinceUpdate = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24)

    if (daysSinceUpdate > MAX_AGE) {
      return { should: true, reason: `data is ${Math.round(daysSinceUpdate)} days old` }
    }

    return { should: false, reason: `data is recent (${Math.round(daysSinceUpdate)} days old)` }
  } catch (error) {
    return { should: true, reason: `failed to check existing data: ${error}` }
  }
}

function buildQueue(tracker: CrawlTracker): CrawlTracker {
  log('Building crawl queue...', 'info')

  const allFiles = getAllJsonFiles(DATA_DIR)
  const newQueue: CrawlItem[] = []

  for (const file of allFiles) {
    try {
      const fullPath = join(DATA_DIR, file)
      const content = readFileSync(fullPath, 'utf-8')
      const data = JSON.parse(content)

      if (!data.website) {
        log(`Skipping ${file}: no website URL`, 'warn')
        continue
      }

      // Check if item already exists in queue
      const existingItem = tracker.queue.find(item => item.file === file)

      if (existingItem) {
        // Keep existing item status unless force flag
        if (FORCE_RESCRAPE && existingItem.status !== 'pending') {
          existingItem.status = 'pending'
          existingItem.retries = 0
          existingItem.error = undefined
        }
        newQueue.push(existingItem)
        continue
      }

      // Check if we should scrape this file
      const { should, reason } = shouldScrapeFile(file)

      const item: CrawlItem = {
        file,
        url: data.website,
        status: should ? 'pending' : 'skipped',
        retries: 0
      }

      if (!should) {
        log(`Skipping ${file}: ${reason}`, 'info')
        tracker.skipped++
      }

      newQueue.push(item)
    } catch (error) {
      log(`Error processing ${file}: ${error}`, 'error')
    }
  }

  tracker.queue = newQueue
  tracker.total_files = newQueue.length

  const pendingCount = newQueue.filter(item => item.status === 'pending').length
  log(`Queue built: ${pendingCount} pending, ${tracker.skipped} skipped, ${tracker.total_files} total`, 'info')

  return tracker
}

async function fetchOpenGraphData(url: string): Promise<OpenGraphData> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT)

  try {
    log(`Fetching: ${url}`, 'info')

    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow', // Explicitly follow redirects (default behavior)
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AwesomeSwadeshiBot/1.0; +https://github.com/awesome-swadeshi-softwares)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      }
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    // Log if URL was redirected
    if (response.url !== url) {
      log(`  ↳ Redirected to: ${response.url}`, 'info')
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    const openGraphData: OpenGraphData = {
      last_updated: new Date().toISOString()
    }

    // Extract OpenGraph tags
    $('meta[property^="og:"]').each((_, element) => {
      const property = $(element).attr('property')?.replace('og:', '')
      const content = $(element).attr('content')
      if (property && content) {
        openGraphData[property] = content.trim()
      }
    })

    // Extract Twitter Card tags
    $('meta[name^="twitter:"]').each((_, element) => {
      const name = $(element).attr('name')?.replace('twitter:', 'twitter_')
      const content = $(element).attr('content')
      if (name && content) {
        openGraphData[name] = content.trim()
      }
    })

    // Also check for Twitter tags with property attribute
    $('meta[property^="twitter:"]').each((_, element) => {
      const property = $(element).attr('property')?.replace('twitter:', 'twitter_')
      const content = $(element).attr('content')
      if (property && content) {
        openGraphData[property] = content.trim()
      }
    })

    // Extract App Store and Play Store links
    const appStoreLinks: string[] = []
    const playStoreLinks: string[] = []

    // Look for App Store links
    $('a[href*="apps.apple.com"], a[href*="itunes.apple.com"]').each((_, element) => {
      const href = $(element).attr('href')
      if (href && !appStoreLinks.includes(href)) {
        appStoreLinks.push(href.trim())
      }
    })

    // Look for Play Store links
    $('a[href*="play.google.com/store/apps"]').each((_, element) => {
      const href = $(element).attr('href')
      if (href && !playStoreLinks.includes(href)) {
        playStoreLinks.push(href.trim())
      }
    })

    // Also check meta tags for app store links
    $('meta[name="apple-itunes-app"]').each((_, element) => {
      const content = $(element).attr('content')
      if (content) {
        const appIdMatch = content.match(/app-id=(\d+)/)
        if (appIdMatch) {
          const appStoreUrl = `https://apps.apple.com/app/id${appIdMatch[1]}`
          if (!appStoreLinks.includes(appStoreUrl)) {
            appStoreLinks.push(appStoreUrl)
          }
        }
      }
    })

    // Check for Google Play app deep link meta tags
    $('meta[property="al:android:url"], meta[name="al:android:url"]').each((_, element) => {
      const content = $(element).attr('content')
      if (content) {
        const packageMatch = content.match(/id=([a-zA-Z0-9._]+)/)
        if (packageMatch) {
          const playStoreUrl = `https://play.google.com/store/apps/details?id=${packageMatch[1]}`
          if (!playStoreLinks.includes(playStoreUrl)) {
            playStoreLinks.push(playStoreUrl)
          }
        }
      }
    })

    // Add to openGraphData if found
    if (appStoreLinks.length > 0) {
      openGraphData.app_store_url = appStoreLinks.length === 1 ? appStoreLinks[0] : appStoreLinks.join(', ')
    }

    if (playStoreLinks.length > 0) {
      openGraphData.play_store_url = playStoreLinks.length === 1 ? playStoreLinks[0] : playStoreLinks.join(', ')
    }

    return openGraphData
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

async function updateProductFile(filePath: string, openGraphData: OpenGraphData) {
  const fullPath = join(DATA_DIR, filePath)
  const content = readFileSync(fullPath, 'utf-8')
  const data = JSON.parse(content)

  // Extract app store URLs from opengraph data
  if (openGraphData.app_store_url) {
    data.appStoreUrl = openGraphData.app_store_url
    delete openGraphData.app_store_url
  }

  if (openGraphData.play_store_url) {
    data.playStoreUrl = openGraphData.play_store_url
    delete openGraphData.play_store_url
  }

  data.opengraph = openGraphData

  if (!DRY_RUN) {
    writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n')
  }
}

async function processCrawlQueue(tracker: CrawlTracker): Promise<CrawlTracker> {
  const pendingItems = tracker.queue.filter(item =>
    item.status === 'pending' && item.retries < CONFIG.MAX_RETRIES
  )

  log(`Processing ${pendingItems.length} pending items...`, 'info')

  for (let i = 0; i < pendingItems.length; i++) {
    const item = pendingItems[i]
    const progress = `[${i + 1}/${pendingItems.length}]`

    try {
      log(`${progress} Processing ${item.file}...`, 'info')
      item.last_attempt = new Date().toISOString()

      const openGraphData = await fetchOpenGraphData(item.url)

      // Check if we got any useful data
      const hasData = Object.keys(openGraphData).length > 1 // More than just last_updated
      if (!hasData) {
        throw new Error('No OpenGraph data found')
      }

      await updateProductFile(item.file, openGraphData)

      item.status = 'completed'
      item.error = undefined
      tracker.completed++

      const ogTagCount = Object.keys(openGraphData).length - 1 // Exclude last_updated
      const appStoreInfo = openGraphData.app_store_url ? ' + App Store' : ''
      const playStoreInfo = openGraphData.play_store_url ? ' + Play Store' : ''

      log(`${progress} ✓ ${item.file} - Found ${ogTagCount} OG tags${appStoreInfo}${playStoreInfo}`, 'success')

      // Save progress after each successful item
      saveTracker(tracker)

      // Rate limiting
      if (i < pendingItems.length - 1) {
        await new Promise(resolve => setTimeout(resolve, CONFIG.REQUEST_DELAY))
      }

    } catch (error) {
      item.retries++
      item.error = String(error)

      if (item.retries >= CONFIG.MAX_RETRIES) {
        item.status = 'failed'
        tracker.failed++
        log(`${progress} ✗ ${item.file} - Failed after ${CONFIG.MAX_RETRIES} retries: ${error}`, 'error')
      } else {
        log(`${progress} ⚠ ${item.file} - Retry ${item.retries}/${CONFIG.MAX_RETRIES}: ${error}`, 'warn')
      }

      // Save progress after each item (success or failure)
      saveTracker(tracker)

      // Still apply rate limiting on errors
      if (i < pendingItems.length - 1) {
        await new Promise(resolve => setTimeout(resolve, CONFIG.REQUEST_DELAY))
      }
    }
  }

  return tracker
}

function printSummary(tracker: CrawlTracker) {
  const duration = Date.now() - new Date(tracker.session_started).getTime()
  const durationMin = Math.round(duration / 60000)

  log('\n=== CRAWL SUMMARY ===', 'info')
  log(`Session duration: ${durationMin} minutes`, 'info')
  log(`Total files: ${tracker.total_files}`, 'info')
  log(`✓ Completed: ${tracker.completed}`, 'success')
  log(`✗ Failed: ${tracker.failed}`, 'error')
  log(`⊘ Skipped: ${tracker.skipped}`, 'warn')

  const failedItems = tracker.queue.filter(item => item.status === 'failed')
  if (failedItems.length > 0) {
    log('\nFailed items:', 'error')
    failedItems.forEach(item => {
      log(`  • ${item.file}: ${item.error}`, 'error')
    })
  }

  log('\nTracker saved to: ' + TRACKER_FILE, 'info')
  if (DRY_RUN) {
    log('DRY RUN: No files were actually modified', 'warn')
  }
}

// Main execution
async function main() {
  try {
    log('Starting OpenGraph scraper...', 'info')

    if (DRY_RUN) {
      log('DRY RUN MODE: No files will be modified', 'warn')
    }

    if (SINGLE_URL) {
      log(`Single URL mode: ${SINGLE_URL}`, 'info')
      const data = await fetchOpenGraphData(SINGLE_URL)
      console.log(JSON.stringify(data, null, 2))
      return
    }

    let tracker = loadTracker()
    tracker = buildQueue(tracker)

    if (tracker.queue.filter(item => item.status === 'pending').length === 0) {
      log('No items to process. Use --force to re-scrape all items.', 'info')
      return
    }

    tracker = await processCrawlQueue(tracker)
    saveTracker(tracker)
    printSummary(tracker)

  } catch (error) {
    log(`Fatal error: ${error}`, 'error')
    process.exit(1)
  }
}

// Handle cleanup on exit
process.on('SIGINT', () => {
  log('\nReceived SIGINT, exiting gracefully...', 'warn')
  process.exit(0)
})

main()