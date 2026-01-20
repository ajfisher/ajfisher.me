.PHONY: help install install-site clean clean-site clean-meta dev preview lint test pre-commit build deploy

help:
	@echo "install:         Install all the parts needed for local dev"
	@echo "install-site:    Install all the parts needed for the site"
	@echo "clean:           Completely clean everything up"
	@echo "clean-site:      Clean build artifacts and dependencies for site"
	@echo "clean-meta:      Clean root node_modules"
	@echo "dev:             Run the Astro development server"
	@echo "preview:         Preview the production build"
	@echo "lint:            Lint the site"
	@echo "test:            Run lint and Astro type checks"
	@echo "pre-commit:      Run lint for site"
	@echo "build:           Build the site for deploy"
	@echo "deploy:          Deploy the site to S3"

clean-site:
	@echo 'Cleans all site build artifacts and dependencies'
	cd ./site.v5 && make clean
	@echo 'Files cleaned up'

clean-meta:
	@echo 'Cleans root node_modules'
	rm -rf node_modules
	@echo 'Files cleaned up'

clean: clean-site clean-meta

install-site:
	@echo 'Installs the site dependencies'
	cd ./site.v5 && make install
	@echo 'Site dependencies installed'

install: install-site
	npm install

lint:
	cd ./site.v5 && make lint

test:
	cd ./site.v5 && make test

dev:
	cd ./site.v5 && make dev

preview:
	cd ./site.v5 && make preview

pre-commit:
	@$(MAKE) lint

build: test
	@echo "build: Build files for deploy"
	cd ./site.v5 && make build

deploy:
	@echo "Deploying the application"
	cd ./site.v5/dist/ && aws s3 sync . s3://aj-web-ajfisher-me-prod/ --delete
