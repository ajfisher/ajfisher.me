---
author: ajfisher
comments: true
date: 2007-12-20 15:41:00+00:00
layout: post.hbt
slug: my-top-5-jquery-seasonal-wishes
title: My top 5 jQuery seasonal wishes
categories:
- development
tags: javascript, web
excerpt: >
    jQuery is a joy to use, but a few missing pieces still hurt productivity.
    Festive wishes includes better docs, a wait function, fadeToggle,
    display-state helpers, and easy DOM access.
---

I've waxed lyrical about jQuery before, I've been using it a lot to do worker code which I just can't be bothered to hand write any more. Not least because jQuery handles all the little browser inconsistencies for me so the code I actually call into a page is infinitely more maintainable, especially if someone follows behind who maybe isn't so up to speed with JavaScript as I am.

However, use a tool for long enough and closeness breeds contempt as they say. In this vein (and regular readers will know I don't do complimentary very often) and in the spirit of seasonal "Listing programmes" of every style, these would be the top 5 things I'd like to see incorporated into jQuery in the next year.

5. Documentation - Starting off slowly and easily I'd definitely like to see some better documentation. Ideally I'd like to say that new sublibraries aren't included until their documentation is properly up to scratch. Some areas are very well documented other areas are sketchy at best.

4. Wait(msecs, callback) - part of the effects sublibrary, we have all kinds of effects to enable objects to slide, fade and animate but we don't have a wait command. What I would give to have a command that you can just append to a sequence of animations and then wait for a period of time before calling another function or stepping to the next instruction.

As you can see [from my jQuery Slideshow](http://technologytreason.blogspot.com/2007/10/jquery-slideshow.html) the common way to do this is to call animate() with the same instruction as your last step with a callback. It's not big or clever but it does the job.

3. fadeToggle(speed) - again part of the effects sublibrary; we have slideToggle which is a great bit of code, call it and the object either slides open or shut depending on it's state. It would be great to have the same thing with fade rather than writing detection code and then calling fadeIn or fadeOut.

2. State detection - Another worker function would be really useful here to actually determine the state of an object as to whether it is on or off in display terms. I am fully aware I can use document.getElementById(objname).style.display or equally $().css.display() however this will return "none" if it's off, but it could also return "block inline table table-cell list" etc depending on what it is.

Ideally I'd like $().displayState() and it would return "on or off" or indeed true or false as a boolean so it would make display code even easier logic wise.

And finally,

1. Cast to DOM object. One of the best things about jQuery is it's query language. Using elements from the CSS and Xpath specifications pulling objects out of the document is so much easier than using DOM traversal methods.

However sometimes the jQuery functions just aren't enough and we need to cast an object to real JavaScript to play with it - a simple method of doing this would mean the power of a great interrogation language along with the ability to cast to a real DOM object.

I fully expect someone to come kick me now telling me I can do some or all of these things and indeed the functions I'm asking for exist already however the documentation as mentioned in number 5 is lacking in some areas so it isn't obvious if it is doable.

Obviously this is a little tongue-in-cheek as if I was that worried about these issues I'd write the code myself and submit it to the team for inclusion in the next version. Indeed perhaps that could form the basis of one of my New Year's technology resolutions.

Happy Holidays all.
