# Repository Guide for AI Contributors

This project hosts the source code and infrastructure for **ajfisher.me**. It is split across several key directories:

- `site/` – Gatsby based website including tests and custom plugins.
- `app/` – Lambda@Edge handlers used by CloudFront.
- `infra/` – Terraform configuration for provisioning infrastructure.
- `utils/` – Miscellaneous scripts primarily used for deployment tasks.
- `.github/workflows/` – GitHub Actions pipelines for CI/CD.

## Development workflow

Use the provided `Makefile` to perform common tasks. Run `make help` to list all targets. The most frequently used ones are:

- `make install` – install all dependencies (also installs plugin modules).
- `make dev` – run the Gatsby development server.
- `make lint` – run ESLint across the project.
- `make test` – run linting and the Jest test suite with coverage.
- `make build` – produce a production build to `site/public`.
- `make deploy` – sync the built site to S3 (normally handled by CI).

Node 20 is the reference runtime version and is used in CI. Use this or a newer release locally.

## Code quality

- Ensure `make test` passes before committing. This runs ESLint and all Jest tests with coverage enabled. Coverage should not drop when adding or modifying tests.
- Keep infrastructure and build scripts up to date and consistent with Terraform and Gatsby best practices.

## Commit and PR guidelines

- Use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages.
- Pull request descriptions should summarise the changes and include the results of `make test`.

Following these practices will keep CI passing and maintain the reliability of the repository.
