---
author: ajfisher
date: 2007-04-23 13:43:00+00:00
layout: post.hbt
slug: why-is-css-such-a-painful-tool
title: Why is CSS such a painful tool?
tags: css, development, standards
---

Looking at the title above you'd be expecting to see a rant covering the lines of CSS is rubbish, it doesn't work properly and why can't we go back to the days of nested tables and lots of little shim images.

I love CSS though, I love the fact that I don't need an editor to edit code any more [trying to do complex layouts in the past it was mandatory to use Dreamweaver to get any degree of speed], I adore that my code is more or less semantically correct and that it searches well. Being a techie and advising people on hosting I also love the fact that all that bandwidth isn't being wasted on buffer code in HTML to do trivial layouts that isn't then cached.

We all know CSS has it's quirks, particularly in IE but the one thing that gets on my goat more than anything else with CSS is that it is a layout language developed by a bunch of people that aren't programmers or designers. They are wannabe web typographists who happen to have the time to come up with and enhance a spec that the rest of us are then forced to use.

This gripe raises its head with me every once in a while but really badly today. This is because we're developing a site that is really thematic in terms of look and feel and the various sections really have their own colour coding. The overall behaviour is the same from one section to another in order to maintain consistency but things like backgrounds, titles and link colours shift to the new pallette.

The really painful thing with this is the inevitable rehashing of styles down the page - particularly if it is a really stylised design with a lot of lines in it etc.

You find yourself constantly typing the same border: 1px solid #123456 or color: #abcdef over and over again. Then when you are in a new section all these items have to be re-instantiated.

What I would give for some variables - say something like this:

```scss
$red = #ff0000;
$blue = #0000ff;

$borderstyle = 1px solid $blue;
$linkstyle = $red;
```

Then in my CSS I could generate a selector and then apply the relevant style variable. I wouldn't even need any conditional logic to be happy just a quick and dirty token replacement function to make it work.

Admittedly I could set this up by just making a CSS file a PHP file instead and returning text/css instead of text/html etc but what happens if I'm using ASP or I have to do something that is just quick and dirty HTML for a couple of pages... or what about the performance hit if my site is serving up 1000 page views a minute [or more]. As a CSS advocate I tell people that it is faster to dish pages with CSS as it is cached, but then this method will kill most caching strategies.

We're now at the point where even if this was something that was deemed as being useful by the [W3C](http://www.w3c.org) powers that be we won't see it incorporated until at least the CSS 3.0 spec - which should be coming to a web browser near you some time about 2011/12 and probably won't have wide support until about 2015 - if [NASA have their way](http://www.nasa.gov/home/hqnews/2006/dec/HQ_06361_ESMD_Lunar_Architecture.html) they'll almost have landed a man on the moon again by then!

So please, W3C - we are in this mire because of a lack of consulation of developers who are implementing the standards you set out. Perhaps getting a development edition of a browser that incorporates these standards at an early stage so they can be played with would be a good direction of resources for the next phase of growth...
