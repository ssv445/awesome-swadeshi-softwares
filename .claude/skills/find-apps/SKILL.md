---
name: find-apps
description: Discover new Indian apps and companies to add to SwadeshiApps.com. Populates a ranked backlog in data/app-candidates.json. Run weekly or on-demand.
---

# Find Apps — Discovery Pipeline

Discover new Indian apps/companies to add to SwadeshiApps.com and populate a ranked candidate backlog.

## Output

All candidates are written to `data/app-candidates.json`. The daily-operator skill reads from this file on "New app entry" days.

## Step 1: Load Existing Apps (dedup list)

1. Glob all `data/categories/**/*.json` and extract `name` and `slug` from each
2. Read `data/app-candidates.json` if it exists — load existing candidates
3. Build a dedup set of all known app names/slugs (lowercase)

## Step 2: Run Discovery Sources (parallel subagents)

Launch 4 subagents in parallel, each returning a list of candidate apps:

### Source 1: GSC Content Gaps
- Use `mcp__gsc__enhanced_search_analytics` for `sc-domain:swadeshiapps.com`, last 28 days
- Pull top 100 queries by impressions
- Identify queries that mention Indian app/company names we don't have pages for
- Examples: "darwinbox review", "zerodha alternative", "cred app" — if we don't list Darwinbox/Zerodha/CRED, they're candidates

### Source 2: Competitor Directories
- WebSearch for: "Indian SaaS companies list 2026", "made in India apps directory"
- WebSearch for: "Indian alternative to [tool]" for top international tools in our alternatives that have fewer than 2 Indian options
- Extract app names, websites, categories

### Source 3: Web Research (trending)
- WebSearch for: "top Indian startups 2026", "Indian unicorn apps", "trending Indian apps"
- WebSearch for: "best Indian [category] apps" for each of our 12 categories
- Focus on apps with significant user base (1M+ users or $10M+ funding)

### Source 4: Cross-Reference Gaps
- Scan all existing app JSON files
- Find categories with fewer than 5 apps — these need more entries
- Check `alternatives` arrays across all apps: find international tools that appear 3+ times but have only 1 Indian alternative listed — there are likely more Indian options
- Check `data/companies.json` — some companies may have products not yet listed as individual apps

## Step 3: Merge & Dedup

1. Collect all candidates from the 4 sources
2. Remove any that match existing apps (by name or slug, case-insensitive)
3. Remove any already in `app-candidates.json` (by slug)
4. Merge duplicates found across multiple sources (boost their priority)

## Step 4: Score & Rank

Assign priority based on these rules:

**High priority** (add first):
- Found via GSC with 50+ impressions (proven user demand)
- Well-known app with 1M+ users or unicorn status
- Found in 3+ discovery sources
- Fills a category with fewer than 3 apps

**Medium priority**:
- Found in 2 discovery sources
- Fills a category with fewer than 5 apps
- Has a clear international alternative we already track

**Low priority**:
- Single-source discovery
- Niche app or early-stage startup
- Category already well-populated (10+ apps)

## Step 5: Write Candidates

Update `data/app-candidates.json` with this structure:

```json
{
  "candidates": [
    {
      "name": "App Name",
      "slug": "app-name",
      "source": "gsc-gap|competitor-dir|web-research|cross-ref",
      "sourceDetail": "Brief description of where/how found",
      "suggestedCategory": "business",
      "alternativeTo": ["International Tool 1", "International Tool 2"],
      "priority": "high|medium|low",
      "reason": "Why this app should be added",
      "website": "https://...",
      "status": "pending",
      "addedDate": "YYYY-MM-DD",
      "pickedDate": null
    }
  ],
  "lastDiscoveryRun": "YYYY-MM-DD",
  "stats": {
    "totalFound": 0,
    "pending": 0,
    "picked": 0,
    "skipped": 0
  }
}
```

Rules for writing:
- Preserve existing candidates (don't overwrite picked/skipped entries)
- Sort by priority: high first, then medium, then low
- Within same priority, sort by number of sources (multi-source first)
- Max 20 new candidates per run
- Auto-skip candidates older than 90 days that are still pending

## Step 6: Report

Print a summary:

```
## Find Apps Report — YYYY-MM-DD

### New Candidates Found: X
| # | Name | Category | Priority | Source | Alternative To |
|---|------|----------|----------|--------|---------------|
| 1 | ... | ... | high | gsc-gap | ... |

### Backlog Status
- Pending: X (high: X, medium: X, low: X)
- Previously picked: X
- Skipped/expired: X

### Category Coverage
| Category | Current Apps | Candidates | Gap |
|----------|-------------|------------|-----|
| business | 30 | 2 | ok |
| education | 3 | 5 | needs more |
```

## Guard Rails

- Max 20 new candidates per run
- Never add duplicates of existing apps
- Each candidate must have: name, suggestedCategory, at least 1 alternativeTo, source
- Candidates expire after 90 days if not picked (mark as skipped)
- Do not create app JSON files — only populate the backlog. Daily-operator handles creation.
- If a source fails (e.g., GSC unavailable), continue with remaining sources
