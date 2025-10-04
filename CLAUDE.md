# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **simplified** "Indian Software Directory" - a static Next.js application that showcases Indian software alternatives to popular international tools. The focus is on simplicity, maintainability, and ease of contribution via GitHub PRs.

## Technology Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript (strict mode, no build error suppression)
- **Styling**: Tailwind CSS v4.1.9 with shadcn/ui components
- **UI Components**: shadcn/ui (New York style) + 7 Radix UI primitives (optimized)
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Package Manager**: pnpm
- **Data Storage**: Static JSON files in `/data/` directory
- **Validation**: Build-time data validation with automated checks

## Development Commands

```bash
# Development server
pnpm dev

# Validate data files (128 JSON files)
pnpm validate

# Build for production (includes validation + search index generation)
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Generate search index manually
pnpm search:index
```

## Simplified Architecture

### Pages & Routing
- `/app/page.tsx` - Homepage with featured software and search
- `/app/loading.tsx` - Global loading state with skeletons
- `/app/error.tsx` - Route-level error boundary
- `/app/global-error.tsx` - Global error handler
- `/app/about/page.tsx` - Contribution guidelines
- `/app/[category]/page.tsx` - Dynamic category pages (12 categories)
- `/app/[category]/[slug]/page.tsx` - Individual app detail pages (128 apps)
- `/app/alternatives/page.tsx` - General alternatives listing
- `/app/alternatives/[slug]/page.tsx` - Individual alternative pages (262 pages)
- `/app/why-swadeshi/page.tsx` - About Swadeshi movement
- `/app/client-page.tsx` - Client-side homepage component

**Total: 411 statically generated pages**

### Data Structure (Nested JSON Files)
```
/data/
├── business/           # Business & productivity tools
│   ├── zoho-crm.json
│   └── freshworks.json
├── finance/           # Payments, accounting, banking
│   ├── razorpay.json
│   └── paytm.json
├── education/         # Learning platforms
│   └── byjus.json
├── homepage.json      # Featured products configuration
└── categories.json    # Category metadata
```

### Software Data Format (Individual JSON files)
```json
{
  "name": "Software Name",
  "description": "Brief description (20-500 chars)",
  "website": "https://example.com",
  "category": "Business",
  "alternatives": ["International Software 1", "International Software 2"],
  "pricing": "Free|Freemium|Paid|Open Source",
  "company": "Company Name",
  "location": "City, State",
  "faviconUrl": "https://example.com/favicon.ico" // Optional: Custom favicon URL
}
```

**Validation Rules**:
- All fields required except `faviconUrl`
- Description: 20-500 characters
- Pricing: Must be one of the standard values
- Website: Must be valid URL format
- Alternatives: Must be array (can be empty)

## PR-Based Contribution Workflow

1. **Users fork the repository**
2. **Create new JSON file** in appropriate category folder (e.g., `data/business/my-software.json`)
3. **Validation runs automatically** on build
4. **Submit a Pull Request**
5. **Maintainers review and merge**

No forms, no database, no admin interface - just simple file creation with automated validation.

## Component Architecture

The application follows a modern, maintainable architecture with centralized theme management and reusable components:

### Layout Components (`/components/layout/`)
- **`AppShell.tsx`** - Main layout wrapper used by all pages
- **`Header.tsx`** - Unified header with navigation, logo, and CTA buttons
- **`Footer.tsx`** - Consistent footer across all pages

### Core Components (`/components/`)
- **`product-card.tsx`** - Reusable card component for displaying software
- **`favicon.tsx`** - Handles favicon display with fallbacks
- **`ashoka-chakra.tsx`** - Indian national emblem SVG component
- **`LoadingSkeletons.tsx`** - Skeleton components for loading states
  - `ProductCardSkeleton`
  - `CategoryPageSkeleton`
  - `AppPageSkeleton`

### UI Components (`/components/ui/`)
- shadcn/ui components (Button, Card, Badge, Input, etc.)
- **`SearchBox.tsx`** - Search component with dropdown suggestions and keyboard navigation
- **`FeatureCard.tsx`** - Standardized feature/benefit card with icon, title, and description
- **`HeroSection.tsx`** - Reusable hero section with Ashoka Chakra, title, and subtitle
- **`InfoSection.tsx`** - Highlighted content sections with consistent styling
- **`NumberedStep.tsx`** - Numbered step component for instruction lists
- **`Breadcrumbs.tsx`** - Standardized breadcrumb navigation with helper functions

### Utility Components (`/components/`)
- **`SafeImage.tsx`** - Client component for handling image loading with error handling
- **`StructuredData.tsx`** - JSON-LD structured data component for SEO

