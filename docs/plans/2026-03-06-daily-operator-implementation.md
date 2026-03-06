# Daily Operator Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the foundation for automated daily content growth, affiliate monetization, and blog infrastructure for SwadeshiApps.com.

**Architecture:** Extend existing static Next.js site with new optional fields in app JSON (pros/cons/complaints/rating), an affiliate registry (`/data/affiliates.json`), a markdown-based blog section (`/content/blog/`), and a Claude Code skill (`/daily-operator`) that automates the entire pipeline.

**Tech Stack:** Next.js 15, TypeScript, gray-matter (frontmatter), remark + remark-html (markdown rendering), existing Tailwind CSS + shadcn/ui

---

## Task 1: Extend Software Interface with Review Fields

**Files:**
- Modify: `lib/data.ts:44-61` (Software interface)
- Modify: `scripts/validate-data.ts:11-26` (validation Software interface)

**Step 1: Add new optional fields to the Software interface in `lib/data.ts`**

Add after `featured_reason` (line 60):

```typescript
  pros?: string[]              // Genuine strengths from reviews
  cons?: string[]              // Known issues and limitations
  userComplaints?: string[]    // Real complaints from app stores, Reddit, Twitter
  rating?: number              // Aggregated rating from a public source
  ratingSource?: string        // Where the rating came from
  lastVerified?: string        // ISO date when data was last checked
```

**Step 2: Add matching fields to the validation script interface in `scripts/validate-data.ts`**

Add after `playStoreUrl` (line 25):

```typescript
  pros?: string[]
  cons?: string[]
  userComplaints?: string[]
  rating?: number
  ratingSource?: string
  lastVerified?: string
```

**Step 3: Add validation rules in `scripts/validate-data.ts`**

Add after the Play Store URL validation block (after line 230), before the closing `}` of `validateSoftware`:

```typescript
  // Validate pros/cons/userComplaints arrays (optional)
  for (const field of ['pros', 'cons', 'userComplaints'] as const) {
    if (data[field]) {
      if (!Array.isArray(data[field])) {
        errors.push({ file: fileName, field, error: `${field} must be an array of strings` })
      } else {
        data[field].forEach((item: any, index: number) => {
          if (typeof item !== 'string' || item.length < 5) {
            warnings.push({ file: fileName, field: `${field}[${index}]`, error: `${field} entries should be descriptive strings (5+ chars)` })
          }
        })
      }
    }
  }

  // Validate rating (optional)
  if (data.rating !== undefined) {
    if (typeof data.rating !== 'number' || data.rating < 0 || data.rating > 5) {
      errors.push({ file: fileName, field: 'rating', error: 'Rating must be a number between 0 and 5' })
    }
  }

  // Validate ratingSource (optional, but required if rating is present)
  if (data.rating !== undefined && !data.ratingSource) {
    warnings.push({ file: fileName, field: 'ratingSource', error: 'ratingSource should be provided when rating is set' })
  }

  // Validate lastVerified date format (optional)
  if (data.lastVerified) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(data.lastVerified)) {
      errors.push({ file: fileName, field: 'lastVerified', error: 'lastVerified must be in YYYY-MM-DD format' })
    }
  }
```

**Step 4: Run validation to verify no regressions**

Run: `cd /Users/shyam/www/swadeshiapps.com && pnpm validate`
Expected: All existing files pass (new fields are optional)

**Step 5: Commit**

```bash
git add lib/data.ts scripts/validate-data.ts
git commit -m "feat: extend Software interface with pros/cons/complaints/rating fields"
```

---

## Task 2: Display Pros/Cons/Complaints on App Detail Page

**Files:**
- Modify: `app/[category]/[slug]/page.tsx:224-293` (information grid section)

**Step 1: Add the pros/cons/complaints section**

Add after the Information Grid closing `</div>` (after line 293, before the OpenGraph Image Section):

