.PHONY: help install clean clean-build clean-deps dev build preview post lint sync check script-test test

help:
	@echo "install:         Install dependencies"
	@echo "clean:           Clean build artifacts and dependencies"
	@echo "clean-build:     Clean build artifacts"
	@echo "clean-deps:      Clean node_modules"
	@echo "dev:             Run the Astro development server"
	@echo "build:           Build the site"
	@echo "preview:         Preview the production build"
	@echo "post:            Scaffold a new post"
	@echo "lint:            Run ESLint"
	@echo "sync:            Sync Astro content collections/types"
	@echo "check:           Run Astro type check"
	@echo "script-test:     Run Node script tests"
	@echo "test:            Run script tests, lint, and type check"

install:
	@echo "Installing dependencies"
	npm install

clean-build:
	@echo "Cleaning build artifacts"
	rm -rf dist .astro

clean-deps:
	@echo "Cleaning dependencies"
	rm -rf node_modules

clean: clean-build clean-deps

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

post:
	npm run new-post -- $(ARGS)

lint:
	npm run lint

sync:
	./node_modules/.bin/astro sync

check:
	./node_modules/.bin/astro check

script-test:
	node --test scripts/*.test.mjs

test: script-test lint check
