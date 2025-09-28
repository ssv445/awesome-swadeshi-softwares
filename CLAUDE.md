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
- **Package Manager**: pnpm (evidenced by pnpm-lock.yaml)

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

### Pages (2 main pages + dynamic routing)
- `/app/page.tsx` - Homepage with all software listed, search, and category filtering
- `/app/about/page.tsx` - Contribution guidelines and instructions
- `/app/[category]/page.tsx` - Dynamic category pages (e.g., `/business`, `/finance`)

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
  "location": "City, State"
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
- `/lib/data.ts` - Server-side functions to read JSON files
- Path alias `@/*` maps to project root
- Server components for data loading, client components for interactivity
- Dynamic category pages with static generation

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
- etc. (automatically generated for all category folders)

## Important Configuration

### Next.js Config
- ESLint and TypeScript build errors are ignored in production (`ignoreDuringBuilds: true`)
- Images are unoptimized (`unoptimized: true`)

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

## Data Loading

- Server-side functions in `/lib/data.ts` read all JSON files at build time
- `getAllSoftware()` - Scans all category folders and returns combined array
- `getSoftwareByCategory(slug)` - Returns software for specific category
- `getCategories()` - Returns list of available category folders
- All data is statically generated, no runtime database queries