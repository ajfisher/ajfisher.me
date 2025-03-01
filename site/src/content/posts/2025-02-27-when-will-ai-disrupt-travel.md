---
title: "When does travel planning get seriously upended by AI?"
slug: when-will-ai-disrupt-travel
author: ajfisher
date: 2025-02-27 10:30:00+11:00
layout: post
excerpt: >
    AI is everywhere in the travel industry - just not where most travellers
    see it. Chatbots can churn out a basic itinerary, but true AI-native trip
    planning has a much higher bar to clear. Personalised recommendations and
    seamless bookings may still feel out of reach, but we might be closer to
    change than it seems.
twitter_excerpt: >
    AI is all over travel, just not where you see it. Trip planning feels stuck
    in the past, but AI-native changes might be closer than you think. ✈️🌏
    #AI #travel #futureOfTravel
featureimage: ../../img/posts/travel_hero.png
imageby: ajfisher - Flux.Dev
listimage: ../../img/posts/travel_list.webp
featured: false
tags: business, ai, growth, predictions, strategy, agents, innovation
---

One of [my colleagues](https://www.linkedin.com/in/jim-nelson-2881582b/) posted
an interesting question to our group chat this morning that got me thinking in
more depth about this topic.

“Where is the AI lift in travel?”

On the face of it, the opportunities for AI across the whole travel ecosystem
are many and arguably there already *is* a lot of AI in various elements of it
(eg pricing of flights, demand prediction etc). But where is consumer AI in all
of this?

At this point in 2025, most of us who use AI tools have at least experimented
with a prompt that goes something like, “I’m going to Paris in September for 7
days. Can you give me an itinerary of things to do while I am there.
Additionally, can you give some recommendations for places to stay in the
Marais district?”

Anyone who has done this will get an okay, but entirely beige travel itinerary
that is pretty much designed for the cruise ship set over 75 full of
wonderfully stereotypical suggestions for places to go. Louvre? check. Eiffel
tower? check. Notre Dame, Place des Vosges, Musée d’Orsay? Check, check and
check.

You can try and push it a bit more by saying you’re in your 20s and want to
skip the touristy stuff. Something like, “Okay, I'm looking for something a
little more edgy. A little less well trodden path touristy. I'm traveling with
some late 20s and early 30s people and want something that is a view of Paris
from this angle. Let's not go beige and safe like I'm 60 years old and visiting
on a cruise tour.”

I recognise the prompt above is ageist, but this does force the recommendations
to change. Interestingly, it generally pushes places to drink rather than
things to do. That said, it did recommend [Madame
Arthur](https://madamearthur.fr/) (Drag meets cabaret) which I am definitely
visiting the next time I’m in Paris.

As with everything, we look at a new technology through the lens of what has
come before. In this instance the chatbot is really just a proxy for picking up
a brochure from Flight Centre, getting a guide book or reading some listicles
about the 10 best things to do in Paris. It’s providing a flavour of things
that are on offer, through a particular lens (the prompt in this case), and
then it’s up to you the user to turn  this into something meaningful and create
your itinerary from there. It’s a brainstorming tool.

## Are AI agents the solution?

In our teams chat, everyone pretty much agreed that AI agents go a long way to
help solving this. AI tools that can hook into APIs, retrieve live data about
costs, availability etc would add texture to the experience as you can start to
have a realtime view of whether your trip is possible or not what it might cost
and what tradeoffs you might be making. This could be supercharged if those
agents might be able to execute “holds” in the system on your behalf as well
while you organise everything.

AI agents currently feel a bit overhyped on the basis that for every problem, a
well trained “AI Agent” seems to be the solution. The question is how well do
you have to train said agent to be materially useful and solve the user’s need?
TBD on this for the moment outside of trivial use cases.

Part of the problem I have here is that travel was one of the first industries
to be widely digitised and there’s been over 20 years of optimisation applied
to search and booking systems. As a result, the sheer speed at which I can now
select, book and pay for everything from transport to activities to hotels is
pretty incredible. For a little while yet, it also likely this will be faster
than briefing an “AI Trip Agent” to try and do this for you (not least due to
the friction that will be introduced to add checks and confirmations before
committing cash on your behalf).

## A high bar to get over

The bar to solving this is pretty high when you think about it - and [agentic
AI](https://en.wikipedia.org/wiki/Agentic_AI) is a necessary precondition to
have any kind of chance at doing this. But it probably comes together as a
specialist application or service.

At its heart you need a hyper local travel guide attuned to your *taste*, up to
date information available, high levels of accuracy and the ability to reason
through the relevant information to ensure the plan is actually feasible like
the best travel agents.

Taking each of these in turn.

### Taste matters

Just about every place of note is now mapped, reviewed and has at least some
basic online presence. Yes, there will be that bougie sandwich place not even
on insta that serves from a hatch in a laneway - but that’s the sort of thing
you’re only going to find in the moment.

Taste cuts through the “everything” noise and provides opinionated perspective.
Most people don’t want more choice, they want one or two options attuned to
their needs and desires. Most people can’t really articulate their taste but
intrinsically know it when they see it - outsourcing this helps.

A beige everything engine needs to be pruned back hard to provide that hyper
local knowledge and be opinionated enough to make good recommendations. A
classical nostalgic, history and culture centred trip to Paris is very
different to one centred around clubbing, music and shopping.

Solving for this will probably mean fine tuned models that force results away
from the beige - very much like adopting a character or persona and then
putting any recommendations through that lens before surfacing. Trained well
enough, these agents could achieve results similar to the “locals list” that
friends give each other when visiting cities they know well.

### Up to date information

Thankfully this one is relatively easy to solve given the wealth of online
information and APIs that exist around this area. This is one of the big
benefits of 20 years of digitisation in travel. But APIs and pages designed for
programmers and humans may need variations for AI agents so there’s probably
some other interesting work to be done on this side.

By the same token, to have up to date information, AI agents will need to scour
the available information and then try and parse that back into a form the
orchestration agent can handle effectively.

### Accuracy

We all know LLMs hallucinate, it’s part of their charm and anyone who has tried
the whole AI itinerary thing will know that they recommend places that sound
feasible and interesting but don’t exist.

Again, digitisation of virtually every known place in any well known place
helps solve for this.

There’s multiple ways to tackle this; whether it’s having a big database of
places the application can look up and validate against, or doing the same
thing with an AI agent simply doing a web search and visiting the site of the
place to confirm it. Whatever form it takes, it will be critical to push all
the recommendations through a filter of “does this place exist and is it still
open?” (and open when the user wants to visit).

Flights and trains tend to be a bit easier in this regard as routes are well
defined and there are really great APIs that exist for availability, route
planning and travel times.

Our current crop of tools like [Rome2Rio](https://www.rome2rio.com/),
[Kayak](https://www.kayak.com/) etc all solve some of this for the travel
element of this and tools like [booking.com](http://booking.com) etc solve the
accommodation side, but the long tail of “is this bar open on Wednesday night
past 11pm?” is quite specific, and agents will require some extra capabilities
to parse that information out of web pages (or images from Instagram posts).

### Orchestration

Bringing all this together is the orchestration layer. An AI Agent will help
coordinate the various sub agents and tools to get all the information, however
bringing this into a form that the user can interpret and refine will be a
critical element to this.

I’m not sure a chat interface or even a
[Canvas](https://openai.com/index/introducing-canvas/) /
[Artifact](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)
/ [Google Doc](https://support.google.com/gemini/answer/15719111?hl=en) is the
right means for this.

My sense is that you’d want some sort of custom interface that outlines the
itinerary but provides summaries of information, highlighting where travel
events versus activities versus accomodation etc.

Behind the scenes, this orchestration system would need to calculate essentials
like managing to budget, dates and times and also how long it takes to do an
activity and get to the next place - especially considering model of transport
(walking from one place to another may be faster and more interesting than
catching a train or a bus or taxi).

At this level, the user would need the ability to provide feedback - removing
items that are not of interest, giving feedback on various items or,
potentially selecting between a couple of heavily curated options.

The user should also have some degree of “what if” scenario planning evident.
For example showing an alternative set of arrangements if the weather turns too
hot, or is pouring with rain etc. This could also extend to doing things like
dialling down the eating out budget but dialling up the amount spent on
activities.

For instance, if my budget is $2,000 total, can the agent adjust accommodation
costs to free up money for a day trip or a special dining experience? This
requires an interface that clearly communicates tradeoffs. This is something
far more nuanced and detailed than a chat thread.

Having an approach like this would also provide a live interface into the
workings of the sytem that would enable those crucial iteration steps that are
needed when you build a travel itinerary.

## Looks good. Book it for me…

The real killer part of this will be making all the reservations and booking
things in in one go for the user. Some of this can easily be done by API
(flights, rail, hotels and some restaurants or activities). Other parts will be
much more troublesome.

Some text to speech might help here, with the booking agent able to call a
location on a user’s behalf and ask to book in for them. [Google did try this a
couple of years ago](https://support.google.com/business/answer/7690269?hl=en)
and got pushback, however I suspect there were [still enough glitches in turn
taking](https://www.theverge.com/2019/5/9/18538194/google-duplex-ai-restaurants-experiences-review-robocalls),
responsiveness and interpretation that it wasn’t really ready. Another year or
so will likely see this being good enough that any place that takes bookings
over a phone but not web could accept this.

Similarly, an agent being able to navigate a custom booking system would also
be a requirement here due to venues potentially having rolled their own or
using something that is local to their market but isn’t so common it is well
defined.

Side quirks such as dealing with providing additional information for an
experience (eg weight if you’re doing hang gliding or skydiving) would be
interesting weird things an agent would need to surface back to the user to get
feedback on before being able to commit to the booking.

There’s huge privacy and liability implications in all of this as well. Any
tooling would have to have a huge amount of personal information available to
it to handle the myriad questions it may have to answer. There may be some
liability issues to tackle around misbookings or booking something the user is
ineligible for (eg booking a concession ticket when they don’t meet the local
criteria for it).

Finally, handling exceptions to all of the above in a clean way that doesn’t
overwhelm the user would go a long way to opening this up.

Since the disintermediation of the travel industry by digital technology, we’ve
now got two generations of travellers who have never used a travel agent to
book anything and had to DIY all of their travel entirely. We’re on the cusp of
being able to have better assistance and to make the organisation of travel
easier again for individual users but there’s still some work to be done.

I think we’ll have some time to wait for all of this to come together but I
also feel that we’re likely to see some further advances on tools that we
already use. Persona driven, dynamic itinerary creation would be an
interesting, valuable addition to start and this might be the step that really
changes the way we organise our travel.

For the moment, we’re likely to see incremental change - better trip planning
UIs and agentic tools that handle simple bookings seamlessly. As each piece
drops into place, travel may go through a revolution gradually… and then
suddenly.
