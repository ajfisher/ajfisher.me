---
author: ajfisher
comments: true
date: 2009-07-26 12:46:00+00:00
layout: post.hbt
slug: case-study-django-agile-sportsgirl-redevelopment
title: 'Case Study: Django + Agile = Sportsgirl redevelopment'
wordpress_id: 43
categories:
- django
- open source
- web
tags:
- agile
- apache
- case study
- development
- nginx
- process
---

I've decided to write this one up because there isn't much on large scale and high speed Django development as yet and this is all still fresh in my head so it's worth getting down on paper (or screen as it were).

The agency I work for, [Citrus](http://www.citrus.com.au/), works with [Sportsgirl](http://www.sportsgirl.com.au/), an iconic Australian Fashion Retailer and we were commissioned to help them build a community component to their site to help create a social shopping experience. The [store](https://shop.sportsgirl.com.au/) was already there and was built as a bespoke Flash / .NET application and we had the opportunity to sit this on a different box in the data centre anyway. We thought this would be a fantastic opportunity to use [Django](http://www.djangoproject.com/) and is exactly what it's designed for.

Architecturally we are using a LAMP stack using RHEL 5, Apache 2, mySQL (yes I know but it's to do with hosting) and obviously Django. Process wise we actually use an agency version of [Agile](http://en.wikipedia.org/wiki/Agile_software_development) that allows a collaborative effort between Designers, Application Developers and User Interface Developers.

Overall we were on a fixed deadline that meant the production phase was less than 8 weeks from sign off to go live including production of the site, interface and design then lock downs for content population and testing.

To make this work, everything was based around the platform - we chose as a base Django 1.0 and then layered into it a stripped down version of [Pinax](http://www.pinaxproject.com/) (we currently use v0.5.1 - the current official release, with updated apps) that has user profiles, avatar and gravatar functionality, photologue photo / image management, blog, pyBB forums, user voting and commenting.

With an established platform all three teams could start working concurrently much more effectively. This is one of the biggest benefits of Django and working to a framework and platforms like it because code can be prototyped so fast to a development build that everyone can see what they have to play with - Thanks to [@jtauber](http://twitter.com/jtauber) and team at Pinax for that as well.

From there it was a case of lots of designing, interface creation, development and review to get it into it's final state ready for testing.

During this time we also worked on the flash home page produced by our [flash master](http://twitter.com/craigk) complete with nice collision detection, and full modularity so maintenance on this is all about creative not about development every time there's a refresh (very often on this brand). We'll cover this in more detail at some point.

The final phase saw deployment to the live environment which we did in [Amazon EC2](http://aws.amazon.com/) for launch. We did this primarily for scalability reasons as the launch was going to be pretty large and promoted both on and off line.

As part of our final testing we also performed a lot of optimisation, this was based around optimising queries Django was making to the DB on both ends and we also then rolled out our delivery optimisations.

The first part of this was to implement [memcached](http://www.danga.com/memcached/) which is simply one of the best pieces of software presently available for data driven applications. On launch day we had a cache hit rate of over 80% which meant only 20% of all possible queries were going through to the database. With a couple of hundred thousand people visting the site during the launch phase this was instrumental in keeping particularly RAM usage low on the DB server as well as removing any bottlenecks to the Database due to latency.

We used nginx alongside apache to deliver all the static files on the site (not least because the imagery is so hi-res it was killing Apache to serve it!!). I'd often wondered how well this would work with a reasonably trafficked site but I wasn't disappointed. nginx dropped the load off the apache server which struggles for both CPU and memory (even with static files served outside of Django) from peaks on pre-live at 90% CPU and 70% available RAM + SWAP to 25% peaks on CPU and 30% RAM which is what Django was using to deliver pages with Apache's overhead.

The site went live on July 8, 2009 coinciding with a very large in store, off line and online campaign that drove quite a bit of traffic to the site. The server functioned exactly as required and with the optimisations peaked at only about 60% utilisation.

Overall this was a great project to work on not least because of the Agile process coupled with a technical foundation that allowed us to work even more collaboratively. 8 weeks for a major site launch is hard work for everyone at all levels no matter what their involvement. A great team helps with this but having the benefit of fantastic Open Source platforms to get our clients into market makes this even more achievable. Even less than 2 years ago I'm not sure I'd have attempted what the team achieved.
