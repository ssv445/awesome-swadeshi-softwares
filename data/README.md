# Contributing to Indian Software Directory

## How to Add Software

1. **Fork this repository**
2. **Create a new JSON file** in the appropriate category folder
3. **Add your software entry** following the format below
4. **Submit a Pull Request**

## File Structure

Create your JSON file in the appropriate category folder:

```
data/
├── business/           # Business & productivity tools
├── finance/           # Payments, accounting, banking
├── education/         # Learning platforms, educational tools
├── e-commerce/        # Online shopping, marketplaces
├── transportation/    # Ride-hailing, logistics
├── food-delivery/     # Food ordering, restaurant platforms
├── gaming/            # Games, fantasy sports
├── development/       # Developer tools, IDEs
├── design/            # Design tools, creative software
└── communication/     # Chat, video conferencing
```

## Software Entry Format

Create a file named `your-software-name.json` (use lowercase, replace spaces with hyphens):

```json
{
  "name": "Your Software Name",
  "description": "Brief description of what your software does",
  "website": "https://yourwebsite.com",
  "category": "Business",
  "alternatives": ["International Software 1", "International Software 2"],
  "pricing": "Free|Freemium|Paid",
  "company": "Your Company Name",
  "location": "City, State"
}
```

## Example

File: `data/business/my-crm.json`

```json
{
  "name": "My CRM",
  "description": "Customer relationship management platform for small businesses",
  "website": "https://mycrm.in",
  "category": "Business",
  "alternatives": ["Salesforce", "HubSpot"],
  "pricing": "Freemium",
  "company": "My CRM Technologies",
  "location": "Mumbai"
}
```

## Guidelines

- **Must be Indian**: Software must be developed by an Indian company or founded in India
- **Working Product**: Software must be live and functional
- **Clear Description**: Write a concise description of what the software does
- **Valid Website**: Provide a working website URL
- **Accurate Alternatives**: List well-known international software that your product replaces
- **Honest Pricing**: Use Free (completely free), Freemium (free with paid features), or Paid
- **File Naming**: Use lowercase, replace spaces with hyphens (e.g., `my-awesome-software.json`)
- **Correct Folder**: Place in the appropriate category folder

## Available Categories

- **business** - CRM, productivity, project management
- **finance** - Payments, accounting, banking
- **education** - Learning platforms, educational tools
- **e-commerce** - Online shopping, marketplaces
- **transportation** - Ride-hailing, logistics
- **food-delivery** - Food ordering, restaurant platforms
- **gaming** - Games, fantasy sports
- **development** - Developer tools, IDEs
- **design** - Design tools, creative software
- **communication** - Chat, video conferencing

## URL Structure

Your software will be accessible at:
- Homepage: All software listed
- Category page: `https://site.com/business` (for business category)
- Search and filtering available on all pages

## Review Process

- PRs will be reviewed for accuracy and completeness
- Software must meet the guidelines above
- Duplicate entries will be rejected
- File must be in correct category folder
- JSON must be valid
- Maintainers may edit descriptions for clarity

## Questions?

Open an issue if you have questions about contributing.