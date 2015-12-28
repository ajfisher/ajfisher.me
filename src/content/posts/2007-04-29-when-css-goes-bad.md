---
author: ajfisher
comments: true
date: 2007-04-29 12:18:00+00:00
layout: post.hbt
slug: when-css-goes-bad
title: When CSS goes bad
wordpress_id: 11
categories:
- development
tags:
- css
- debugging
---

If you do a lot of CSS work you'll have seen particular bugs time after time and how to deal with them, however when things do go wrong [and they will trust me] finding bug related information can be a nightmare.

For instance, today I was doing some work on a site and it has had a bug for a few days now in IE. The typical peekaboo bug - if you haven't seen it, it is typically an IE6 thing whereby you rollover a link or element set to have a :hover state and then as well as the effect you want [bgcolor changing for example] something else happens too.

In my case I was rolling over a navigation item which then duly changed colour and then chopped off the page at the bottom of the screen. Even more interestingly it only did it when I had my secondary [nested] navigation up. If it was only the primary it didn't do it. More interesting again was that when I had the two navs up, mousing over the primary one caused the page to disappear and mousing over the secondary caused the page to reappear... argh.

Needless to say with a bug and change list spanning a couple sheets of A4 this was just left for a while.

A quick google for [peekaboo bug ](http://www.google.co.uk/search?hl=en&q=peekaboo+bug&meta=)didn't net much that was useful. Same with [position is everything ](http://www.positioniseverything.net)- and this is the problem - nomeclature of bugs and their effects can be so difficult to find in CSS as you have a mix of designers, researchers and techies all calling things different things. Typically my best bet has always been to try and describe the effect in as many different ways as possible on the basis of matching someone elses exact phrasing - as you can imagine this is like trying to hit a dart board on the moon from Earth with your eyes closed.

Perhaps someone will sit down and come up with an accurate way of dealing with web browser bugs that classifies them much like we have with CERT [Computer Emergency Response Team] who [classify vulnerabilities ](http://www.kb.cert.org/vuls/)in OSes and Software. This would make life a lot easier when a bug was found, especially when it is a variation on an existing one like the peekaboo one I had this morning.

In the end the document which helped me out was this one - [http://www.satzansatz.de/cssd/onhavinglayout.html](http://www.satzansatz.de/cssd/onhavinglayout.html) although it did take some trial and error to work out which element needed to have it applied. It works fine now though and my bug / change list is down under a page which is even better....
