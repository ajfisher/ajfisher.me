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

The website layout and components are all built using [Astro](https://astro.build)
which then builds a really clean, static version of the site. Astro looks after
things like CSS bundling, image size permutations for responsive images and
making all of the static HTML files. All of these are then deployed into
an S3 bucket in AWS and served via cloudfront (which is done via a github action).

This results in content that is easily searchable via google and can be delivered
to readers very quickly.

The site was moved from Gatsby and React to Astro because even though Gatsby
produces static files, it still uses a lot of react behind the scenes as
"improvement". With modern browsers and lightweight HTML I decided I wanted to
drop as much JS from the delivered page as possible and rely on the browser
to do the work (which is considerably more performant).

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

Astro has a good image processing system which can produce various sizes
of image in order to make the site responsive and keep the page weight as light
as possible. It also neatly crops images based on overflow of their containers
so you end up with considerably smaller images as a result.

#### Use of AI

Various AI tools are used to help produce this site.

* As noted above, I use image generators to make content and hero images where
required to illustrate a topic. This is in addition to images I may create
directly myself.
* Coding assistants are used (primarily Github Copilot, Gemini, Codex) in a mix
of quick auto-complete style use as well as sometimes when I'm doing a batch of
work (especially refactors).
* My writing is authored by me directly, sometimes with an LLM used in "sparring
mode" where I use it to test the logic of my contentions, provide alternative
perspectives or provide feedback on the way I've framed things poorly. In short
I use it the same as I do other humans who are gracious enough to read over
things before hitting publish.

_Update: 2026-01-20:_ Reflective of recent move to Astro from Gatsby and added
the section on how AI is used to be explicit about this.
