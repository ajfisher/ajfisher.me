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
and will create a set of vector embeddings of that data. This will be done using
the `all-MiniLM-L6-v2` model from `sentence-transformers` and it will handle things
like context chunking and averaging of the vectors.

The end point is a file called similarity_data.json which contains each
file and then the top 10 most similar objects related to it.

To build the database run: `make build` and everything will generate. This might
take up to 30 seconds.

### Note when making new documents

Currently there is no automated process for running this when a new content
post has been made. Therefore it won't auto-rebuild.

### Other make commands

* `make clean`: removes the virtual env and all dependent files

## What to commit

The only element that needs to be committed other than the supporting code is
the actual vector database which is the file called `similarity_data.json`


