.PHONY: help lint test build

INPUT_DIR ?= ../../content/text/posts
OUTPUT_JSON ?= similarity_data.json
CHUNK_SIZE ?= 256
OVERLAP_SIZE ?= 32
RELATED_COUNT ?= 10
TAG_WEIGHT ?= 0.1
OVERLAP_BONUS ?= 0.05

help:
	@echo "install:         Install all the parts needed for local dev"
	@echo "clean:           Completely clean everything up"
	@echo "clean-env:       Remove the virtual environment as well"
	@echo "build:           Build the related documents file"

clean-env:
	@echo 'Cleans the python virtual env and related items'
	rm -rf venv

clean: clean-env

install:
	test -d venv || { echo "Create vitual env"; python3.11 -m venv venv; }
	. venv/bin/activate; pip install -r requirements.txt

build: install
	@echo "building related document file"
	. venv/bin/activate; python make_embeddings.py \
		--input $(INPUT_DIR) \
		--output $(OUTPUT_JSON) \
		--chunk-size $(CHUNK_SIZE) \
		--overlap-size $(OVERLAP_SIZE) \
		--related-count $(RELATED_COUNT) \
		--tag-weight $(TAG_WEIGHT) \
		--overlap-bonus $(OVERLAP_BONUS)
