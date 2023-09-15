---
author: ajfisher
date: 2007-11-19 10:43:00+00:00
layout: post.hbt
slug: fuzzy-logic-could-book-more-flights
title: Fuzzy logic could book more flights
tags: agents, fuzzy logic, web
featureimage: ../../img/posts/planes.jpg
imageby: Martyn
imagelink: https://www.flickr.com/photos/martynr/129190027
excerpt: >
    SQL makes logic easy for developers, however it also creates boundary issues
    when it comes to sales price matching. Fuzzy logic could help resolve this problem.
listimage: ../../img/posts/fuzzy_flights.png 
---

I've talked about fuzzy logic for use by the retail sector [in the past](2007/03/fuzzys-where-its-at-or-will-be) and the project I'm involved in there is maturing nicely. This week I've really realised how, as software engineers we need to grasp the nettle and move a lot of service based software toward fuzzy systems for usability reasons.

Nearly everyone these days has booked a flight online and when it came time to booking a holiday to Australia this winter, the first thing I did was fire up a browser and head to [expedia](http://www.expedia.co.uk/) and [travelocity](http://www.travelocity.co.uk/).

If I was planning to fly on specific dates I would be well catered for and I could get a list of prices and book a flight in a few easy steps.

I wasn't planning on flying on a specific date though. I work for myself so can take time off whenever I want in a general sense. Really what I wanted was the cheapest flight from London to Sydney in December.

After typing a few different dates in manually I did the sensible thing and called a human travel agent who was very helpful. Unfortunately, as helpful as she was, she only had access to the same systems I did so couldn't tell me the info I needed to know. Mentioning this to friends had the usual "you can't do that" response. Can't do it?! I'm the customer I can book when I want.

Most airlines operate through the SABRE booking network which is basically a massive database of flights from point to point with availability and prices per leg on it. It sits on top of a nice mature API which makes it easy to program against, and that's where the developers leave it.

But as a customer this doesn't fulfill my requirements and this is where engineers need to spend more time thinking fuzzy.

In these days of multi-processor and multi-threaded OSes it is not that difficult to build offline agents that could go and find this information out for a customer and then email it back to them. Indeed I wouldn't mind registering to use this sort of service so now the company has my personal details and they can market to me.

The agent wouldn't even need to respond with all the availability. It could just give me the cheapest 10 or 20, all from a specific operator etc or those flights routing through Hong Kong as a stop over for example. It also doesn't need to be fast. A deprioritised thread could take a day to get this sort of information and if I'm being that vague then time is hardly an issue.

If someone reads this from the travel industry please ask your techies to build this feature. If you are a venture capitalist then give me a call and we can revolutionise the online travel sector!

The web has brought us an always on, on-demand, serviced-based method of interacting with our information but the casuality of this has been flexibility. The days of fuzzification are soon to be upon us and coupled with automated agents some amazing new systems will become available that will give us back our flexibility.
