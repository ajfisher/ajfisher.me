# Codex Contributor Guide for `site/`

This directory contains the Gatsby-based website. Follow these additional guidelines when modifying files here.

## Development

- Use `make dev` from the repository root to run the local Gatsby server.
- Run `make test` before committing to execute ESLint and Jest checks.
- Format code with `npm run format` or `npx prettier --write`. Prettier settings are defined in the project.
- Node 20 is the expected runtime for development and CI.

## Code conventions

- Prefer functional React components with PropTypes for component props.
- Gatsby configuration and plugins use CommonJS modules; application code in `src/` uses modern ES modules.
- Tests live under `tests/` and use Jest with React Testing Library. Keep coverage levels at least the same as before your change.

Adhering to these practices keeps the site build and tests reliable.
