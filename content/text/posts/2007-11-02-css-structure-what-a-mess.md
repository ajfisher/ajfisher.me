---
author: ajfisher
date: 2007-11-02 17:29:00+00:00
layout: post.hbt
slug: css-structure-what-a-mess
title: CSS Structure - what a mess
tags: css, web, standards, rant, development
excerpt: >
    CSS files are flat and verbose, forcing ever-longer selectors just to get
    specificity. A more structured, nested syntax (and variables) would make
    stylesheets that are easier to author and maintain.
---

James posted a message on my blog some weeks ago and it's only now that a penny has dropped in my mind about what we need to deal with the issue of structure in CSS - the problem is we have none. As James points out you end up with a flat mess that with all the best will in the world definitions are hard to find.

I've ranted before about the [annoyances of CSS](http://technologytreason.blogspot.com/2007/04/why-is-css-such-painful-tool.html) - particularly to do with the lack of variables or constant definitions without recourse to server side scripting and about the nature of the W3C CSS working group not being well represented by techies - especially as CSS is nearly a language in its own right the same way Regular Expressions are.

As the web building fraternity finally weans itself off of dreamweaver and table based design and adopts a more semantic, HTML-lite way of building sites, the CSS files are getting bigger and bigger all the time.

At the moment, to get a degree of specificity one has to redeclare selectors:

```
div#header div.nav ul {}
div#header div#logo img {}
```

for example.

Many CSS zealots would say "But you can get rid of div#header altogether" and I can in this instance but what happens if my div#logo doesn't appear in div#header on a page and certainly it's not uncommon to have navigation in a header as well as a sidebar.

As can be seen, in order to get specificity we increase verbosity. Anyone that is fully converted to CSS design will tell you this, it's the casual "div stackers" who just declare a new class for every element in the document which ruins the HTML.

My solution then W3C if you're listening is this. Cascade in the style sheet, cascade in the CSS file.

In many programming languages there is a keyword to get you down to the level of an object that you are going to manipluate numerous properties of in one go for example "with" in VB. Thus I could say:

```
with myobject
  .property1 = x;
  .property2 = y;
endwith
```

The CSS equivalent would be:

```
div#header {
  div#logo img { css... }
  div#nav {
    css...
    ul { css... }
  }
}
```

This gives you the specificity required, removing the redundancy and creates a cascade like structure to the document that would also make things much easier to debug what is going on.

Structural CSS along with variables would make a massive contribution to the developmental side of CSS as a language that could revolutionise the way we use CSS with the web.
