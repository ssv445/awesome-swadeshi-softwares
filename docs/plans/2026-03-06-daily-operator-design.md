# Daily Operator — Design Document

**Date:** 2026-03-06
**Status:** Approved
**Goal:** Automated daily pipeline for content growth, SEO optimization, and affiliate monetization of SwadeshiApps.com

## Context

SwadeshiApps.com is growing organically:
- Dec 2025: ~900 impressions/day, ~6 clicks/day
- Mar 2026: ~6,000+ impressions/day, ~35-45 clicks/day
- Average position improved from ~9 to ~5
- Alternatives pages are the primary traffic driver
- "not-swadeshi-apps" pages have massive impression volume (46K+ for PhonePe alone)

## Business Model

**Affiliate links** — no display ads. Revenue from referral commissions on listed Indian SaaS products. Clean, non-intrusive monetization that aligns with the directory's purpose.

## Content Philosophy

- **Unbiased** — list genuine pros AND cons for every app
- **User-sourced complaints** — gather real issues from app store reviews, social media, forums
- **Transparent** — clearly mark affiliate links, never hide downsides of affiliated apps
- **Practical** — focus on real-world usage, not marketing copy
- Affiliated apps get the same critical treatment as non-affiliated ones

## Architecture Overview

The "Daily Operator" is a single Claude Code skill (`/daily-operator`) that runs a sequential pipeline:

```
GSC Pull -> Gap Analysis -> Content Expansion -> Affiliate Injection -> SEO Optimization -> Git Commit -> Deploy
```

Key decisions:
- No database, no backend — stays static
- Affiliate registry as JSON (`/data/affiliates.json`)
- Blog section as markdown files in `/content/blog/`
- All changes go through git, Vercel auto-deploys on push
- Full audit trail via daily logs

## Extended App Data Format

New optional fields added to app JSON schema:

```json
{
  "name": "Zoho CRM",
  "description": "Indian CRM platform for sales teams",
  "website": "https://zoho.com",
  "category": "Business",
  "alternatives": ["Salesforce", "HubSpot"],
  "pricing": "Freemium",
  "company": "Zoho Corporation",
  "location": "Chennai, Tamil Nadu",
  "pros": [
    "Generous free tier",
    "Strong integration ecosystem",
    "Data hosted in India"
  ],
  "cons": [
    "UI can feel cluttered",
    "Customer support response times vary",
    "Mobile app has performance issues"
  ],
  "userComplaints": [
    "Frequent UI changes confuse existing users",
    "Email deliverability issues reported on lower plans"
  ],
  "rating": 4.2,
  "ratingSource": "Google Play Store",
  "lastVerified": "2026-03-06"
}
```

| Field | Type | Purpose |
|-------|------|---------|
| pros | string[] | Genuine strengths from reviews and usage |
| cons | string[] | Known issues and limitations — never hidden |
| userComplaints | string[] | Real complaints from app stores, Reddit, Twitter |
| rating | number | Aggregated rating from a public source |
| ratingSource | string | Where the rating came from (transparency) |
| lastVerified | string | When this data was last checked |

All new fields are optional to maintain backward compatibility with existing 160+ entries.

## Affiliate Registry (`/data/affiliates.json`)

```json
{
  "zoho-crm": {
    "affiliateUrl": "https://www.zoho.com/crm/?ref=swadeshiapps",
    "program": "Zoho Partner Program",
    "commission": "15% recurring",
    "status": "active",
    "addedDate": "2026-03-06"
  }
}
```

App detail pages check this registry at build time. If an affiliate entry exists for an app's slug, the "Visit Website" button uses the affiliate URL. A disclosure label is always shown: "This page contains partner links. Our reviews remain unbiased."

## Blog Infrastructure

### Storage

Markdown files with frontmatter in `/content/blog/`:

```markdown
---
title: "Best Indian Alternatives to Gmail in 2026"
description: "Honest comparison of Indian email apps with real user feedback"
date: "2026-03-06"
targetQuery: "indian gmail alternative"
relatedApps: ["productivity/zoho-mail", "communication/rediffmail"]
relatedAlternatives: ["gmail", "outlook"]
---

Article content with honest pros/cons/complaints...
```

### Dependencies

- `gray-matter` — frontmatter parsing
- `remark` + `remark-html` — markdown to HTML rendering

### Routes

- `/blog` — listing page, all posts sorted by date
- `/blog/[slug]` — individual post, statically generated

### Blog Content Standards

