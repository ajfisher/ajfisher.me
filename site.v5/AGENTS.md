# Agent Notes for site.v5

This file adds agent-specific guidance for the Astro site. Follow the
repo-level guidance in `../AGENTS.md` as well.

## Workflow basics

- Use the local `Makefile` targets (`make dev`, `make build`, `make preview`,
  `make lint`, `make check`, `make test`, `make sync`).
- The equivalent local scripts are `npm run dev|build|preview|lint` and `npx
  astro sync|check` when you need them.
- This Astro site serves static assets from `../content` and loads Markdown
  from `../content/text/posts` and `../content/text/pages`.

## GitHub and branching

- Use the local `gh` CLI to query GitHub issues/PRs when needed (for example:
  `gh issue view <id>`, `gh pr view <id>`).
- Work on a branch for all changes.
- Use Conventional Commits syntax for branch names and commits. Branch naming
  should mirror the commit type, for example:
  - `feat/add-search`
  - `fix/header-overflow`
  - `docs/update-readme`
  - `chore/bump-astro`

## Commit hygiene

- Keep commit messages in Conventional Commits format (for example: `feat: add
  tag archive page`).
- Avoid committing build artifacts like `dist/` or `.astro/` unless explicitly
  asked.
