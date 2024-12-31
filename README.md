# ajfisher.me

Website for ajfisher.me

- uses gatsby to build the required elements.
- All data is in markdown (need to work out how to make that work)
- Need to build react and all of the components
- Ideally keep things broadly in SASS as much as possible and link into react
- Deploy to S3 appropriately
- Update to more modern approach to CSS at a later point
- Deploy using Github actions
- Utilise Terraform to build out the infra (including SSL etc)

Uses metalsmith to produce the required elements.

Install:

```
git clone https://github.com/ajfisher/ajfisher.me
```

Repo layout

- infra
- site
- utils
- Makefile

Make commands

Usage:

To run the processor which will look at general files such as sass, md etc

```
node index.js
```

To process all the images to the right sizes, use:

```
node images.js
```

## Dependencies

### NodeJS

Metalsmith uses generators so either use harmony or just flip to 5.3.0

### Data

Used this to convert the output XML from WP to markdown.

https://github.com/thomasf/exitwp

Did this within a virtualenv and in a temp directory.

Changed line 240

```
filename_parts.append(target_format)
```

to:

```
filename_parts.append('md')
```

Just to make it explicitly work with .md which is a bit nicer to look at.

picked up the `build/_posts` files and put them in the repo.

### Other

Imagemagick - install using `brew install imagemagick`

metalsmith-convert uses a bad version of imagemagick-native. Do this:

```
git clone git@github.com:tomterl/metalsmith-convert.git
npm remove --save imagemagick-native
npm install -- save elad/node-imagemagick-native.git#travis-4.1
cd ~/dev/ajfisher.me
npm install ~/tmp/metalsmith-convert
```

## Custom meta data instructions

### Listings

* listimage: url to use for the listing pages and anywhere else it may be displayed
* listimage-position: % % vals to push image around to align it properly with `object-fit`
* collection: featured - to appear in featured collection list


### Blog page things

* featureimage: url for the header feature image if applicable
* imageby: person attribution for the image
* imagelink: attribution link for the image
* featured: (true) if you want it to appear in feature list
* excerpt: use with MD multiline `>` to create an excerpt or it will be pulled
from first proper para