### Library Files (`/lib/`)
- **`theme.ts`** - Centralized theme system with Indian flag colors and design tokens
- **`constants.ts`** - Application constants, navigation links, and configuration (with env var support)
- **`data.ts`** - Client-side utilities and type definitions
- **`server-data.ts`** - Server-side functions to read JSON files at build time
  - Returns `SoftwareWithMeta` type with `categorySlug` and `slug` fields
- **`search.ts`** - Client-side search utilities with intelligent scoring (optimized)
- **`alternatives-server.ts`** - Server-side data for alternatives pages

### Scripts (`/scripts/`)
- **`validate-data.ts`** - Build-time validation script (validates all 128 JSON files)
- **`generate-search-index.ts`** - Build-time search index generation (43KB optimized)

### Configuration Files
- **`/data/categories.json`** - Centralized category metadata with icons and descriptions
- **`/public/search-index.json`** - Generated search index (auto-generated on build)
- **`.env.example`** - Environment variables template

### Architecture Patterns
- **Unified Layout**: All pages use `AppShell` for consistent header/footer
- **Theme System**: Centralized design tokens in `theme.ts`
- **Search Architecture**: Build-time index generation for fast client-side search
- **Component Composition**: Reusable components with consistent props interface
- **Static Generation**: All 411 pages pre-built at build time with optimized performance
- **Error Boundaries**: Global and route-level error handling
- **Loading States**: Skeleton components for better UX
- **Type Safety**: Enhanced TypeScript with `SoftwareWithMeta` interface

### Key Functions & Constants

**Server Functions** (`/lib/server-data.ts`):
- `getAllSoftware()` → `SoftwareWithMeta[]` - Returns all apps with metadata
- `getSoftwareByCategory(slug)` - Returns software for specific category
- `getCategories()` - Returns list of available category folders
- `getFeaturedProducts(limit)` - Returns featured products from homepage.json
- `getRelatedApps(app, limit)` - Returns related apps by company/category
- `getAppBySlug(category, slug)` - Get individual app

**Client Functions** (`/lib/data.ts`):
- `getCategoryDisplayName(slug)` - Converts slug to display name
- `getAlternativeUrl(tool)` - Generates URL for alternative pages
- `getAppUrl(category, name)` - Generates app detail page URL
- `getFaviconUrl(website, size)` - Generates favicon URL

**Search** (`/lib/search.ts`):
- `searchApps(query, options)` - Client-side search with intelligent ranking

**Constants** (`/lib/constants.ts`):
```typescript
// Pagination & Display
FEATURED_PRODUCT_LIMIT = 10
RELATED_APPS_LIMIT = 6
SEARCH_MIN_LENGTH = 1
SEARCH_MAX_RESULTS = 8
DESCRIPTION_PREVIEW_WORDS = 10
ALTERNATIVES_LIMIT = 3

// SEO (with env var support)
SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Swadeshi Apps"
SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://swadeshiapps.com/"
```

## Key Features

### Search & Navigation
- **Fast Client-Side Search**: Build-time indexed search (43KB) with intelligent scoring
- **Keyboard Navigation**: Arrow keys, Enter, and Escape support in search dropdown
- **Search Suggestions**: Real-time dropdown with app icons and descriptions
- **Category Filtering**: 12 dedicated category pages with SEO-friendly URLs

### Performance & UX
- **Static Generation**: All 411 pages pre-built at build time for optimal performance
- **Unified Theme**: Consistent Indian flag-inspired color scheme across all pages
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Error Handling**: Comprehensive error boundaries with user-friendly recovery UI
- **Loading States**: Skeleton components for better perceived performance
- **Build-Time Validation**: All 128 data files validated automatically

### SEO & Structured Data
- **JSON-LD Schema**: SoftwareApplication structured data on all product pages
- **Dynamic Sitemap**: 411 pages included automatically
- **robots.txt**: Proper crawler directives (fixed double slash bug)
- **Enhanced Metadata**: Page-specific titles, descriptions, OpenGraph tags
- **Breadcrumbs**: Standardized navigation across all pages

### Layout & Components
- **AppShell Layout**: Consistent header and footer across all pages
- **Reusable Components**: ProductCard, SearchBox, Header, Footer with consistent APIs
- **Direct External Links**: All app links go directly to external websites
- **Favicon Support**: Automatic + manual favicon handling with fallbacks

## URL Structure

