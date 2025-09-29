# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **simplified** "Indian Software Directory" - a static Next.js application that showcases Indian software alternatives to popular international tools. The focus is on simplicity and ease of contribution via GitHub PRs.

## Technology Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1.9 with shadcn/ui components
- **UI Components**: shadcn/ui (New York style) + Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Package Manager**: pnpm
- **Data Storage**: Static JSON files in `/data/` directory

## Development Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Simplified Architecture

### Pages & Routing
- `/app/page.tsx` - Homepage with all software listed, search, and category filtering
- `/app/about/page.tsx` - Contribution guidelines and instructions
- `/app/[category]/page.tsx` - Dynamic category pages (e.g., `/business`, `/finance`)
- `/app/alternatives/page.tsx` - General alternatives listing page
- `/app/alternatives/[slug]/page.tsx` - Individual alternative pages
- `/app/why-swadeshi/page.tsx` - About the Swadeshi movement
- `/app/client-page.tsx` - Client-side homepage component

### Data Structure (Nested JSON Files)
```
/data/
├── business/           # Business & productivity tools
│   ├── zoho-suite.json
│   └── freshworks.json
├── finance/           # Payments, accounting, banking
│   ├── razorpay.json
│   └── paytm.json
├── education/         # Learning platforms
│   └── byjus.json
└── README.md          # Contribution guidelines
```

### Software Data Format (Individual JSON files)
```json
{
  "name": "Software Name",
  "description": "Brief description",
  "website": "https://example.com",
  "category": "Business",
  "alternatives": ["International Software 1", "International Software 2"],
  "pricing": "Free|Freemium|Paid",
  "company": "Company Name",
  "location": "City, State",
  "faviconUrl": "https://example.com/favicon.ico" // Optional: Custom favicon URL
}
```

## PR-Based Contribution Workflow

1. **Users fork the repository**
2. **Create new JSON file** in appropriate category folder (e.g., `data/business/my-software.json`)
3. **Submit a Pull Request**
4. **Maintainers review and merge**

No forms, no database, no admin interface - just simple file creation.

## Component Architecture

The application now follows a modern, maintainable architecture with centralized theme management and reusable components:

### Layout Components (`/components/layout/`)
- **`AppShell.tsx`** - Main layout wrapper used by all pages
- **`Header.tsx`** - Unified header with navigation, logo, and CTA buttons
- **`Footer.tsx`** - Consistent footer across all pages

### Core Components (`/components/`)
- **`product-card.tsx`** - Reusable card component for displaying software
- **`favicon.tsx`** - Handles favicon display with fallbacks
- **`ashoka-chakra.tsx`** - Indian national emblem SVG component

### UI Components (`/components/ui/`)
- shadcn/ui components (Button, Card, Badge, Input, etc.)
- **`SearchBox.tsx`** - Search component with dropdown suggestions and keyboard navigation

### Library Files (`/lib/`)
- **`theme.ts`** - Centralized theme system with Indian flag colors and design tokens
- **`constants.ts`** - Application constants, navigation links, and configuration
- **`data.ts`** - Client-side utilities and type definitions
- **`server-data.ts`** - Server-side functions to read JSON files at build time
- **`search.ts`** - Client-side search utilities with intelligent scoring

### Configuration Files
- **`/data/categories.json`** - Centralized category metadata with icons and descriptions
- **`/scripts/generate-search-index.ts`** - Build-time search index generation script
- **`/public/search-index.json`** - Generated search index (auto-generated on build)

### Architecture Patterns
- **Unified Layout**: All pages use `AppShell` for consistent header/footer
- **Theme System**: Centralized design tokens in `theme.ts`
- **Search Architecture**: Build-time index generation for fast client-side search
- **Component Composition**: Reusable components with consistent props interface
- **Static Generation**: All pages pre-built at build time with optimized performance

### Key Functions
- `getAllSoftware()` - Scans all category folders and returns combined array
- `getSoftwareByCategory(slug)` - Returns software for specific category
- `getCategories()` - Returns list of available category folders
- `getCategoryDisplayName(slug)` - Converts slug to display name
- `getAlternativeUrl(tool)` - Generates URL for alternative pages
- `searchApps(query)` - Client-side search with intelligent ranking
- `generateSearchIndex()` - Build-time search index creation

## Key Features

### Search & Navigation
- **Fast Client-Side Search**: Build-time indexed search with intelligent scoring and ranking
- **Keyboard Navigation**: Arrow keys, Enter, and Escape support in search dropdown
- **Search Suggestions**: Real-time dropdown with app icons and descriptions
- **Category Filtering**: Dedicated category pages with SEO-friendly URLs

### Performance & UX
- **Static Generation**: All pages pre-built at build time for optimal performance
- **Unified Theme**: Consistent Indian flag-inspired color scheme across all pages
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Build-Time Search Index**: 239KB search index auto-generated from 128+ apps

### Layout & Components
- **AppShell Layout**: Consistent header and footer across all pages
- **Reusable Components**: ProductCard, SearchBox, Header, Footer with consistent APIs
- **Direct External Links**: All app links go directly to external websites
- **Favicon Support**: Automatic + manual favicon handling with fallbacks

## URL Structure