Each comparison article must include:
- Honest assessment of each app — not just features but real-world pain points
- "Watch out for" section per app — common complaints and gotchas
- Use case matching — "Best for small teams", "Best for enterprise", "Avoid if you need X"
- No ranking manipulation — affiliated apps don't get artificially boosted
- Sources cited where complaints were found

### SEO

- Article structured data (JSON-LD)
- Internal links to app pages and alternatives pages
- Breadcrumbs: Home -> Blog -> Post Title

## File Structure (New)

```
/data/affiliates.json              # Affiliate URL registry
/content/blog/                     # Blog markdown files
/app/blog/page.tsx                 # Blog listing page
/app/blog/[slug]/page.tsx          # Individual blog post page
/lib/blog.ts                      # Read/parse blog posts at build time
/logs/daily-operator/              # Daily run logs
~/.claude/skills/daily-operator.md # The automation skill
```

## Pipeline Stages

### Stage 1 — GSC Analysis (daily)

- Pull last 7 days of search analytics
- Identify quick wins: high impressions, low CTR, position 4-15
- Identify content gaps: queries with no dedicated page
- Identify trending queries: new queries vs last week
- Output: ranked list of opportunities

### Stage 2 — Content Expansion (daily, 1-2 items)

- Pick highest-impact opportunity from gap analysis
- New app entries: research via web search, create JSON in `/data/[category]/`
- New alternatives pages: create for international tools not yet covered
- Gather pros/cons/complaints from app store reviews, Reddit, forums
- All entries validated with `pnpm validate`

### Stage 3 — Blog Content (weekly, 1 post)

- Pick highest-volume comparison query from GSC
- Write comparison article with honest assessments
- Store as markdown in `/content/blog/`
- Interlink to existing app and alternatives pages

### Stage 4 — Affiliate Integration (after content changes)

- App detail pages auto-swap website URL with affiliate URL when entry exists
- Blog posts auto-link mentioned apps to affiliate URLs
- Weekly: search for affiliate programs of listed apps, update registry

### Stage 5 — SEO Optimization (daily)

- Quick-win pages: improve titles/descriptions
- Pages ranking 4-10: enhance descriptions, add missing alternatives
- Update structured data where needed

### Stage 6 — Ship It

- Run `pnpm validate` and `pnpm build`
- Commit with descriptive message
- Push to main (Vercel auto-deploys)
- Log summary to `/logs/daily-operator/YYYY-MM-DD.md`

## Daily Rotation Schedule

| Day | Primary Action | Secondary Action |
|-----|---------------|-----------------|
| Mon | New app entry | SEO optimization |
| Tue | New alternatives page | Affiliate research |
| Wed | Blog post (research) | SEO optimization |
| Thu | Blog post (write + publish) | New app entry |
| Fri | New app entry | Affiliate link updates |
| Sat | SEO optimization (batch) | Review weekly metrics |
| Sun | Weekly summary report | Plan next week's targets |

## Guard Rails

- Never deletes existing content — only adds or improves
- Validate before commit — `pnpm validate` must pass
- Build before push — `pnpm build` must succeed
- One blog post max per week
- Max 2 new app entries per day
- Full audit trail in `/logs/daily-operator/`

## Daily Log Format

```markdown
# Daily Operator — 2026-03-06

## GSC Summary
- Impressions: 7,072 | Clicks: 26 | Avg Position: 4.95

## Actions Taken
- Added new app: productivity/notion-alternative.json
- Updated SEO: improved title for /alternatives/gmail
- New affiliate: zoho-crm added to registry

## Opportunities Queued
- "indian slack alternative" — 340 impressions, no dedicated page
```

## Rollout Phases

### Phase 1 — Foundation
- Add new optional fields to app JSON schema
- Update validation script for new fields
- Update app detail page to display pros/cons/complaints
- Create `/data/affiliates.json`
- Update app detail page to read affiliate registry
- Add affiliate disclosure component

### Phase 2 — Blog Infrastructure
- Install `gray-matter`, `remark`, `remark-html`
- Create `/lib/blog.ts`
- Create `/app/blog/page.tsx` and `/app/blog/[slug]/page.tsx`
- Add blog to site navigation
- Create first blog post manually to test

### Phase 3 — Daily Operator Skill
- Create skill at `~/.claude/skills/daily-operator.md`
- Create `/logs/daily-operator/` directory
- Write full automation prompt
- Test run manually, refine

### Phase 4 — Content Seeding
- Backfill pros/cons/complaints for top 30 apps
- Research and add affiliate links
- Write 2-3 seed blog posts targeting top GSC queries

### Phase 5 — Steady State
- Run `/daily-operator` daily
- Weekly: review Sunday summary log
- Monthly: check affiliate earnings, adjust strategy