```tsx
        {/* Honest Review Section */}
        {(app.pros?.length || app.cons?.length || app.userComplaints?.length) && (
          <Card className="mb-8">
            <CardHeader>
              <h2 className="flex items-center text-xl font-semibold leading-none">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Honest Review
              </h2>
              {app.rating !== undefined && (
                <p className="text-sm text-gray-500 mt-1">
                  {app.rating}/5 on {app.ratingSource || 'user reviews'}
                  {app.lastVerified && ` · Last verified ${app.lastVerified}`}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {app.pros && app.pros.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-green-700 mb-3">What works well</h3>
                    <ul className="space-y-2">
                      {app.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <span className="text-green-600 mt-0.5 flex-shrink-0">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {app.cons && app.cons.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-red-700 mb-3">What needs improvement</h3>
                    <ul className="space-y-2">
                      {app.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <span className="text-red-600 mt-0.5 flex-shrink-0">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {app.userComplaints && app.userComplaints.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-amber-700 mb-3">Common user complaints</h3>
                  <ul className="space-y-2">
                    {app.userComplaints.map((complaint, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="text-amber-500 mt-0.5 flex-shrink-0">!</span>
                        {complaint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
```

**Step 2: Test with a sample app by temporarily adding review data**

Add pros/cons to `data/categories/business/zoho-crm.json` (temporarily for testing):

```json
  "pros": ["Generous free tier with up to 3 users", "Strong integration ecosystem with 500+ apps", "Data hosted in India for compliance"],
  "cons": ["UI can feel cluttered for new users", "Customer support response times vary by plan", "Mobile app has occasional sync delays"],
  "userComplaints": ["Frequent UI changes confuse existing users", "Email deliverability issues reported on lower plans"],
  "rating": 4.2,
  "ratingSource": "Google Play Store",
  "lastVerified": "2026-03-06"
```

**Step 3: Validate and test locally**

Run: `pnpm validate && pnpm dev`
Expected: Validation passes. Visit `http://localhost:3000/business/zoho-crm` — see the "Honest Review" section.

**Step 4: Revert the test data from zoho-crm.json** (remove the test pros/cons added in step 2)

**Step 5: Commit**

```bash
git add app/\[category\]/\[slug\]/page.tsx
git commit -m "feat: display pros/cons/complaints review section on app detail pages"
```

---

## Task 3: Create Affiliate Registry and Integration

**Files:**
- Create: `data/affiliates.json`
- Create: `lib/affiliates.ts`
- Modify: `app/[category]/[slug]/page.tsx` (affiliate link swap + disclosure)

**Step 1: Create the empty affiliate registry**

Create `data/affiliates.json`:

```json
{}
```

**Step 2: Create the affiliate utility module**

Create `lib/affiliates.ts`:

```typescript
import fs from 'fs'
import path from 'path'

export interface AffiliateEntry {
  affiliateUrl: string
  program: string
  commission: string
  status: 'active' | 'paused'
  addedDate: string
}

export type AffiliateRegistry = Record<string, AffiliateEntry>

// Load affiliate registry at build time (server-side only)
export function getAffiliateRegistry(): AffiliateRegistry {
  const filePath = path.join(process.cwd(), 'data', 'affiliates.json')

  try {
    if (!fs.existsSync(filePath)) {
      return {}
    }
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.warn('Error loading affiliate registry:', error)
    return {}
  }
}

// Get affiliate URL for a specific app slug, or null if none exists
export function getAffiliateUrl(appSlug: string): string | null {
  const registry = getAffiliateRegistry()
  const entry = registry[appSlug]
  if (entry && entry.status === 'active') {
    return entry.affiliateUrl
  }
  return null
}

// Check if an app has an active affiliate link
export function hasAffiliate(appSlug: string): boolean {
  return getAffiliateUrl(appSlug) !== null
}
```

**Step 3: Update app detail page to use affiliate links**

In `app/[category]/[slug]/page.tsx`, add import at top:

```typescript
import { getAffiliateUrl } from "@/lib/affiliates"
```

Inside the `AppPage` component (after line 88 `const relatedApps = ...`), add:

```typescript
  const affiliateUrl = getAffiliateUrl(app.slug)
  const visitUrl = affiliateUrl || app.website
```

Replace the "Visit Website" Button (lines 193-198) — change `app.website` to `visitUrl`:

```tsx
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                  <Link href={visitUrl} target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
```

Add affiliate disclosure after the Visit Website button (inside the `flex flex-wrap gap-3` div):

