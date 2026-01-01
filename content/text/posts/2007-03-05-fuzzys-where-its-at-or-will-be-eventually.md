---
author: ajfisher
date: 2007-03-05 16:07:00+00:00
layout: post.hbt
slug: fuzzys-where-its-at-or-will-be-eventually
title: Fuzzy's where it's at... or will be eventually
tags: algorithms, retail, ecommerce
excerpt: >
    Using fuzzy logic can create significantly better customer experience.
    However it hasn't caught on in web circles yet but examples are starting.
featureimage: ../../img/posts/fuzzy_at_sd.png
imageby: ajfisher Representation of fuzzy logic Stable Diffusion
imagelink: https://ajfisher.me/
listimage: ../../img/posts/fuzzy_at_sd.png

---

I'm working on a project at the moment that took a remarkable turn recently.
Most clients we work on are fairly staid in their use of technology - which
suits our company as we are firm believers of the Keep It Simple Stupid
methodology of programming.

I was in a meeting with a client who is a large retailer and we were talking
about "filters" for being able to reduce sets of data returned from the database.
Things like "style", "size", "price" etc - not dissimilar to
[Dabs](http://www.dabs.com) or any one of a thousand other online retailers.
Off the cuff I just said "wouldn't it be good to use fuzzy logic on the filters
so instead of black and white result you get the shades of grey as well". To be
honest I'm not even sure why I mentioned it...

Imagine my surprise when the client said "Show me"... Out came the pen and
paper and 15 minutes later he was sold on the idea and I was left to code an example.

Fuzzy logic is a funny old beast - it is based around this notion that instead
of black and white you deal in shades of grey - black and white are just
extreme examples of the shades of gray. So <b>black might equal 0 and white might
be 1 but in between we can have 0.5 or even 0.3218956</b> if you so desire...
everything belongs to every group at least in part - even if that part is tiny,
or even 0.

I love fuzzy logic - I played with it a lot at Uni when I was studying Neural
Networks - but it has never made it into mainstream web use - mostly because
it is so difficult to implement with a database unless you do a lot of extra
background work. Background work most clients won't pay for.

It does make a big difference though - take this as an example:

Say you have two products, Product A is £295 and Product B is £305.

Now suppose you have a filter, or a search query that says "Give me everything
less than £300"

Obviously Product A gets returned but Product B wont if you are using discrete
maths as it isn't 100% lower than £300.

In the fuzzy view of the world though we can say "Give me everything
approximately less than £300". Now <b>depending on your exact specification of
what "approximately" means Product B may well be returned</b>. Indeed most people
prepared to spend £300 will probably spend £320 so we could say Product B has a
95% fit for this result. As we get closer to £320 the relevance gets less so it
is less likely to be returned.

Ahh, I hear you say, I can do this by just pushing my filter up. Yes you can but
then £321 is left out altogether again. Maybe £321 is not as relevant as £305
but it is more or less as relevant as £320 on this scale.

Fuzzy logic has made huge strides in engineering particularly with control
systems for things like washing machines (if a load is heavy use more water,
if light use less) and airconditioning units (if it is hot turn on harder than
if I am more or less where I need to be) but it has never caught on big time
on the web.

I think that now that fundamental systems are starting to get in place
(e-commerce etc is nowhere near as difficult as it used to be) then we will
start seeing clients and programmers starting to use their brains a bit more
and looking at how we can deliver the best experience for our customers.
