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
1. Check `data/app-candidates.json` for the top `pending` + `high` priority candidate
2. If a candidate exists, use it. If not, fall back to picking from GSC content gaps (Stage 1)
3. Use WebSearch to research the Indian app:
   - Official website for company info, pricing, features
   - App store reviews for rating, pros, cons
   - Reddit/Twitter/forums for user complaints
4. Create JSON file in `data/categories/[category]/[slug].json` following the exact format:
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
     "companySlug": "company-name",
     "location": "City, State",
     "pros": ["Strength 1", "Strength 2"],
     "cons": ["Weakness 1", "Weakness 2"],
     "userComplaints": ["Real complaint from reviews"],
     "rating": 4.0,
     "ratingSource": "Google Play Store",
     "lastVerified": "YYYY-MM-DD"
   }
   ```
5. If the company doesn't exist in `data/companies.json`, add a Swadeshi Meter entry
6. Mark the candidate as `picked` in `data/app-candidates.json` with today's date
7. Run `pnpm validate` to verify

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
