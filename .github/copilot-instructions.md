# GitHub Copilot Instructions for ajfisher.me

Always reference these instructions first, then inspect the repository when
details appear to have changed.

## Repository Overview

This repository contains the Astro-based personal website for `ajfisher.me`
plus the CloudFront Lambda@Edge handlers and Terraform infrastructure.

- `site.v5/` - Astro 6 static site.
- `content/` - Shared markdown content, images, and static assets.
- `app/` - Lambda@Edge handlers for CloudFront.
- `infra/` - Terraform infrastructure configuration.
- `utils/` - Deployment and maintenance scripts.
- `.github/workflows/` - CI/CD workflow configuration.

## Runtime Versions

The site build runtime and edge handler runtime are intentionally different.

- Use Node `>=22.12.0` for `site.v5/` development, tests, and builds. Astro 6
  requires this, and `.github/workflows/astro.build.yml` uses Node 22.
- The Lambda@Edge handlers in `app/` still target Node 20 because
  `infra/application/lambda.tf` sets their runtime to `nodejs20.x`.
- Do not change the Lambda runtime when updating site dependencies unless the
  task explicitly asks for an infrastructure runtime migration.

## Working Effectively

Bootstrap the repository with:

```bash
make install
```

Common commands from the repository root:

```bash
make dev       # Run the Astro development server
make lint      # Run ESLint across the site
make test      # Run app tests, site lint, and Astro type checks
make build     # Build the production site into site.v5/dist
make preview   # Preview the production build
```

Useful site-local commands:

```bash
cd site.v5
make sync      # Sync Astro content collections/types
make check     # Run Astro type checks
make build     # Build the static site
```

## Validation Requirements

Before publishing code changes:

1. Run `make test` from the repository root.
2. Run `make build` for site or content changes.
3. For RSS-related changes, verify `site.v5/dist/rss.xml` is generated.
4. For Lambda handler changes, keep the Node 20 runtime target in mind and add
   focused tests under `app/tests/` when behavior changes.

## Site Notes

- Astro source lives in `site.v5/src/`.
- Build output is `site.v5/dist/`.
- Static assets are served from `content/` because `site.v5/astro.config.mjs`
  maps `publicDir` there.
- Content collections are configured in `site.v5/src/content.config.mjs`.
- The RSS endpoint lives at `site.v5/src/pages/rss.xml.js`.

## Infrastructure Notes

- Deployments are normally performed by GitHub Actions on pushes to `master`.
- The site deploy syncs `site.v5/dist/` to S3.
- Lambda@Edge runtime configuration lives in `infra/application/lambda.tf`.

Follow the current `Makefile` targets rather than older command paths.
