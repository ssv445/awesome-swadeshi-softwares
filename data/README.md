# Contributing to Swadeshi Apps

## How to Add Software

1. **Fork this repository**
2. **Create a new JSON file** in the appropriate category folder
3. **Follow the format below** (validated automatically)
4. **Submit a Pull Request**

## File Structure

```
data/
├── business/           # CRM, HR, Analytics
├── finance/            # Payments, Banking, Billing
├── communication/      # Messaging, Video Calls
├── development/        # Developer Tools, Cloud
├── productivity/       # Office Tools, Storage
├── e-commerce/         # Online Stores, Logistics
├── education/          # Learning Platforms
├── entertainment/      # Streaming, Music
├── social-networking/  # Social Platforms
├── creative/           # Design Tools
├── utilities/          # Browsers, System Tools
└── hosting/            # Web Hosting
```

## Software Entry Format

File name: `your-software-name.json` (lowercase, hyphens)

```json
{
  "name": "Software Name",
  "description": "Brief description (20-500 characters)",
  "website": "https://example.com",
  "category": "Business",
  "alternatives": ["International Tool 1", "International Tool 2"],
  "pricing": "Free|Freemium|Paid|Open Source",
  "company": "Company Name",
  "location": "City, State",
  "faviconUrl": "https://example.com/favicon.ico"
}
```

**Note**: All fields required except `faviconUrl` (optional)

## Validation Rules

✅ **Description**: 20-500 characters
✅ **Pricing**: Must be Free, Freemium, Paid, or Open Source
✅ **Website**: Valid URL format
✅ **Alternatives**: Array (can be empty)

Run `pnpm validate` to check before submitting.

## Guidelines

- Software must be developed by an Indian company
- Must be live and functional
- Accurate descriptions and alternatives
- No duplicate entries
- Family-friendly content only

## Review Process

- Automated validation checks all entries
- PRs reviewed for accuracy and completeness
- Maintainers may edit for clarity
- Invalid JSON or missing fields will be rejected

## Questions?

Open an issue on [GitHub](https://github.com/ssv445/awesome-swadeshi-softwares/issues)
