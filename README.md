# 🇮🇳 Awesome Swadeshi Apps

A curated directory of Indian software alternatives to help you discover and adopt quality solutions built by Indian innovators. Support **Swadeshi** movement and **Atmanirbhar Bharat** through technology choices.

🔗 **Live Site**: [swadeshiapps.com](https://swadeshiapps.com)

## 🎯 Mission

Promote Indian software innovation by helping users discover quality alternatives to international tools. Every software choice is a vote for the ecosystem we want to build.

## 📊 Statistics

- **128+** Indian software alternatives
- **12** categories
- **411** statically generated pages
- **43KB** optimized search index

## 📂 Categories

- **Business** - CRM, HR, Analytics
- **Finance** - Payments, Banking, Billing
- **Communication** - Messaging, Video Calls
- **Development** - Developer Tools, Cloud
- **Productivity** - Office Tools, Storage
- **E-commerce** - Online Stores, Logistics
- **Education** - Learning Platforms
- **Entertainment** - Streaming, Music
- **Creative** - Design Tools
- **Social Networking** - Social Platforms
- **Utilities** - Browsers, System Tools
- **Hosting** - Web Hosting

## 🚀 Why Choose Indian Software?

- **Economic Growth** - Support Indian companies and job creation
- **Data Sovereignty** - Keep your data within Indian borders
- **Local Understanding** - Products built for Indian market needs
- **Better Support** - Customer service in your timezone
- **Self-Reliance** - Reduce dependency on foreign software

## 🤝 Contributing

We welcome contributions! See [data/README.md](data/README.md) for detailed guidelines.

### Quick Start

1. Fork this repository
2. Create JSON file in `/data/[category]/your-app.json`
3. Follow the format (validated automatically)
4. Submit a Pull Request

### Required Fields

```json
{
  "name": "Software Name",
  "description": "Brief description (20-500 chars)",
  "website": "https://example.com",
  "category": "Business",
  "alternatives": ["Tool 1", "Tool 2"],
  "pricing": "Free|Freemium|Paid|Open Source",
  "company": "Company Name",
  "location": "City, State"
}
```

Run `pnpm validate` to check your entry before submitting.

## 🎨 Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4.1.9
- **UI**: shadcn/ui + Radix UI (7 components)
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Data**: Static JSON with build-time validation
- **Package Manager**: pnpm

## ✨ Features

- 🔍 **Fast Search** - Build-time indexed search (43KB)
- 📱 **Mobile-First** - Fully responsive design
- 🎨 **Indian Theme** - Saffron, white, green color scheme
- 🚀 **Static Generation** - All 411 pages pre-built
- ⚡ **Optimized** - Fast navigation and loading
- 🔗 **SEO Friendly** - Comprehensive metadata + JSON-LD
- ✅ **Validated** - Automated data validation
- 🛡️ **Error Handling** - Comprehensive error boundaries

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Validate data files (128 JSON files)
pnpm validate

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Made with ❤️ in India** | Supporting **Atmanirbhar Bharat**
