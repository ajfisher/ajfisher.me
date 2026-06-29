# Codex Contributor Guide for `app/`

This directory holds the Lambda@Edge handlers deployed with CloudFront.

## Development

- Functions target Node 20 (`nodejs20.x`) as defined in
  `infra/application/lambda.tf`. This is separate from the Astro site build
  runtime, which requires Node `>=22.12.0`.
- Use Node 20 locally when validating Lambda@Edge runtime compatibility.
- Run `make test` from the repository root before committing to ensure linting
  passes.
- All handler files use ES modules and export a `handler` function.
- Keep functions concise and free of unused code. Avoid adding dependencies unless absolutely necessary.

## Testing

- Tests for these handlers live in the site test suite. Add new tests where practical to maintain coverage.

Following these instructions keeps the edge functions small and maintainable.
