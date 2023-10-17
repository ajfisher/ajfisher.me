.PHONY: help lint test build

help:
	@echo "install:         Install all the parts needed for local dev"
	@echo "clean:           Completely clean everything up"
	@echo "clean-env:       Remove the virtual environment as well"
	@echo "dev:             Run the development environment"
	@echo "test:            Run tests."
	@echo "pre-commit:      Run lint for site."
	@echo "build:           Build the related documents file"

clean-env:
	@echo 'Cleans the python virtual env and related items'
	rm -rf venv

clean: clean-env

install:
	test -d venv || { echo "Create vitual env"; python3 -m venv venv; }
	. venv/bin/activate; pip install -r requirements.txt

build: install
	@echo "building related document file"
	. venv/bin/activate; python make_embeddings.py
