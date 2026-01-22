# PDF.live Form Examples

Example project querying WPGraphQL API to display FormPage custom post types with ACF fields, taxonomies, and Yoast SEO.

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

Open http://localhost:4321

## What It Does

Queries `https://pdf.live/resources/graphql` to fetch:
- **ACF Fields** - shortName, formName, descriptions, steps, formPdfs (with thumbnails)
- **Taxonomies** - FormPageJurisdiction (location), FormPageCategory
- **Yoast SEO** - title, meta description, OpenGraph tags/images

Displays PDFs in filterable archive with pagination (20 per page).

## Routes

| Route | Example | Description |
|-------|---------|-------------|
| `/` | - | Home page |
| `/forms` | - | All PDFs across all jurisdictions |
| `/forms/[jurisdiction]` | `/forms/federal` | PDFs filtered by location |
| `/forms/[jurisdiction]/[category]` | `/forms/federal/tax` | PDFs filtered by location + category |
| `/forms/[jurisdiction]/[category]/[shortName]` | `/forms/federal/tax/1040` | Individual form page by short name |

### Form Pages

Form pages use the `shortName` field as URL (e.g., `1040`, `w-2`, `schedule-c`).

**Multiple PDFs/Years:**
- Default: Shows first PDF
- Use `?form-label=` to view specific versions
- Example: `/forms/federal/tax/1040?form-label=2024`
- Version selector pills displayed when multiple PDFs available

**Each page shows:**
- All ACF fields
- Breadcrumbs
- Taxonomy links
- GraphQL query used to fetch data (displayed at bottom)

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- Astro (SSR with Node.js adapter)
- TypeScript
- WPGraphQL
