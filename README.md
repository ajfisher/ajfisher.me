# ajfisher.me

Website for ajfisher.me

The site is built with [Gatsby](https://www.gatsbyjs.com/) and requires a modern Node.js runtime. Node 20 is used in CI so use that or a newer release.

## Install

Clone the repo and install all dependencies:

```bash
git clone https://github.com/ajfisher/ajfisher.me
cd ajfisher.me
make install
```

## Development

Start the development server with:

```bash
make dev
```

## Build

To generate the production build run:

```bash
make build
```

Artifacts are written to `site/public`.

## Cleaning

Remove installed modules and caches with:

```bash
make clean
```

## Deployment

Deployments are normally performed by GitHub Actions which sync the built site to S3. If you have AWS credentials configured you can also run:

```bash
make deploy
```

For information on content front matter and additional details see [site/README.md](site/README.md).
