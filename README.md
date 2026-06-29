# ajfisher.me

Website for ajfisher.me

The site is built with [Astro](https://astro.build/) and lives in `site.v5/`.
Astro 6 requires Node `>=22.12.0`; CI builds the site with Node 22.
The Lambda@Edge handlers in `app/` still run on `nodejs20.x` as configured in
`infra/application/lambda.tf`.

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

Artifacts are written to `site.v5/dist`.

## Cleaning

Remove installed modules and caches with:

```bash
make clean
```

## Deployment

Deployments are normally performed by GitHub Actions which sync the built
site to S3. If you have AWS credentials configured you can also run:

```bash
make deploy
```

For front matter schema details and content notes see
[site.v5/README.md](site.v5/README.md).
