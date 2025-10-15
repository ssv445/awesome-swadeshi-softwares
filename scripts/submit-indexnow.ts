#!/usr/bin/env tsx
/**
 * Submit all URLs from sitemap to IndexNow
 * This script fetches the sitemap.xml and submits URLs to IndexNow API for fast indexing
 */

const INDEXNOW_API = 'https://api.indexnow.org/indexnow'
const INDEXNOW_KEY = '8689527bede04d2da3595374e26cd89c'
const BATCH_SIZE = 10000 // IndexNow allows up to 10,000 URLs per request

interface IndexNowPayload {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

async function fetchSitemap(sitemapUrl: string): Promise<string[]> {
  console.log(`📥 Fetching sitemap from: ${sitemapUrl}`)

  try {
    const response = await fetch(sitemapUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`)
    }

    const xml = await response.text()

    // Extract URLs from sitemap XML using regex
    // Matches <loc>URL</loc> tags
    const urlMatches = xml.match(/<loc>(.*?)<\/loc>/g)

    if (!urlMatches || urlMatches.length === 0) {
      throw new Error('No URLs found in sitemap')
    }

    // Extract the URL from each <loc> tag
    const urls = urlMatches.map((match) => {
      const url = match.replace(/<\/?loc>/g, '')
      return url.trim()
    })

    console.log(`✅ Found ${urls.length} URLs in sitemap`)

    return urls
  } catch (error) {
    console.error(`❌ Error fetching sitemap:`, error)
    throw error
  }
}

async function submitToIndexNow(urls: string[], baseUrl: string): Promise<void> {
  const host = new URL(baseUrl).hostname

  const payload: IndexNowPayload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${baseUrl}${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }

  try {
    console.log(`\n📤 Submitting ${urls.length} URLs to IndexNow...`)
    console.log(`Host: ${host}`)
    console.log(`Key Location: ${payload.keyLocation}`)

    const response = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      console.log(`✅ Successfully submitted ${urls.length} URLs to IndexNow`)
      console.log(`Response status: ${response.status}`)
    } else {
      const errorText = await response.text()
      console.error(`❌ Failed to submit URLs to IndexNow`)
      console.error(`Status: ${response.status}`)
      console.error(`Response: ${errorText}`)
      process.exit(1)
    }
  } catch (error) {
    console.error(`❌ Error submitting to IndexNow:`, error)
    process.exit(1)
  }
}

async function main() {
  console.log('🚀 IndexNow URL Submission Script')
  console.log('=' .repeat(50))

  const baseUrl = 'https://swadeshiapps.com/'

  // Ensure baseUrl ends with /
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const sitemapUrl = `${normalizedBaseUrl}sitemap.xml`

  console.log(`🌐 Base URL: ${normalizedBaseUrl}`)
  console.log(`📄 Sitemap URL: ${sitemapUrl}`)

  // Fetch sitemap and extract URLs
  const urls = await fetchSitemap(sitemapUrl)

  console.log(`\n📊 Total URLs: ${urls.length}`)
  console.log(`📦 Batch size: ${BATCH_SIZE}`)

  // Show first few URLs as sample
  console.log(`\n📋 Sample URLs (first 5):`)
  urls.slice(0, 5).forEach((url, i) => {
    console.log(`   ${i + 1}. ${url}`)
  })

  // Split into batches if needed
  const batches: string[][] = []
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE))
  }

  console.log(`\n📦 Number of batches: ${batches.length}`)

  // Submit each batch
  for (let i = 0; i < batches.length; i++) {
    console.log(`\n--- Batch ${i + 1}/${batches.length} ---`)
    await submitToIndexNow(batches[i], normalizedBaseUrl)

    // Add a small delay between batches to be respectful to the API
    if (i < batches.length - 1) {
      console.log('⏳ Waiting 2 seconds before next batch...')
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('✅ All URLs submitted successfully!')
  console.log(`\n💡 Tip: IndexNow will notify major search engines including:`)
  console.log('   - Bing')
  console.log('   - Yandex')
  console.log('   - Seznam.cz')
  console.log('   - Naver')
  console.log('\n📝 Note: Submission does not guarantee indexing.')
  console.log('   Search engines will decide whether to crawl and index the URLs.')
}

main().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
