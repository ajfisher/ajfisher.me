---
author: ajfisher
date: 2020-01-31 10:00:10+10:00
layout: page
slug: colophon
title: Colophon - how this site was built.
excerpt: How this site is built, the tools behind it, and the infrastructure that keeps it running.
featureimage: ../../img/posts/colophon.png
imageby: ajfisher - Flux.Dev
---

If you want to know a little more about how this site is constructed, the
tools that are in use etc then read on.

#### Website technologies

The website layout and components are all built in [React](https://reactjs.org)
and uses [Gatsby](https://gatsbyjs.org) to produce a static version of the site.
Gatsby then produces a set of raw HTML, JS, CSS and image files which are
then put into an S3 bucket in AWS and served via cloudfront.

This results in content that is easily searchable via google and can be delivered
to readers very quickly.

#### Content authoring

Content is authored using [Markdown](https://en.wikipedia.org/wiki/Markdown)
as raw files which are then pulled into Gatsby's data store to process into
HTML. 

#### Infrastructure management

Infrastructure is all managed via [Terraform](https://www.terraform.io) which
sets up and keeps organised all of the various AWS services such as S3 buckets,
Certificates and cloudfront distributions. 

#### Images

Images are a mix of pictures I take myself where needed for a project,
sourced from Creative Commons available images in Flickr which are then
attributed. As of 2024, some images are now produced for headers using Stable
Diffusion, which I do locally. I acknowledge that Generative image models have
likely been trained on copyright artwork (including mine) I explicitly do not
use prompts that mimic artists' unique style (eg "in the style of... " type
prompts).

Gatsby has an excellent image processing system which can produce various sizes
of image in order to make the site responsive and keep the page weight as light
as possible.
