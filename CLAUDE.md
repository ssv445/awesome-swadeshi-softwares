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

- `/components/ui/` - shadcn/ui components (Button, Card, Badge, Input, etc.)
- `/lib/data.ts` - Client-side utilities and type definitions
- `/lib/server-data.ts` - Server-side functions to read JSON files at build time
- Path alias `@/*` maps to project root (configured in components.json)
- Server components for data loading, client components for interactivity
- Dynamic category pages with static generation

### Key Functions
- `getAllSoftware()` - Scans all category folders and returns combined array
- `getSoftwareByCategory(slug)` - Returns software for specific category
- `getCategories()` - Returns list of available category folders
- `getCategoryDisplayName(slug)` - Converts slug to display name
- `getAlternativeUrl(tool)` - Generates URL for alternative pages

## Key Features

- **Search**: Real-time filtering by name, description, or alternatives
- **Category Pages**: Individual URLs for each category (e.g., `/business`, `/finance`)
- **Dynamic Routing**: Automatically generates pages for all categories
- **Static Generation**: All pages pre-built at build time
- **Simple Cards**: Software displayed in clean card layout
- **Direct Links**: All software links go directly to external websites
- **Responsive**: Mobile-friendly design

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
- **Static**: No database, no server-side processing
- **Community-driven**: All additions via GitHub PRs
- **Fast**: Static generation, client-side filtering

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