- `/` - Homepage with featured software
- `/business` - Business software (12 categories total)
- `/[category]/[slug]` - Individual app pages (128 apps)
- `/alternatives` - General alternatives page
- `/alternatives/[slug]` - Individual alternative pages (262 pages)
- `/why-swadeshi` - About the Swadeshi movement
- `/about` - Contribution guidelines

## Recent Improvements (October 2025)

### ✅ Build Safety & Type Safety
- **Removed** build error suppression (`ignoreBuildErrors`, `ignoreDuringBuilds`)
- **Added** `SoftwareWithMeta` interface with `categorySlug` and `slug` fields
- **Enhanced** TypeScript strict mode with proper type checking
- All errors now visible at build time

### ✅ Dependency Optimization
- **Removed** 21 unused dependencies (70 → 17 packages)
- **Kept** only 7 actually used Radix UI components
- **Estimated** ~50MB reduction in node_modules size

### ✅ Data Validation
- **Created** build-time validation script (`scripts/validate-data.ts`)
- **Validates**: Required fields, types, URLs, pricing values, description length
- **Runs** automatically before every build (prebuild hook)
- **Command**: `pnpm validate`

### ✅ Error Handling & Loading
- **Added** global error boundary (`app/global-error.tsx`)
- **Added** route-level error boundary (`app/error.tsx`)
- **Created** skeleton loading components (`components/LoadingSkeletons.tsx`)
- **Added** global loading UI (`app/loading.tsx`)

### ✅ Constants & Configuration
- **Extracted** all magic numbers to `lib/constants.ts`
- **Added** environment variable support (`.env.example`)
- **Centralized** configuration with fallback values

### ✅ SEO Fixes
- **Fixed** robots.txt double slash bug (`//sitemap.xml` → `/sitemap.xml`)
- **Fixed** sitemap typing errors with `SoftwareWithMeta`
- **Added** JSON-LD structured data for all product pages
- **Enhanced** metadata for 411 pages

## Important Configuration

### Next.js Config (next.config.mjs)
```javascript
const nextConfig = {
  images: {
    unoptimized: true,
  },
}
```
**Note**: Build errors are NO LONGER suppressed. All TypeScript and ESLint errors are visible.

### Environment Variables (.env.example)
```bash
NEXT_PUBLIC_SITE_URL=https://swadeshiapps.com
NEXT_PUBLIC_SITE_NAME=Swadeshi Apps
```

### shadcn/ui Config (components.json)
- Style: "new-york"
- Base color: "neutral"
- CSS variables enabled
- Icon library: Lucide React
- Path aliases configured for `@/components`, `@/lib`, `@/hooks`, etc.

### Design Principles
- **Simplicity**: Maximum functionality with minimum complexity
- **Performance First**: Build-time optimization with client-side interactivity
- **Static**: No database, no server-side processing beyond build time
- **Community-driven**: All additions via GitHub PRs with automated validation
- **Consistent Theme**: Indian flag colors (saffron, white, green) throughout
- **Maintainable**: Centralized constants, reusable components, unified layout system
- **Type Safe**: Enhanced TypeScript with no build error suppression
- **Error Resilient**: Comprehensive error boundaries and graceful degradation

## Adding New Software

Contributors should:
1. Create individual JSON files in appropriate category folders
2. Follow the exact JSON format (validated automatically)
3. Use lowercase filenames with hyphens (e.g., `my-software.json`)
4. Ensure software is Indian-developed
5. Provide working website URLs (validated)
6. Use standard pricing values: `Free`, `Freemium`, `Paid`, or `Open Source`
7. Write description between 20-500 characters
8. List genuine international alternatives

### Validation Checklist
✅ All required fields present
✅ Valid URL format for website
✅ Description 20-500 characters
✅ Standard pricing value
✅ Alternatives is an array
✅ Company name at least 2 characters

Run `pnpm validate` to check all files before committing.

### Making Software Featured on Homepage

The homepage displays featured software defined in `/data/homepage.json`:

**Steps:**
1. Open `/data/homepage.json`
2. Add entry to `featured_products` array:
   ```json
   {
     "category": "communication",
     "slug": "arattai",
     "featured_reason": "Made in India instant messaging alternative"
   }
   ```
3. **Order matters**: First entry = first position on homepage
4. Limited to `FEATURED_PRODUCT_LIMIT` (default: 10)

## Data Loading & Structure

### Current Categories (12 total)
- `business` - CRM, HR, Analytics tools
- `finance` - Payment gateways, billing
- `communication` - Messaging, video conferencing
- `productivity` - Office tools, cloud storage
- `development` - Developer tools, cloud platforms
- `e-commerce` - E-commerce platforms and logistics
- `education` - Learning platforms
- `entertainment` - Streaming, music
- `social-networking` - Social platforms
- `creative` - Design and creative tools
- `utilities` - Browsers, utilities
- `hosting` - Web hosting providers

