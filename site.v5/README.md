# site.v5 (Astro)

Astro-based site for ajfisher.me that lives in `site.v5/`.

## Requirements

- Node.js 20+ (matches CI)
- npm

## Install

```bash
make install
# or
npm install
```

## Common commands (Makefile)

```bash
make dev        # Start the Astro dev server
make build      # Build the production site (outputs to dist/)
make preview    # Preview the production build
make lint       # Run ESLint
make sync       # Sync Astro content collections/types
make check      # Run Astro type check
make test       # Run lint + type check
```

## npm scripts and Astro CLI

```bash
npm run dev
npm run build
npm run preview
npm run lint

npx astro sync
npx astro check
```

## Content and assets

- Static assets are served from `../content` because `publicDir` is mapped
  there in `astro.config.mjs`.
- Markdown content collections live in `../content/text/posts` and
  `../content/text/pages`, configured in `src/content.config.mjs`.
- Build output goes to `dist/`, and Astro generates `.astro/` during builds.

## Frontmatter

Content in `../content/text/posts` and `../content/text/pages` uses YAML
frontmatter validated by `src/content.config.mjs`.

Required fields:
- `title`: string
- `slug`: string (used in URLs)
- `date`: `YYYY-MM-DD hh:mm:ss+tz` (coerced to a Date)

Optional fields:
- `author`: string (defaults to `ajfisher`)
- `layout`: `post` | `post.hbt` | `page` | `page.hbt`
- `excerpt`, `twitter_excerpt`: string
- `featureimage`, `listimage`: image paths (relative to the markdown file)
- `imageby`, `imagelink`: string
- `featured`, `smalltitle`, `largetitle`: boolean
- `tags`: comma-separated string (converted into tag objects)
- `readingTime`, `wordCount`: injected by `src/lib/remark-reading-time.mjs`

Notes:
- Post URIs are built as `YYYY/MM/DD/<slug>/`; pages use `<slug>/`.
- Fields outside the schema are ignored by content collection parsing.

## Repo context

For overall repo structure and deployment details, see `../README.md`.