```tsx
                {affiliateUrl && (
                  <span className="text-xs text-gray-400 self-center">Partner link</span>
                )}
```

**Step 4: Run validation and dev server**

Run: `pnpm validate && pnpm dev`
Expected: Passes. No visual change yet (registry is empty).

**Step 5: Commit**

```bash
git add data/affiliates.json lib/affiliates.ts app/\[category\]/\[slug\]/page.tsx
git commit -m "feat: add affiliate registry with auto-injection on app detail pages"
```

---

## Task 4: Install Blog Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install gray-matter, remark, and remark-html**

Run: `cd /Users/shyam/www/swadeshiapps.com && pnpm add gray-matter remark remark-html`

**Step 2: Verify installation**

Run: `pnpm list gray-matter remark remark-html`
Expected: All three packages listed with versions

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "deps: add gray-matter, remark, remark-html for blog infrastructure"
```

---

## Task 5: Create Blog Data Layer

**Files:**
- Create: `lib/blog.ts`
- Create: `content/blog/.gitkeep`

**Step 1: Create blog content directory**

Run: `mkdir -p /Users/shyam/www/swadeshiapps.com/content/blog`

**Step 2: Create .gitkeep to track the empty directory**

Create `content/blog/.gitkeep` (empty file)

**Step 3: Create the blog data layer**

Create `lib/blog.ts`:

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  targetQuery?: string
  relatedApps?: string[]        // e.g. ["productivity/zoho-mail"]
  relatedAlternatives?: string[] // e.g. ["gmail"]
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

// Get all blog post slugs for static generation
export function getAllBlogSlugs(): string[] {
  try {
    if (!fs.existsSync(BLOG_DIR)) return []
    return fs.readdirSync(BLOG_DIR)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''))
  } catch {
    return []
  }
}

// Get all blog posts metadata, sorted by date (newest first)
export function getAllBlogPosts(): BlogPostMeta[] {
  const slugs = getAllBlogSlugs()
  const posts = slugs.map(slug => getBlogPostMeta(slug)).filter(Boolean) as BlogPostMeta[]
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Get blog post metadata only (no content rendering)
export function getBlogPostMeta(slug: string): BlogPostMeta | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)

  try {
    if (!fs.existsSync(filePath)) return null
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      targetQuery: data.targetQuery,
      relatedApps: data.relatedApps,
      relatedAlternatives: data.relatedAlternatives,
    }
  } catch {
    return null
  }
}

// Get full blog post with rendered HTML
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)

  try {
    if (!fs.existsSync(filePath)) return null
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    const processedContent = await remark()
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      targetQuery: data.targetQuery,
      relatedApps: data.relatedApps,
      relatedAlternatives: data.relatedAlternatives,
      contentHtml,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}
```

**Step 4: Commit**

```bash
git add lib/blog.ts content/blog/.gitkeep
git commit -m "feat: add blog data layer with gray-matter and remark"
```

---

## Task 6: Create Blog Listing Page

**Files:**
- Create: `app/blog/page.tsx`

**Step 1: Create the blog listing page**

Create `app/blog/page.tsx`:

```tsx
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getAllBlogPosts } from "@/lib/blog"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { getBaseUrl } from "@/lib/links"

export const dynamic = 'force-static'
export const revalidate = false

export const metadata = {
  title: "Blog - Swadeshi Apps",
  description: "Honest comparisons and reviews of Indian software alternatives. Unbiased analysis with real user feedback.",
  alternates: {
    canonical: `${getBaseUrl()}/blog`,
  },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
      <p className="text-lg text-gray-600 mb-8">
        Honest comparisons and reviews of Indian software alternatives.
      </p>

      {posts.length === 0 ? (
        <p className="text-gray-500">No blog posts yet. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{post.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat: add blog listing page"
```

---

## Task 7: Create Blog Post Detail Page

**Files:**
- Create: `app/blog/[slug]/page.tsx`

**Step 1: Create the blog post page**