### Data Loading (Server-Side Only)
- All functions in `/lib/server-data.ts` use Node.js `fs` module
- Data read at build time for static generation
- Graceful error handling for missing files/directories
- Returns enhanced types with metadata (`SoftwareWithMeta`)

## Development Workflow

### Adding New Software Entries
1. Create JSON file in `/data/[category]/` folder
2. Follow exact `Software` interface format
3. Use kebab-case filename (e.g., `my-awesome-tool.json`)
4. Run `pnpm validate` to check validity
5. Run `pnpm dev` to test locally
6. Build and verify with `pnpm build`

### TypeScript Interfaces
```typescript
// Base interface
interface Software {
  name: string
  description: string
  website: string
  category: string
  alternatives: string[]
  pricing: string
  company: string
  location: string
  faviconUrl?: string
}

// Enhanced interface with metadata
interface SoftwareWithMeta extends Software {
  categorySlug: string
  slug: string
}
```

### Build Process
```bash
# Automated build pipeline
pnpm build

# Runs in order:
# 1. tsx scripts/validate-data.ts       (validates all JSON)
# 2. tsx scripts/generate-search-index.ts (generates 43KB index)
# 3. next build                          (builds 411 static pages)
```

**Build Output**:
- ✅ 128 data files validated
- ✅ 43KB search index generated
- ✅ 411 static pages created
- ✅ Type checks passed
- ✅ All errors visible (no suppression)

### Testing Changes
- `pnpm validate` - Validate all data files
- `pnpm dev` - Development server
- Test category pages at `/[category-name]`
- Test app pages at `/[category]/[slug]`
- Test search functionality on homepage
- Test alternative pages at `/alternatives/[tool-name]`
- `pnpm build` - Ensure static generation works

### Theme System (`/lib/theme.ts`)
```typescript
export const theme = {
  colors: {
    primary: {
      saffron: '#FF9933',    // Indian flag saffron
      white: '#FFFFFF',      // Indian flag white
      green: '#138808',      // Indian flag green
      navy: '#000080'        // Ashoka Chakra blue
    }
  }
}
```

**Color Usage**:
- **Saffron (#FF9933)**: Accent colors, gradients, highlights
- **Green (#138808)**: Borders, success states, secondary accents
- **Navy Blue (#000080)**: Primary buttons, links, Ashoka Chakra
- **White (#FFFFFF)**: Backgrounds, cards, clean spaces

## Quality Assurance

### Automated Checks
- ✅ TypeScript strict mode (no build error suppression)
- ✅ Data validation (all 128 files checked on build)
- ✅ ESLint validation
- ✅ Build-time static generation verification

### Error Handling
- ✅ Global error boundary for critical errors
- ✅ Route-level error boundaries for page errors
- ✅ Graceful degradation with user-friendly messages
- ✅ Recovery actions (try again, go home)

### Performance
- ✅ All 411 pages statically generated
- ✅ 43KB optimized search index (82% reduction from 239KB)
- ✅ Lazy loading for images and favicons
- ✅ Efficient component composition

### Maintainability
- ✅ Centralized constants (no magic numbers)
- ✅ Reusable component library
- ✅ Clear TypeScript interfaces
- ✅ Environment variable support
- ✅ Comprehensive documentation

## Troubleshooting

### Build Errors
If build fails, check:
1. Run `pnpm validate` to check data files
2. Check TypeScript errors (no longer suppressed)
3. Verify all required fields in JSON files
4. Ensure valid URL formats

### Data Validation Errors
Common issues:
- Missing required fields
- Description too short/long (20-500 chars)
- Invalid pricing value (use: Free, Freemium, Paid, Open Source)
- Invalid URL format
- Empty alternatives array (warning only)

### Development Issues
- Clear `.next` folder and rebuild
- Run `pnpm install` to update dependencies
- Check Node.js version compatibility
- Verify environment variables in `.env.local`

## Documentation Files

- **[IMPROVEMENTS.md](IMPROVEMENTS.md)** - Detailed improvements summary
- **[BUILD_SUCCESS.md](BUILD_SUCCESS.md)** - Build success report
- **[.env.example](.env.example)** - Environment variables template
- **[CLAUDE.md](CLAUDE.md)** - This file (project documentation)

---

**Last Updated**: October 3, 2025
**Total Apps**: 128
**Total Pages**: 411
**Build Status**: ✅ All checks passing
**Dependencies**: 17 packages (optimized from 70)
