---
author: ajfisher
date: 2009-11-13 01:12:00+00:00
layout: post.hbt
slug: spdy-could-gain-acceptence-very-quickly-with-some-product-innovation
title: SPDY could gain acceptence - with some innovation
small-title: true
tags: google, internet, web
---

Google have announced some early findings about their research into a faster protocol to reduce latency times due to good old fashioned HTTP. HTTP was designed as a really simple protocol to delivery (primarily) text content over the Internet and thus was born the Web.

One of the problems with HTTP is that it only really allows a single request to be serviced at any one time. The reason this doesn't APPEAR to be the case is because modern browsers create multiple connection threads that connect independently to the server and it gives the appearance of things downloading in parallel. It's a neat hack and works because we have good network speeds and mast processors to manage all this multi-tasking. Go back to a Pentium II with Netscape 2 and you'll watch the glacial procession of elements loading in from the top and goes down the page.

The [Google project page ](http://dev.chromium.org/spdy/spdy-whitepaper)talks a lot about why HTTP pipelining doesn't work and some of the technical architecture behind SPDY which I won't cover here other than to say that it's great we are seeing this type of innovation at the protocol level. What's most interesting for me however is how we get it in production.

There is a lot of nay-saying going on around this suggesting that because of the size of the Web you'll never get people to shift to a new protocol HTTP:// won, let's all leave it at that because there are too many web servers and web browsers to convert. This is what I want to address in this post.

Yes - there are fair too many legacy browsers to deal with to make this transition happen. Look how many IE 6 browsers are still in use, but we'd also have to shift all the Mozilla users, Chrome users (easy because of forced update) and Safari users as well. Not to mention all those pesky mobile devices that are springing up.

Dealing with the web servers is a much more straightforward issue. There really aren't that many in the scheme of things. Indeed much of our existing infrastructure runs multiple servers, Apache alongside a lightweight server like nginx and this is increasingly common.

As such there's nothing stopping me dropping in a SPDY server alongside my existing infrastructure for those users that can directly access it (Chrome 4, Firefox 5, Safari 6 and IE 10 for example).

But let's not stop there. A network admin could create a software appliance at the Firewall or Internet Gateway level for the corporate network that took HTTP requests, turns them into SPDY requests and then proxies these back. Now I have doubly fast Internet connectivity without upgrading my connection. For the price of a box that is well worth it.

For home users we could do the same thing. This protocol is software - it runs on TOP of TCP so because of that a Firmware upgrade of your average Netgear or Linksys home router could get you the same benefits as those above. ISPs could force this remotely on certain systems (Cable for example) or provide info on how to do it such as through a web, phone or personal service.

So for all the nay-sayers out there - this is a MASSIVE opportunity to speed up the web and people need to think outside the browser sometimes. QoS was delivered at the router level based on intelligent packet analysis - that speeds up network traffic massively but it's a software change not a hardware one.

I don't think it will be long until we see Netgear and Linsys start promoting this like they did with the WiFi standards and force adoption because it makes a great marketing case to do so.

I'll be trying this out at the rawest state to see if we can make it work and if I can, watch how fast our servers and network gateway get upgraded before I embark on upgrading client machines.
