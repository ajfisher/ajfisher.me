# site.v5 (Astro)

Astro-based rebuild of ajfisher.me that lives in `site.v5/` alongside the
legacy Gatsby site.

## Requirements

- Node.js 20+ (matches CI)
- npm

## Install

`bash make install # or npm install `

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

## Repo context

For overall repo structure, deployment details, and the legacy Gatsby site, see
`../README.md`.
