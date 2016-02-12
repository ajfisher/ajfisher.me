---
author: ajfisher
date: 2016-02-11 16:00:00+11:00
layout: post.hbt
slug: moving-to-metalsmith
title: Moving to metalsmith
tags: development, javascript, web, internet, open source, nodejs

---

It was a long time coming but over the last couple of months I finally bit
the bullet and migrated my blog off WordPress. Wordpress served me well for a
long time but the constant tinkering required to just keep it working wasn't
worth it and was instrumental in stopping me from writing.

Over the last few years I've found myself working in more "pure" writing forms.
At work we use Google Docs for everything and across both my books and various
open source project, Markdown is the main formata (or Asciidoc). This shift
has highlighted to me that no matter how good your editor is (and WP isn't _terrible_)
it's always "in the way" between you as author and how that content becomes
expressed.

Obviously I'd looked at other static site generators like [Jekyll](https://jekyllrb.com/)
but I really didn't fancy the Ruby learning curve. [Hyde](https://github.com/hyde/hyde) 
and [Pelican](http://docs.getpelican.com/en/3.6.3/) are good options in the
python world but as I've been doing so much work recently in NodeJS as a result
of nodebots, I felt that JS was a more natural fit. 

[Metalsmith](http://metalsmith.io) has an interesting execution model in that
everything is modelled in a chain with the output of one function feeding
into the next one. This has some interesting implications but eventually
becomes quite intuitive.

I won't go into the getting started side of Metalsmith - there's an
[excellent series by Robin Thrift to get you going](http://www.robinthrift.com/posts/getting-to-know-metalsmith/)
and if that's not enough then [this list of resources will keep you going](https://github.com/metalsmith/awesome-metalsmith).

Rather than rehash things that others have said here's a few things I wish
I'd known when I set out.

## The pipeline

This seems obvious in retrospect, however it wasn't entirely evident when I set
out and was I was wondering about the order of the plugins. At each step
in the processing chain, the input on the files will be the output of the
previous step. You can think of this like a multi-map or map-reduce steps.

This means that if you remove files from the list, they won't be available
later on. A good example of this is the drafts plugin which will go through
each file in the list and then remove anything with draft set in the front matter.
In this case, the plugin is removing those files from the list so they will
not be passed onwards.

So order matters.

My recommendation is to slowly build your pipeline. Start with a minimal
source and destination, then template step and build up from there. If
you feel that the addition of a plugin is causing wackiness on your file list
then use a simple debug step to figure out what is happening. Something like
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

A variation of this when you want to see how content has been changed can be
seen below. Note that this is the first file only or you'll just drown in text
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
done this before". The reality is that outside the core and simple things
such as drafts, collections, layouts, markdown processing etc - the plugins
that just about every metalsmith deployment use - the reality is that the
plugin you're assessing may not have been touched in a couple of years and
probably was designed for a very specific use case.

A good example of this is excerpts. It works fine for a very simple case -
find the first paragraph tag and return it. But you run into all sorts of
issues if you have an image and what not. There was a commit in late 2015 but
prior to that the previous one was early 2014. I'd consider that unmaintained.

The thing is though that using markdown as your base, it's trivially easy to
pull your own excerpt and update the post metadata if it doesn't exist. Here's
mine:

```js
var excerpt = function(options) {
    // creates excerpts from the markdown using the first
    // para that is actually a paragraph of content not
    // an image etc.
    return (function(files, metalsmith, done) {
        for (var file in files) {
            // just look at the markdown files.
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

Most of this code is just choosing the right file then finding the regex
I was after - in my case a line of text that ended with a new line
and started with an actual word. As markdown uses `![]()` to designate an image
it will skip right past it.

For this sort of thing, it's often easier to write your own in a
couple of lines of code rather than try and grapple with someone else's use case.
And honestly, I think this is the beauty of metalsmith - you can create these
tiny little plugins that just do one operation on your file and makes your code
really tight.

Another example of this was how I wanted to treat images. I really wanted to use
proper responsive images and srcset to specify different sized
images for different display types. Markdown to HTML processors can't really
deal with this sort of thing and I didn't want to write all the image tags
out by hand in the markdown. There's also the issue of captioning images which
you can't do in CSS as the image tag isn't a container so you can't use ::before
or ::after.

For my specific use case, I simply wrote a plugin that did what I wanted. I won't
show the code here but [you can see it in my site gh.](https://github.com/ajfisher/ajfisher.me/blob/master/index.js#L112-L176)
It just finds md images, pulls them out and replaces them with a properly
formatted figure that uses srcset and figcaption.

Writing plugins is easy so definitely don't put it off as there's no magic
to it.

## Deployment

My production environment was straightforward - as the site is static I wanted
to host it in AWS S3. To get it there I need to upload all the files but there's
a few other considerations as well:

* Need to take hires images and make different sized version
* Some code changes should be applied from development to prod (eg turning on
google analytics and twitter share meta information etc)
* Physically put all the required files (but not the intermediate stuff) into
S3 with appropriate permissions.

All of this is managed with a simple bash script which orchestrates the various
pieces.

#### Images

Images are resized using imagemagick-native. This is done as a separate
process from my main metalsmith pipeline as it can take quite a lot of time to
run and only needs to be done once in a while as new images are added to posts.

If I add new assets that I need to preview locally I can run this component
independently to generate the required assets. In the future I'll probably move
this to AWS lambda.


#### Code changes

fhdjkfdhskfs

#### File deployment

fdhjfkhsd