- `/` - Homepage with all software
- `/business` - Business software only
- `/finance` - Finance software only
- `/education` - Education software only
- `/alternatives` - General alternatives page
- `/alternatives/[slug]` - Individual alternative pages (e.g., `/alternatives/salesforce`)
- `/why-swadeshi` - About the Swadeshi movement
- etc. (category pages automatically generated for all folders in `/data/`)

## Important Configuration

### Next.js Config (next.config.mjs)
- ESLint and TypeScript build errors are ignored in production (`ignoreDuringBuilds: true`)
- Images are unoptimized (`unoptimized: true`)

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
- **Community-driven**: All additions via GitHub PRs
- **Consistent Theme**: Indian flag colors (saffron, white, green) throughout the application
- **Maintainable**: Centralized constants, reusable components, unified layout system

## Removed Complexity

The following were removed for simplicity:
- Admin interface
- Individual software detail pages
- Category/tag pages with routing
- Complex data models and TypeScript interfaces
- Submission forms
- Database simulation
- User authentication
- Loading states
- Mock data functions

## Adding New Software

Contributors should:
1. Create individual JSON files in appropriate category folders
2. Follow the exact JSON format
3. Use lowercase filenames with hyphens (e.g., `my-software.json`)
4. Ensure software is Indian-developed
5. Provide working website URLs
6. Place in correct category folder
7. List genuine international alternatives

## Data Loading & Structure

### Current Categories (auto-discovered from `/data/` folders)
Based on the file structure, these categories are available:
- `business` - CRM, HR, Analytics tools (Zoho, Freshworks, WebEngage, etc.)
- `finance` - Payment gateways, billing (Razorpay, Paytm, Chargebee)
- `communication` - Messaging, video conferencing (Jio Meet, Exotel, Haptik)
- `productivity` - Office tools, cloud storage (Zoho Workplace, Digiboxx)
- `development` - Developer tools, cloud platforms (Postman, BrowserStack, MapMyIndia)
- `e-commerce` - E-commerce platforms and logistics (Flipkart, Dukaan, Shiprocket)
- `education` - Learning platforms (BYJU'S, Unacademy)
- `entertainment` - Streaming, music (Hotstar, JioSaavn, Gaana)
- `social-networking` - Social platforms (ShareChat, Elyments)
- `creative` - Design and creative tools (Creately, Simplified)
- `utilities` - Browsers, utilities (Epic Browser, JioSphere)

### Data Loading Functions (in `/lib/server-data.ts`)
- All functions are server-side only (use Node.js fs module)
- Data is read at build time for static generation
- Graceful error handling for missing files/directories

## Development Workflow

### Adding New Software Entries
1. Create a new JSON file in the appropriate `/data/[category]/` folder
2. Follow the exact Software interface format from `/lib/data.ts`
3. Use kebab-case for filename (e.g., `my-awesome-tool.json`)
4. Run `pnpm dev` to test locally
5. Build and verify with `pnpm build`

### TypeScript Interface
```typescript
interface Software {
  name: string
  description: string
  website: string
  category: string
  alternatives: string[]
  pricing: string
  company: string
  location: string
  faviconUrl?: string // Optional: Custom favicon URL
}
```

### Favicon Support
The application supports both automatic and manual favicon handling:

**Automatic Favicon (Default)**:
- Uses Google's favicon API: `https://www.google.com/s2/favicons?sz={size}&domain={domain}`
- Automatically extracts domain from website URL
- Falls back to Ashoka Chakra icon on error

**Manual Favicon (Optional)**:
- Add `faviconUrl` field to JSON files
- Provide direct URL to favicon (e.g., `"faviconUrl": "https://example.com/favicon.ico"`)
- Takes priority over automatic favicon generation
- Useful for better quality icons or faster loading

**Implementation**:
- Favicon component (`/components/favicon.tsx`) handles both modes
- Client-side error handling with React state
- Lazy loading for performance

### Testing Changes
- Run `pnpm dev` for development server
- Test category pages at `/[category-name]`
- Test search functionality on homepage
- Verify alternative pages work at `/alternatives/[tool-name]`
- Run `pnpm build` to ensure static generation works

### Build Process
The build process now includes automatic search index generation:

```bash
# Search index is automatically generated before build via package.json scripts
pnpm build  # This runs: tsx scripts/generate-search-index.ts && next build
```

**Search Index Generation**:
- Scans all JSON files in `/data/` directories
- Creates tokenized entries with name, description, alternatives, and category
- Generates `/public/search-index.json` (239KB for 128 apps)
- Enables fast client-side search without API calls

### Theme System (`/lib/theme.ts`)
The application uses a centralized theme system with Indian flag-inspired colors:

```typescript
export const theme = {
  colors: {
    primary: {
      saffron: '#FF9933',    // Indian flag saffron
      white: '#FFFFFF',      // Indian flag white
      green: '#138808',      // Indian flag green
      navy: '#000080'        // Ashoka Chakra blue
    }
  },
  spacing: { /* ... */ },
  typography: { /* ... */ },
  shadows: { /* ... */ }
}
```

**Color Usage**:
- **Saffron (#FF9933)**: Accent colors, gradients, highlights
- **Green (#138808)**: Borders, success states, secondary accents
- **Navy Blue (#000080)**: Primary buttons, links, Ashoka Chakra
- **White (#FFFFFF)**: Backgrounds, cards, clean spaces