Create `app/blog/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation"
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { getBaseUrl } from "@/lib/links"
import Link from "next/link"

export const dynamic = 'force-static'
export const revalidate = false
export const dynamicParams = false

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  const baseUrl = getBaseUrl()

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} - Swadeshi Apps Blog`,
    description: post.description,
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      siteName: 'Swadeshi Apps',
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ]

  const baseUrl = getBaseUrl()

  // Article structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "Swadeshi Apps",
      "url": baseUrl,
    },
    "mainEntityOfPage": `${baseUrl}/blog/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {post.title}
            </h1>
            <p className="text-gray-500">{post.date}</p>
          </header>

          <Card>
            <CardContent className="p-6 md:p-8">
              <div
                className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </CardContent>
          </Card>

          {/* Related links */}
          {post.relatedAlternatives && post.relatedAlternatives.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Alternatives</h2>
              <div className="flex flex-wrap gap-3">
                {post.relatedAlternatives.map((alt) => (
                  <Link
                    key={alt}
                    href={`/alternatives/${alt}`}
                    className="text-blue-600 hover:underline bg-blue-50 px-3 py-1.5 rounded-md text-sm"
                  >
                    {alt} alternatives
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        <div className="mt-8 text-center">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to all posts
          </Link>
        </div>
      </div>
    </>
  )
}
```

**Step 2: Commit**

```bash
git add app/blog/\[slug\]/page.tsx
git commit -m "feat: add blog post detail page with structured data"
```

---

## Task 8: Add Blog to Navigation and Sitemap

**Files:**
- Modify: `lib/constants.ts:76-82` (NAV_LINKS)
- Modify: `lib/constants.ts:86-103` (FOOTER_LINKS)
- Modify: `app/sitemap.ts` (add blog routes)

**Step 1: Add Blog to NAV_LINKS in `lib/constants.ts`**

Add `{ href: "/blog", label: "Blog" }` to the NAV_LINKS array (before the "Not Swadeshi" entry):

```typescript
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contribute", label: "Contribute" },
  { href: "/blog", label: "Blog" },
  { href: "/why-swadeshi", label: "Why Swadeshi?" },
  { href: "/not-swadeshi-apps", label: "Not Swadeshi" }
] as const
```

**Step 2: Add Blog to FOOTER_LINKS main array**

Add `{ href: "/blog", label: "Blog" }` to `FOOTER_LINKS.main`.

**Step 3: Add blog routes to sitemap**

In `app/sitemap.ts`, add import:

```typescript
import { getAllBlogPosts } from '@/lib/blog'
```

Add blog routes before the return statement (after `alternativeRoutes`):

```typescript
  // Blog posts
  const blogPosts = getAllBlogPosts()
  const blogRoutes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...blogPosts.map((post) => ({
      url: getAbsoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
```

Add `...blogRoutes` to the return array.

**Step 4: Validate and build**

Run: `pnpm validate && pnpm build`
Expected: Build succeeds. Blog page exists at `/blog` (empty state).

**Step 5: Commit**

```bash
git add lib/constants.ts app/sitemap.ts
git commit -m "feat: add blog to navigation and sitemap"
```

---

## Task 9: Create a Seed Blog Post and Verify End-to-End

**Files:**
- Create: `content/blog/indian-alternatives-to-gmail.md`

**Step 1: Create a seed blog post**

Create `content/blog/indian-alternatives-to-gmail.md`:

```markdown
---
title: "Best Indian Alternatives to Gmail in 2026"
description: "An honest look at Indian email services that can replace Gmail, with real pros, cons, and user feedback."
date: "2026-03-06"
targetQuery: "indian gmail alternative"
relatedApps: ["business/zoho-crm"]
relatedAlternatives: ["gmail"]
---

Gmail dominates the email landscape, but several Indian alternatives offer compelling features, especially around data privacy and local compliance.

## Zoho Mail

**Best for:** Business users who want a complete office suite alongside email.

Zoho Mail provides ad-free email with a clean interface. The free plan includes 5GB per user for up to 5 users, making it viable for small teams.

### What works well

- No ads in the email interface, even on free plans
- Tight integration with Zoho's 45+ business apps
- Data hosted in Indian data centers (Chennai and Mumbai)
- Custom domain email on all plans

### Watch out for

- Free plan is limited to 5 users — growing teams will need to pay
- Some users report mobile app sync can be slow on spotty connections
- The migration tool from Gmail works, but can miss some labels

### Common complaints from users

- "The UI gets confusing when switching between Zoho Mail and other Zoho apps"
- "Email deliverability to Gmail/Outlook can be an issue on lower plans"

## Rediffmail

**Best for:** Personal email use with a straightforward experience.

Rediffmail is one of India's oldest email providers, operating since 1998. It offers basic email functionality.

### What works well

- Simple, straightforward email experience
- Long track record of service availability
- Indian company with local support

### Watch out for

- The interface looks dated compared to modern email clients
- Limited cloud storage compared to Gmail's 15GB
- Mobile app experience is basic

## Bottom line

For business email, **Zoho Mail** is the clear winner among Indian alternatives. It matches Gmail's feature set and adds data residency benefits. For personal email, the options are more limited — Rediffmail works but won't feel like an upgrade from Gmail.

The honest truth: Gmail is hard to beat for most individual users. But if you want your data in India, or need business email without depending on Google, Zoho Mail is a genuinely strong choice.
```

**Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds. Blog listing shows 1 post. Blog post renders correctly.

**Step 3: Commit**

```bash
git add content/blog/indian-alternatives-to-gmail.md
git commit -m "content: add seed blog post - Indian alternatives to Gmail"
```

---

## Task 10: Create Daily Operator Log Directory and Skill

**Files:**
- Create: `logs/daily-operator/.gitkeep`
- Create: `~/.claude/skills/daily-operator.md`

**Step 1: Create log directory**

Run: `mkdir -p /Users/shyam/www/swadeshiapps.com/logs/daily-operator`

Create `logs/daily-operator/.gitkeep` (empty file)

**Step 2: Create the daily operator skill**

Create `~/.claude/skills/daily-operator.md`:

```markdown
---
name: daily-operator
description: Automated daily pipeline for SwadeshiApps.com — GSC analysis, content expansion, affiliate research, SEO optimization, and deployment. Run once daily.
---

# Daily Operator Pipeline

You are the automated daily operator for SwadeshiApps.com. Run this pipeline step by step.

## Pre-flight

1. Read the last log from `logs/daily-operator/` to understand what was done yesterday
2. Determine today's day of the week for the rotation schedule

## Daily Rotation

| Day | Primary Action | Secondary Action |
|-----|---------------|-----------------|
| Mon | New app entry | SEO optimization |
| Tue | New alternatives page | Affiliate research |
| Wed | Blog post (research + outline) | SEO optimization |
| Thu | Blog post (write + publish) | New app entry |
| Fri | New app entry | Affiliate link updates |
| Sat | SEO optimization (batch) | Review weekly metrics |
| Sun | Weekly summary report | Plan next week's targets |

## Stage 1: GSC Analysis

1. Use `mcp__gsc__enhanced_search_analytics` to pull last 7 days for `sc-domain:swadeshiapps.com`
2. Pull data by `query` dimension (top 50 rows)
3. Pull data by `page` dimension (top 50 rows)
4. Identify:
   - **Quick wins**: queries with 100+ impressions, position 4-15, CTR < 3%
   - **Content gaps**: high-impression queries where no dedicated app/alternative page exists
   - **Trending**: queries appearing this week that weren't in previous logs

## Stage 2: Content Expansion (based on rotation)

### If "New app entry" day:
1. Pick highest-impact content gap from Stage 1
2. Use WebSearch to research the Indian app:
   - Official website for company info, pricing, features
   - App store reviews for rating, pros, cons
   - Reddit/Twitter/forums for user complaints
3. Create JSON file in `data/categories/[category]/[slug].json` following the exact format:
   ```json
   {
     "name": "App Name",
     "slug": "app-name",
     "description": "20-500 char description",
     "website": "https://...",
     "category": "category-slug",
     "alternatives": ["International Tool 1"],
     "pricing": "Free|Freemium|Paid|Open Source",
     "company": "Company Name",
     "location": "City, State",
     "pros": ["Strength 1", "Strength 2"],
     "cons": ["Weakness 1", "Weakness 2"],
     "userComplaints": ["Real complaint from reviews"],
     "rating": 4.0,
     "ratingSource": "Google Play Store",
     "lastVerified": "YYYY-MM-DD"
   }
   ```
4. Run `pnpm validate` to verify

### If "New alternatives page" day:
- Alternatives pages are auto-generated from the `alternatives` field in app JSONs
- To create a new alternatives page, ensure at least 1 app lists the international tool in its `alternatives` array
- If needed, add the international tool to existing apps' `alternatives` arrays

### If "Blog post" day (Wed = research, Thu = write):
- **Wednesday**: Research the target topic using WebSearch, gather data, save outline to the daily log
- **Thursday**: Write the full blog post as markdown in `content/blog/[slug].md`
- Follow the content philosophy: honest pros/cons, user complaints, "watch out for" sections
- Interlink to existing app pages and alternatives pages
- Keep the tone practical and unbiased

## Stage 3: Affiliate Research (Tue/Fri)

1. Pick 3-5 listed apps that don't have affiliate entries yet
2. Use WebSearch to search for "[app name] affiliate program" or "[app name] partner program"
3. If found, add entry to `data/affiliates.json`:
   ```json
   {
     "app-slug": {
       "affiliateUrl": "https://...",
       "program": "Program Name",
       "commission": "description of commission",
       "status": "active",
       "addedDate": "YYYY-MM-DD"
     }
   }
   ```
4. If no affiliate program exists, note it in the daily log to avoid re-checking

## Stage 4: SEO Optimization

For quick-win pages identified in Stage 1:
1. Read the current JSON file for the app
2. Improve the `description` field to better match high-impression queries
3. Ensure `alternatives` array includes all relevant international tools
4. Update `lastVerified` date

## Stage 5: Ship It

1. Run `pnpm validate` — must pass with 0 errors
2. Run `pnpm build` — must succeed
3. Commit all changes with a descriptive message summarizing today's work
4. Push to main

## Stage 6: Write Daily Log

Create `logs/daily-operator/YYYY-MM-DD.md`:

```markdown
# Daily Operator — YYYY-MM-DD (Day)

