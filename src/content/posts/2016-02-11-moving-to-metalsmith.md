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

This seems obvious in retrospect however it wasn't entirely evident when I set
out and was I was wondering about the order of the plugins. At each step
in the processing chain, the input on the files will be the output of the
previous step. 

This means that if you remove files from the list then they won't be available
later on. A good example of this is the drafts plugin which will go through
each file in the list and then remove anything with draft set in the front matter.
In this case, the plugin is removing those files from the list so they will
not be passed onwards.

So order matters.

My recommendation is to slowly build your pipeline. Start with a minimal
source and destination, then template step etc and build up from there. If
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

A variation of this when you want to see content is this (first file only or you'll
just drown in text):

```javascript
var debug = function(options) {
    return (function(files, metalsmith, done) {
        console.log(files[0])
        console.log(files[0].contents);
        done();
    });
};
```



