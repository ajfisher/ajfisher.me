# GitHub Copilot Instructions for ajfisher.me

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Repository Overview

This is a Gatsby-based personal website and blog for ajfisher.me. The repository is split across several key directories:

- `site/` – Main Gatsby website with tests and custom plugins
- `app/` – Lambda@Edge handlers for CloudFront
- `infra/` – Terraform infrastructure configuration  
- `utils/` – Deployment scripts and utilities
- `.github/workflows/` – CI/CD pipeline configuration

## Working Effectively

### Installation Process
Bootstrap the repository with these exact commands:
```bash
cd /path/to/repository
make install
```
This installs dependencies for the main site and two custom plugins. **Installation takes ~75 seconds** and will show deprecation warnings (this is expected and does not affect functionality).

### Essential Development Commands
**CRITICAL: Use these exact command paths or they will fail:**

- **Development server**: `cd site && ./node_modules/.bin/gatsby develop -H 0.0.0.0`
  - **NEVER CANCEL**: Development server startup takes ~60 seconds. Set timeout to 120+ seconds.
  - Access at `http://localhost:8000` and GraphiQL at `http://localhost:8000/___graphql`
  
- **Production build**: `make build` 
  - **NEVER CANCEL**: Build takes ~7 minutes. Set timeout to 15+ minutes.
  - Creates optimized site in `site/public/`
  
- **Linting and testing**: `make test`
  - **Timing**: Takes ~8 seconds. Set timeout to 30+ seconds.
  - Runs ESLint followed by Jest tests with 100% coverage requirement
  - **Must pass before committing** or CI will fail

### Development Workflow Requirements

**Node Version**: Use Node 20 (confirmed available and required for CI compatibility).

**Build Process**: 
1. Run `make install` (first time or after dependency changes)
2. Run `make test` to ensure code quality
3. Run `make build` to create production artifacts
4. Optionally use `make dev` for development server (requires manual path fix - see below)

### Known Issues and Workarounds

**Makefile Command Issue**: The `make dev` and `make serve` commands fail because `gatsby` is not in PATH. Use this workaround:
```bash
# Instead of: make dev
cd site && ./node_modules/.bin/gatsby develop -H 0.0.0.0

# Instead of: make serve  
cd site && ./node_modules/.bin/gatsby serve -H 0.0.0.0
```

**Package Security Warnings**: npm install shows 30+ vulnerabilities and deprecation warnings. These are expected from Gatsby dependencies and do not affect functionality. Do not attempt to fix these unless specifically required.

## Validation Requirements

**Always validate changes by testing these complete scenarios:**

1. **Build Validation**: 
   - Run `make test` (must show 100% coverage)
   - Run `make build` (must complete without errors)
   - Verify `site/public/` contains built artifacts

2. **Development Server Validation**:
   - Start dev server with proper timeout
   - Navigate to `http://localhost:8000`
   - Click through to individual blog posts
   - Verify navigation, images, and styling work correctly
   - Test at least one complete user journey (home → post → navigation)

3. **Code Quality**: 
   - ESLint must pass (part of `make test`)
   - Jest tests must maintain 100% coverage
   - Run `cd site && npm run format` before committing

## Repository Structure Details

### Site Directory (`site/`)
- **Main Gatsby application** with React components and content
- **Custom plugins**: `gatsby-transformer-remark-tags/` and `gatsby-remark-transformer-pullquotes/`
- **Tests**: Located in `site/tests/` using Jest and React Testing Library
- **Content**: Markdown posts in `site/src/content/posts/`
- **Configuration**: Uses CommonJS modules (gatsby-config.js, gatsby-node.js)

### Testing Framework
- **Jest** with 100% coverage requirement in all areas
- **React Testing Library** for component testing  
- **ESLint** with React and Jest plugins
- Test files follow pattern: `*.test.js` in `tests/` directory

### Build Artifacts
- **Development**: `.cache/` directory (excluded from git)
- **Production**: `site/public/` directory with static assets
- **Images**: Processed by gatsby-plugin-sharp (adds significant build time)

## Common File Locations

**Configuration Files**:
- `site/gatsby-config.js` - Gatsby configuration
- `site/jest.config.js` - Jest testing configuration  
- `site/eslint.config.mjs` - ESLint configuration
- `Makefile` - Build automation scripts

**Key Source Files**:
- `site/src/components/` - React components
- `site/src/templates/` - Gatsby page templates  
- `site/src/content/posts/` - Blog post markdown files
- `site/tests/` - All test files

**Infrastructure**:
- `.github/workflows/build.yml` - CI/CD pipeline
- `infra/` - Terraform configuration for AWS deployment
- `app/` - Lambda@Edge functions

## Deployment Notes

**CI/CD**: Automated via GitHub Actions on push to master branch
**Target**: AWS S3 + CloudFront distribution  
**Manual Deploy**: `make deploy` (requires AWS credentials)

## Troubleshooting

**Common Issues**:
1. **gatsby command not found**: Use full path `./node_modules/.bin/gatsby`
2. **Build timeouts**: Increase timeout to 15+ minutes for builds, 2+ minutes for dev server
3. **Test failures**: Ensure 100% coverage is maintained when modifying code
4. **Install issues**: Clean with `make clean` then `make install`

**Performance Notes**:
- Image processing during build is the primary time consumer
- Development server warm-up includes image optimization
- Gatsby caching significantly improves subsequent builds

Follow these instructions precisely to work effectively with this codebase. The timing requirements and command paths are critical for success.