## GSC Summary (last 7 days)
- Total Impressions: X | Total Clicks: X | Avg Position: X
- Top growing queries: ...
- Quick wins identified: ...

## Actions Taken
- [list each action with file paths]

## Content Gaps Found (for future days)
- [query] — X impressions, no page exists

## Affiliate Research
- [app]: [found/not found] — [details]

## Notes
- [any observations or issues]
```

## Guard Rails

- NEVER delete existing content — only add or improve
- NEVER modify files outside the project directory
- Max 2 new app entries per day
- Max 1 blog post per week
- Always run `pnpm validate` before committing
- Always run `pnpm build` before pushing
- If validation or build fails, fix the issue before proceeding
- If unsure about a content decision, note it in the log and skip
```

**Step 3: Commit the log directory**

```bash
git add logs/daily-operator/.gitkeep
git commit -m "feat: add daily operator skill and log directory"
```

---

## Task 11: Final Verification — Full Build

**Files:** None (verification only)

**Step 1: Run full validation**

Run: `pnpm validate`
Expected: All files pass validation

**Step 2: Run full build**

Run: `pnpm build`
Expected: Build succeeds with blog page included in output

**Step 3: Test locally**

Run: `pnpm start`

Verify:
- Homepage loads correctly
- `/blog` shows the seed post
- `/blog/indian-alternatives-to-gmail` renders the full article
- `/business/zoho-crm` still works (no regression)
- Navigation includes "Blog" link
- Sitemap at `/sitemap.xml` includes blog URLs

**Step 4: Final commit if any fixes needed, then push**

```bash
git push origin main
```

---

## Summary

| Task | What it does |
|------|-------------|
| 1 | Extend Software interface with pros/cons/complaints/rating fields |
| 2 | Display honest review section on app detail pages |
| 3 | Create affiliate registry with auto-injection |
| 4 | Install blog dependencies (gray-matter, remark) |
| 5 | Create blog data layer (lib/blog.ts) |
| 6 | Create blog listing page (/blog) |
| 7 | Create blog post detail page (/blog/[slug]) |
| 8 | Add blog to navigation and sitemap |
| 9 | Create seed blog post and verify end-to-end |
| 10 | Create daily operator skill and log directory |
| 11 | Final verification — full build and deploy |

After completing all tasks, run `/daily-operator` to start the automated pipeline.
