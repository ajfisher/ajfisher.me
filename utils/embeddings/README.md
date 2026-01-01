# Working with the related items data and document embeddings

## Overview

This component of the site runs offline and the outputs are committed as
part of the repo. This way the build process won't take forever installing
a bunch of python and calculating embeddings on files that don't change that
frequently.

## Installing

Use the make script - `make install`

This will set up the python virtual env and download all of the python reqs as
needed.

## Using

This process will look at all of the markdown files in /site/src/content/posts
and will create a set of vector embeddings of that data. This is done using
the `all-MiniLM-L6-v2` model from `sentence-transformers`. The process tokenises
each document with the model's tokenizer, performs token based context
chunking and averages the resulting chunk vectors. Tags from the post's front
matter are appended to the document text prior to embedding and also encoded
separately to produce a tag vector.

The end point is a file called similarity_data.json which contains each
file and then the top 10 most similar objects related to it. Similarity scoring
uses both the content and tag vectors, with extra weight given when tags
overlap between documents.

Embeddings are cached locally in a file called `embeddings_cache.json`. When
`make build` runs, the script will load this cache and only recompute
embeddings for markdown files that have changed since the last build. The cache
is updated at the end of each run and stored next to `similarity_data.json`.

To build the database run: `make build` and everything will generate. This might
take up to 30 seconds.

### Command line options

`make_embeddings.py` accepts several flags so you can customise how the
embedding data is produced:

- `-i, --input` – directory containing markdown posts (default
  `../../site/src/content/posts`)
- `-o, --output` – where to write the JSON output (default
  `similarity_data.json`)
- `--chunk-size` – token count to use for each chunk (default `256`)
- `--overlap-size` – number of overlapping tokens between chunks (default `32`)
- `--related-count` – how many related posts to store per entry (default `10`)
- `--tag-weight` – weighting factor for tag similarity (default `0.1`)
- `--overlap-bonus` – bonus added per overlapping tag (default `0.05`)

These values can also be overridden when running `make build` by setting the
`INPUT_DIR`, `OUTPUT_JSON`, `CHUNK_SIZE`, `OVERLAP_SIZE`, `RELATED_COUNT`,
`TAG_WEIGHT` and `OVERLAP_BONUS`
variables.

### Note when making new documents

Currently there is no automated process for running this when a new content
post has been made. Therefore it won't auto-rebuild.

### Other make commands

- `make clean`: removes the virtual env and all dependent files

## What to commit

The elements that need to be committed other than the supporting code are the
vector database `similarity_data.json` and the embeddings cache file
`embeddings_cache.json`.
