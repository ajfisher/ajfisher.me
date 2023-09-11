---
author: ajfisher
date: 2016-02-13 12:00:00+11:00
layout: post.hbt
slug: moving-to-metalsmith
title: Making the move to metalsmith
large-title: true
tags: development, javascript, web, internet, open source, nodejs
featureimage: forging.jpg
featureimage-position: 100% 100%
imageby: Flavio~
imagelink: https://www.flickr.com/photos/37873897@N06/7070849827/
listimage: ../../img/posts/forging.jpg
excerpt: >
    I moved this site from WP to metalsmith.io in order to get a more pure
    authoring experience. The result is good, though there were a few gotchas
    along the way.
twitter_excerpt: >
    Moving from WordPress to metalsmith.io and some of the things I found out
    along the way to a more refined authoring exp.
---

Over the last couple of months I finally bit
the bullet and migrated my blog off WordPress. WordPress served me well for a
long time, but the constant tinkering required to just keep it running wasn't
worth it and was stopping me from writing (which I enjoy).

For the last few years I've found myself writing in other forms.
At work we use Google Docs for all docs and across both my books and various
open source projects, markdown is the main format used. This shift
has highlighted to me that no matter how good your CMS is (and WP isn't _terrible_)
it's always "in the way". Working in a mode where you can simply write is
the holy grail and no CMS really allows for this. As such, I decided to go
for a static site instead.

Obviously, I'd considered other static site generators like [Jekyll](https://jekyllrb.com/)
but I really didn't fancy the Ruby learning curve. [Hyde](https://github.com/hyde/hyde)
and [Pelican](http://docs.getpelican.com/en/3.6.3/) are good options in the
python world but as I've been doing so much work in NodeJS recently, I felt that
JS was a more natural fit.

[Metalsmith](http://metalsmith.io) has an interesting model in that
everything is pipelined - with the output of one function feeding
into the next. This has some quirks but eventually
becomes quite intuitive to work with and it's all javascript so suited my needs.

I won't go into the getting started side of Metalsmith - there's an
[excellent series by Robin Thrift to get you going](http://www.robinthrift.com/posts/getting-to-know-metalsmith/)
and if that's not enough then [this list of resources will keep you going](https://github.com/metalsmith/awesome-metalsmith).

Rather than rehash things that others have said here's a few things I wish
I'd known when I set out.

## The pipeline

This seems obvious in retrospect, but wasn't entirely evident when I set
out when was I was wondering about how to order my plugins. At each step
in the processing chain, the input files will be the output of the
previous step. Conceptually it's like a multi-map process.

This means that if you remove files from the list, they won't be available at
a later step. A good example of this is the drafts plugin - which will go through
each file in the list and remove anything with draft set in the front matter.
In this case, the plugin is removing those files from the list so they will
not be passed onwards.

Likewise, if you change the contents of the file in a step, that's the content
that will be passed on. This is important when you transform markdown content
via your templates to HTML. Before transformation you're operating on markdown
content, afterwards you'll be operating on HTML.

So order matters.

My recommendation is to build your pipeline in steps. Start with a minimal
source and destination, then your template step and build up from there. If
you feel that the addition of a plugin is causing wackiness on your file list
then use a debug step to figure out what is happening. Something like
this defined in your index.js file will do the job:

```javascript
var debug = function(options) {
    return (function(files, metalsmith, done) {
        for (var file in files) {
            console.log(file);
        }
        done();
    });
};
```

Then you can call .use(debug) in your chain before and after the plugin in question
to see what it's doing to the file list.

A variation, to see how content has been changed can be
seen below. Note that outputs the first file only or you'll drown in text
from the console:

```javascript
var debug = function(options) {
    return (function(files, metalsmith, done) {
        console.log(files[0])
        console.log(files[0].contents);
        done();
    });
};
```

## Build your own plugin

I held off doing this for quite a while on the basis that "surely someone has
done this before". The reality is that outside the core things
such as drafts, collections, layouts, markdown processing etc - the plugins
that nearly every metalsmith site uses - the reality is that the
plugin you're assessing may not have been touched in a couple of years and was
probably designed for a very specific use case.

A good example of this is excerpts. It works fine for a very simple case -
find the first paragraph tag and return it. But you run into all sorts of
issues if you have an image in that paragraph as well as other boundary cases.
There was a commit in late 2015 but prior to that the previous one was early 2014.
I'd consider that unmaintained.

However, if you're using markdown, it's trivially easy to
pull your own excerpt and update the post metadata if it doesn't exist. Here's
mine:

```js
var excerpt = function(options) {
    // creates excerpts from markdown using the first
    // para that is actually a paragraph of content not
    // an image etc.
    return (function(files, metalsmith, done) {
        for (var file in files) {
            // look at only the markdown files.
            if (file.endsWith(".md")) {
                // only look at files that don't have an excerpt
                if (! files[file].excerpt) {
                    var contents = files[file].contents.toString();
                    var patt = /^\w.+?\n/m;
                    var m = patt.exec(contents);
                    if (m) {
                        files[file].autoexcerpt = removemd(m[0]);
                    }
                }
            }
        }
        done();
    });
};

```

Most of this code is just choosing the right file then applying the regex
I was after - in my case a line of text that ended with a new line
and started with an actual word. As markdown uses `![]()` to designate an image
it will skip right past it.

For this sort of thing, it's often easier to write your own in a
couple of lines of code rather than try and grapple with someone else's use case.
And honestly, <b>I think this is the beauty of metalsmith</b> - you can create these
tiny little plugins that only do one operation on your file and makes your code
really tight.

Another example of this was how I wanted to treat images. I really wanted to use
proper responsive images and `srcset` to specify different sized
images for different display types. Markdown to HTML processors can't really
deal with this and I didn't want to write all the image tags
out by hand in the markdown as that means I'm polluting my content with layout.
There's also the issue of captioning images which you can't do in CSS as the
image tag isn't a container so you can't use `::before` or `::after`.

For my specific use case, I simply wrote a plugin that did what I wanted. I won't
show the code here but [you can see it in my site gh.](https://github.com/ajfisher/ajfisher.me/blob/master/index.js#L112-L176)
It finds mardown images, pulls them out and replaces them with a properly
formatted `figure` that uses `srcset` and `figcaption`. You can see the treatment
of this below.

![Photo of a blacksmith's hands on a hammer and anvil](../../img/posts/forgehands.jpg)

<p class="caption"><a href="http://www.flickr.com/photos/polandmfa/9286266649/">"Blacksmithing
workshop in Wojciechow, Poland" - image (CC) Poland MFA</a></p>

Writing plugins is easy so definitely don't put it off as there's no magic
to it.

## Deployment

My hosting needs are very straightforward - as the site is static I want
to use AWS S3. To get it there I need to upload all the files but there's
a few other considerations:

* Take hi-res images and make different sized versions for responsive images
* Some code changes should be applied from development to prod (eg turning on
google analytics and twitter share meta information etc)
* Physically put all the required files (but not the intermediate files) into
S3 with appropriate permissions.

All of this is managed with a simple bash script which orchestrates the various
pieces.

```sh
echo "Resizing images"
node images.js
echo "Building site files"
node index.js production
echo "Upload to S3"
s3cmd -r --acl-public --guess-mime-type --exclude-from=utils/exclusions.txt --progress sync ./build/ s3://ajfisher.me/
echo "Site updates complete"
```

#### Images

Images are resized using imagemagick-native. This is done as a separate
process from my main metalsmith pipeline as it can take quite a lot of time to
run and only needs to be done once in a while as new images are added to posts.

If I add new assets that I need to preview locally I can run this component
independently to generate the required assets. In the future I'll probably move
this to AWS lambda so the images can be autoscaled when new assets are pushed to
S3.

#### Code changes

There are some things you don't want to run in dev eg switching off google
analytics code and twitter meta tags etc. There are some things you also want
to run in dev, the watch code and microserver for example.

The way I deal with this is by passing a production argument into the command
line if I'm building for production. This will set a bunch of internals like
set a metadata value (so handlebars can turn content on or off) and remove
certain modules as needed.

One quirk you have to deal with in scenario is that as metalsmith executes as
a chain, if you want to switch plugins off you can't conditionally call them.

Here I just exploit the functional nature of javascript and do this:

```javascript
var serve = require('metalsmith-serve');

var prod = false;
if (process.argv[2] == "production") {
    prod = true;
    noop = function(options) {
        // makes it a noop in the pipeline
        return (function(files, metalsmith, done) {
            done();
        });
    };
    serve = noop;
}
```

It's not elegant but it works, is reliable and I don't need to make
any modifications to my pipeline.

#### File deployment

Once the images are made and the site is built, it's a simple matter
to use `s3cmd` to synchronise the build directory with a bucket in AWS S3. This
bucket is set up as publicly accessible and to serve `index.html` pages as the
default document.

I use the sync part of `s3cmd` rather than put as it will look up to see whether
the file has changed before pushing it - saving on bandwidth, which
may or may not be important to you (it is for me due to my usual home connection).

## Conclusion

Overall I'm really happy with metalsmith - if you're very familar with JS and
you're looking for a static site generator then it's a good one to work with.
There isn't a huge amount of information about how to do some things but hopefully
this post will help out a little there.

The entirety of ajfisher.me is [in it's own repo](https://github.com/ajfisher/ajfisher.me)
so feel free to dig around, run it up and use whatever helps in your own set up.

