---
author: ajfisher
comments: true
date: 2007-08-25 11:28:00+00:00
layout: post.hbt
slug: jquery-saves-the-day
title: JQuery saves the day?
tags: css, javascript, web
excerpt: >
    jQuery's selector engine brings CSS-like power to JavaScript and solves
    real-world layout problems without littering HTML with extra classes. Used
    sparingly, it enhances interfaces while keeping pages accessible.
---

If you haven't come across it yet there is a javascript library called [JQuery](http://jquery.com/) which is being developed as an open source project, designed to give us better control over our web pages and the things we can do with them.

Thankfully [John Resig, Karl Sedburg and the others](http://docs.jquery.com/About/Contributors) have steered slightly away from the profligacy of AJAX libraries doing the rounds at the moment and produced a library that actually deals with some of the problems you face as a web developer or a designer - namely things like clients saying "I'd really like the first paragraph after each header to be blue instead of black".

Now before I get shot down in a burst of "you can do that using classes in your p-tags" I'll say this - I don't want to, I shouldn't have to and it makes for ugly and unmaintainable code. Doing this just [papers over the gaping holes left in CSS ](http://technologytreason.blogspot.com/2007/04/why-is-css-such-painful-tool.html)and makes your HTML even less semantic than it already is.

This is where jQuery comes in. The biggest area of development in this library has been in developing "content selectors" similar to the [CSS selector specification](http://www.w3.org/TR/CSS21/selector.html). The brilliant thing about these selectors is that we don't have to wait until browsers with CSS 3 in them turn up before we can use them - thus saving us about 5-6 years of waiting time.

I'm a fan of Javascript in small doses - I'm not a fan of large scale AJAX where it is pointless to be loading information that you can get on a click anyway, 99% of my clients want to ensure accessibility and often Javascript breaks that. On a UI where responsiveness is key then AJAX is 100% appropriate but for the majority of sites it's a gimmick.

However in this context we have a javascript library that can add depth to the interface and add consistency and markers that could only be achieved by a lot of proprietary hacks. This benefits usability without sacrificing accessibility and portability. If JavaScript is switched off you lose nothing that wasn't there before anyway; if it is then you get a whole lot more texture to the site.

Watch this space as I think there will be a lot of development on this library over the next 12 months.
