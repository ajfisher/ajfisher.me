.PHONY: help lint test build

help:
	@echo "install:         Install all the parts needed for local dev"
	@echo "install-site:    Install all the parts needed for the site"
	@echo "clean:           Completely clean everything up"
	@echo "clean-site:      Clean node_modules for site only"
	@echo "clean-meta:      Clean node_modules for meta only"
	@echo "dev:             Run the development environment"
	@echo "serve:           Serve web application"
	@echo "lint:            Lint the application"
	@echo "test:            Run tests."
	@echo "pre-commit:      Run lint for site."
	@echo "build:           Build web application"
	@echo "deploy-app:      Deploy the front end application"

clean-site:
	@echo 'Cleans all of the api files up'
	cd ./site.v5 && make clean
	@echo 'Files cleaned up'

clean-meta:
	@echo 'Cleans all of the app files up'
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
	echo "Not implemented"

build: test
	@echo "build: Build files for deploy"
	cd ./site.v5 && make build

deploy:
	@echo "Deploying the application"
	cd ./site.v5/dist/ && aws s3 sync . s3://aj-web-ajfisher-me-prod/ --delete
