/**
 * Centralized URL/Link Generation Module
 *
 * This module provides consistent URL generation across the entire application.
 * All URLs are generated using these functions to ensure consistency and make it easy
 * to update URL structures in one place.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://swadeshiapps.com'

/**
 * Get the base URL for the application
 * @returns Base URL (e.g., "https://swadeshiapps.com")
 */
export function getBaseUrl(): string {
  return BASE_URL
}

// ===========================
// Static Pages
// ===========================

export function getHomeUrl(): string {
  return '/'
}

export function getAboutUrl(): string {
  return '/about'
}

export function getContributeUrl(): string {
  return '/contribute'
}

export function getWhySwadeshiUrl(): string {
  return '/why-swadeshi'
}

export function getAlternativesIndexUrl(): string {
  return '/alternatives'
}

export function getNotSwadeshiIndexUrl(): string {
  return '/not-swadeshi-apps'
}

// ===========================
// Dynamic Pages
// ===========================

/**
 * Generate category page URL from category slug
 * @param categorySlug - Category slug (e.g., "business", "finance")
 * @returns Category page URL (e.g., "/business")
 */
export function getCategoryUrl(categorySlug: string): string {
  return `/${categorySlug.toLowerCase().replace(/\s+/g, '-')}`
}

/**
 * Generate app detail page URL from category slug and app slug
 * @param categorySlug - Category slug (e.g., "business")
 * @param appSlug - App slug (e.g., "zoho-crm")
 * @returns App detail page URL (e.g., "/business/zoho-crm")
 */
export function getAppUrl(categorySlug: string, appSlug: string): string {
  return `/${categorySlug}/${appSlug}`
}

/**
 * Generate alternative page URL from international tool name or slug
 * @param toolNameOrSlug - International tool name or pre-slugified slug
 * @returns Alternative page URL (e.g., "/alternatives/stripe")
 */
export function getAlternativeUrl(toolNameOrSlug: string): string {
  const slug = slugify(toolNameOrSlug)
  return `/alternatives/${slug}`
}

/**
 * Generate "not swadeshi apps" page URL from company/app name or slug
 * @param nameOrSlug - Company/app name or pre-slugified slug
 * @returns Not swadeshi page URL (e.g., "/not-swadeshi-apps/flipkart")
 */
export function getNotSwadeshiUrl(nameOrSlug: string): string {
  const slug = slugify(nameOrSlug)
  return `/not-swadeshi-apps/${slug}`
}

/**
 * Generate purpose page URL from purpose slug
 * @param purposeSlug - Purpose slug (e.g., "messaging-app", "browser")
 * @returns Purpose page URL (e.g., "/messaging-app")
 */
export function getPurposeUrl(purposeSlug: string): string {
  return `/${purposeSlug}`
}

// ===========================
// Full/Absolute URLs (for metadata, sitemap, etc.)
// ===========================

/**
 * Convert relative URL to absolute URL
 * @param relativeUrl - Relative URL path
 * @returns Absolute URL with base domain
 */
export function getAbsoluteUrl(relativeUrl: string): string {
  return `${BASE_URL}${relativeUrl}`
}

/**
 * Get absolute home URL
 */
export function getAbsoluteHomeUrl(): string {
  return BASE_URL
}

/**
 * Get absolute category URL
 */
export function getAbsoluteCategoryUrl(categorySlug: string): string {
  return getAbsoluteUrl(getCategoryUrl(categorySlug))
}

/**
 * Get absolute app URL
 */
export function getAbsoluteAppUrl(categorySlug: string, appSlug: string): string {
  return getAbsoluteUrl(getAppUrl(categorySlug, appSlug))
}

/**
 * Get absolute alternative URL
 */
export function getAbsoluteAlternativeUrl(toolNameOrSlug: string): string {
  return getAbsoluteUrl(getAlternativeUrl(toolNameOrSlug))
}

/**
 * Get absolute not swadeshi URL
 */
export function getAbsoluteNotSwadeshiUrl(nameOrSlug: string): string {
  return getAbsoluteUrl(getNotSwadeshiUrl(nameOrSlug))
}

/**
 * Get absolute purpose URL
 */
export function getAbsolutePurposeUrl(purposeSlug: string): string {
  return getAbsoluteUrl(getPurposeUrl(purposeSlug))
}

// ===========================
// URL Validation Helpers
// ===========================

/**
 * Slugify a string (convert to URL-friendly format)
 * @param text - Text to slugify
 * @returns Slugified string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\+/g, '-')         // Replace + with - (e.g., "Disney+" → "disney-")
    .replace(/\./g, '-')         // Replace . with - (e.g., "monday.com" → "monday-com")
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars except -
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start
    .replace(/-+$/, '')          // Trim - from end
}

/**
 * Check if a URL is external (not part of this site)
 * @param url - URL to check
 * @returns True if external, false if internal
 */
export function isExternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const baseUrlObj = new URL(BASE_URL)
    return urlObj.hostname !== baseUrlObj.hostname
  } catch {
    // If URL parsing fails, assume it's a relative URL (internal)
    return false
  }
}
