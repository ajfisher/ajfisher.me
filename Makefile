.PHONY: help lint test build

help:
	@echo "install:         Install all the parts needed for local dev"
	@echo "install-site:    Install all the parts needed for the site"
	@echo "clean:           Completely clean everything up"
	@echo "clean-site:      Clean node_modules for site only"
	@echo "clean-meta:      Clean node_modules for meta only"
	@echo "dev:           Run the development environment"
	@echo "serve:           Serve web application"
	@echo "test:            Run tests."
	@echo "pre-commit:      Run lint for site."
	@echo "build:           Build web application"
	@echo "deploy-app:      Deploy the front end application"

clean-site:
	@echo 'Cleans all of the api files up'
	cd ./site  && gatsby clean && rm -rf node_modules && rm -rf coverage
	cd ./site/plugins/gatsby-transformer-remark-tags && rm -rf node_modules
	cd ./site/plugins/gatsby-remark-transformer-pullquotes && rm -rf node_modules
	@echo 'Files cleaned up'

clean-meta:
	@echo 'Cleans all of the app files up'
	rm -rf node_modules
	@echo 'Files cleaned up'

clean: clean-site clean-meta

install-site:
	@echo 'Installs the site dependencies'
	cd ./site && npm install
	cd ./site/plugins/gatsby-transformer-remark-tags && npm install
	cd ./site/plugins/gatsby-remark-transformer-pullquotes && npm install
	@echo 'Site dependencies installed'

install: install-site
	npm install

dev:
	cd ./site && gatsby develop -H 0.0.0.0

serve:
	cd ./site && gatsby serve -H 0.0.0.0

pre-commit:
	echo "Not implemented"

test:
	cd ./site && npm run test

build:
	@echo "build: Build files for deploy"
	cd ./site && gatsby build

deploy:
	@echo "Deploying the application"
	cd ./site/public && aws s3 sync . s3://aj-web-ajfisher-me-prod/ --delete
