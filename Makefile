.PHONY: help install install-site clean clean-site clean-meta dev preview post lint test pre-commit build deploy

help:
	@echo "install:         Install site dependencies"
	@echo "install-site:    Install site dependencies"
	@echo "clean:           Completely clean everything up"
	@echo "clean-site:      Clean build artifacts and dependencies for site"
	@echo "clean-meta:      Remove stale root node_modules"
	@echo "dev:             Run the Astro development server"
	@echo "preview:         Preview the production build"
	@echo "post:            Scaffold a new post"
	@echo "lint:            Lint the site"
	@echo "test:            Run app tests, script tests, lint, and Astro type checks"
	@echo "pre-commit:      Run lint for site"
	@echo "embeddings:      Run the embeddings similarity script"
	@echo "build:           Build the site for deploy"
	@echo "deploy:          Deploy the site to S3"

clean-site:
	@echo 'Cleans all site build artifacts and dependencies'
	cd ./site.v5 && make clean
	@echo 'Files cleaned up'

clean-meta:
	@echo 'Removes stale root node_modules'
	rm -rf node_modules
	@echo 'Files cleaned up'

clean: clean-site clean-meta

install-site:
	@echo 'Installs the site dependencies'
	cd ./site.v5 && make install
	@echo 'Site dependencies installed'

install: install-site

lint:
	cd ./site.v5 && make lint

test:
	node --test app/tests/*.test.mjs
	cd ./site.v5 && make test

dev:
	cd ./site.v5 && make dev

preview:
	cd ./site.v5 && make preview

post:
	npm run new-post -- $(ARGS)

embeddings:
	cd ./utils/embeddings && make build

pre-commit:
	@$(MAKE) lint

build: test
	@echo "build: Build files for deploy"
	cd ./site.v5 && make build

deploy:
	@echo "Deploying the application"
	cd ./site.v5/dist/ && aws s3 sync . s3://aj-web-ajfisher-me-prod/ --delete
