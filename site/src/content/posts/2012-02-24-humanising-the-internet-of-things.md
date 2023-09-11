---
author: ajfisher
date: 2012-02-24 10:50:41+00:00
layout: post.hbt
slug: humanising-the-internet-of-things
title: Humanising the Internet of Things
tags: internet, IoT, media, mobile, open source, predictions, presentation, arduino, product
listimage: ../../img/posts/network_cable.jpg
imageby: Open Grid Scheduler / Grid Engine
imagelink: https://www.flickr.com/photos/opengridscheduler/16267326303/
excerpt: >
    Just making your device "smart" isn't enough - it needs to also be usable.
    The human aspects of IoT are consistently forgotten in this new interaction
    space.
twitter_excerpt: >
    Notes from @ajfisher 's talk at Churchill Club.
---

This is a transcript of my speaker notes from a presentation given at the [Churchill Club](http://www.churchillclub.org.au/) in Melbourne on Thursday, 23 February 2012. The overall topic was a [technology briefing on IoT](http://www.churchillclub.org.au/index.php?option=com_jevents&task=icalrepeat.detail&evid=2655&Itemid=1&year=2012&month=02&day=23&title=the-internet-of-things) technologies and business opportunities and had other speakers talk on the specific technologies involved and the networking needs of these technologies.

My view (presented below) was to take a less technical stance and present examples and opportunities to provoke thought on the topic. Due to the format that was used this wasn't the actual talk though it was used as the basis of my discussion points and my opening overview.

## Introduction

Let me ask a question. How many of you here tonight have got primary school aged kids? Put your hands up.

So right now, with just a box of [Lego Mindstorms](http://mindstorms.lego.com/en-us/Default.aspx) and a [couple of hacks](http://dexterindustries.com/manual/wifi/) - all readily findable on Google and YouTube - your average ten year old now has the ability to conceive, design, build and deploy an Internet Connected Thing in their bedroom. When I was ten Lego was mostly fire trucks and spaceships - with some Technic if you were really lucky.

As a young teen getting into electronics I was almost always disappointed. The pay off given the amount of effort required was too low. So the lure of programming - with it's fast iteration and almost infinite malleability was too strong and thus it became my career.

So if kids are capable of playing with this stuff in their living rooms then you can be sure there's applications we haven't thought of yet.

Tonight I want to talk about the how the Internet of Things technologies are being used by humans not just by machines, like how the Sensor Commons is starting to drive social change, how our physical health and well being are being enhanced by technology and how web-facilitated products are redefining our interaction with physical objects and our sense of where the physical-digital boundary lies.

## Some Context

First of all some context for what is happening and why the changes we're seeing are happening so quickly now.

Over the last five years or so it would appear that the other half of [Moore's Law](http://en.wikipedia.org/wiki/Moore's_law) - the bit showing that any given processor will get exponentially cheaper over time has finally caught up with mine and many other people's teenage aspirations.

The Internet of Things is being driven by both sides of the Moore's Law coin - on the one hand we have access to vast amounts of high performance computation available to us whether though PC or Cloud based architecture and on the other we finally have access to enough computing power to put inside physical devices at a price that is so cheap it is almost disposable.

However high performance and inexpensive computation are not sufficient to drive the technological changes we're currently seeing. Along side this we need cheap, ubiquitous communications, and in many places around the world we now have this type of access in both WiFi and digital cellular networks.

So what happens when you have cheap computational power in a physical object coupled with cheap and almost infinite processing power available via cloud services which are facilitated by ubiquitous networks both wired and wireless? What happens to the the world when the price of physical computation and networking drop to the point where it can be given away for free in a McDonalds Happy Meal toy?

Well, we're almost there now and I have some examples to share.

## The sensor commons

Let's start with the most obvious Internet of Things use case - sensor networks and telemetry. But instead of how networks of sensors are creating smart homes, smart cities and everything in between I'm going to focus on how sensors coupled with the web are driving social changes through a mechanism I call the [Sensor Commons](http://ajfisher.me/2011/12/20/towards-a-sensor-commons/).

Deriving from [Open Source](http://en.wikipedia.org/wiki/Open_source), [Creative Common](http://creativecommons.org/)s and [Open Data](http://en.wikipedia.org/wiki/Open_data) movements, the Sensor Commons are being built by grass roots organisations in order to solve the problems they are seeing in their communities. By sharing designs, code and the data they collect, they are providing a means for creating understanding at a local level that are not being achieved by centralised direction.


At the heart of these projects are data aggregators and brokerages such as [Open Sense](http://open.sen.se/), [ThingSpeak](https://www.thingspeak.com/) and [Pachube](http://pachube.com) - who, via web based APIs are providing the ability to push and pull bits into the platform via whatever arrangement of atoms you would like to use. Whenever you hear about a tweeting pot plant, chances are it's using one of these systems to do it via their web APIs.

Much like the rest of the Internet however, for every hundred [tweeting pot plants](https://twitter.com/#!/ajfisherbot), there's a project much more worthy and they don't always start in an architected fashion.

Last year after the Japanese earthquake for example, [some hackers decided to put together an open sourced radiation sensor](http://translate.google.com/translate?js=n&prev=_t&hl=en&ie=UTF-8&layout=2&eotf=1&sl=auto&tl=en&u=http%3A%2F%2Fwww.yapan.org%2Fmain%2F2011%2F03%2Fmeasure_radiation_dose.html&act=url) in order to monitor the amount of radiation in the wake of the Fukushima incident. Notably they were doing this due to the unreliability and non-public nature of official sources. Very quickly, many sensors sprang up around Japan and the Pacific to monitor the radiation levels. Commercial and scientific sensors also had their data pushed to Pachube to aggregate it too. So within only a couple of weeks, pachube became one of the most definitive sources of public radiation data in the world that was good enough to see trends.

Other developers used the data and mashed it up to create mobile apps and more importantly used Google Maps to visualise what the levels of radiation were in real time in general understandable terms. This made it easy for people to start understanding whether 50 micro seiverts was high, low or otherwise - whether it was normal or whether it could make you sick.

This availability of cheap physical devices coupled with ubiquitous networks facilitated by web technologies allowed this to happen in both a time period and geographic scale that few governments would have been capable of achieving. Even five or six years ago, trying to do this would have been almost impossible to achieve.

And now there are many such projects doing similar things - from [Don't Flush Me](http://dontflush.me/) in New York attempting to change people's awareness and understanding of storm water flooding in the sewage network to the [Air Quality Egg](http://airqualityegg.wikispaces.com/) project being undertaken in Europe and US which seeks to provide inexpensive air monitoring devices in numerous homes in order to assess air quality that is typically only being measured in one location in most cities with sensors that cost tens of thousands of dollars apiece.

This humanisation of sensor data through mechanisms like Sensor Commons shows how we will begin to interact with and understand our environments better. From systems that show how much energy a given building is using in real time to visualisations projected into civic spaces that show the levels of satisfaction of residents with local government services. The mashing up of data like this will prove very interesting.

## Meta-Products


If networked sensors are the beginning point of many Internet of Things discussions, [Meta-Products](http://metaproducts.nl/) are it's natural evolution. These are products and services that are built from scratch to take advantage of this new computational and communications architecture and without a significant web component to their design would be be able to exist. They generally create so much value that they totally change the way we behave as a result.

### Health and well being

The classic example is [Nike+](http://nikeplus.nike.com/plus/). What's interesting is that the mechanics of the sensor in the shoe existed previously yet the wrapping up of the Nike+ web services that sat on top of it was what drove it into the mainstream. That ability to track your own performance as well as compare and compete with others was the killer feature.

And with that, they created a new product category that is changing the way we view exercise, health and well being. From the [FitBit](http://www.fitbit.com/) which monitors your activity levels and can monitor your sleep through the [WiThings](http://www.withings.com/) scales that track your weight by simply stepping onto it. We're even starting to see heart rate and blood pressure monitors for the very serious bio data geeks out there.

What I'm most surprised about is that there aren't similar devices yet for pets even though we're quite used by now to the whole idea of the [Internet of Cows](http://www.designculturelab.org/2011/07/20/an-internet-of-cows-and-sheeps/) - livestock tagged with RFID chips being moved around networked farms and other parts of the supply chain for traceability reasons.

Health and well being is a huge market that is still in it's exploratory phase but there is plenty of space for well thought out products and services. [Just this week](http://www.smartertechnology.com/c/a/Optimized-Systems/Wireless-Implant-Meters-Drug-Doses/) approval has been given for a team to move to production of medical implants that receive signals wirelessly from the GP at the appropriate time for a drug to be administered - in order to help patients on serious medication regimens so they don't need to do so many injections and to help with compliance. Welcome to the future of how we'll be administered drugs in our old age.

### Web facilitated physical objects.

Meta-products can also use the web to orchestrate better physical efficiency than existed before. Take flexicar or Go Get as an example. Has anyone here subscribed to their services?

The beauty of [Flexicar](http://www.flexicar.com.au/) and the services like it is it's simplicity - which is in turn driven by web thinking about a physical world problem. This is what happens when physical objects become discrete, track-able data points that can be interacted with via the web. The clue to the thinking here is that each vehicle has a unique name - proving it's individuality. This shifts the conversation from being about a car in a fleet to the car that's around the corner from me now.

Not only has the model changed the way we hire cars; it's also changing the way we view car ownership. Many urbanites are choosing to not own vehicles as they are expensive and see a low frequency of use. Given a means of efficiently managing all the different people who want the car at different points in a day, this model becomes extremely viable. The number of Flexicars springing up around suburbs such as Prahran and St Kilda are testament to how desirable this method of ownership is becoming.

This type of meta product is shifting our behaviour from ownership to access - driven by smart networked objects intermediated by clever web services. There are huge opportunities in this space for urban environments where people are just drowning in redundant clutter - tools such as lawn mowers and other large, expensive tools would be an obvious place to start on this front but we're starting to see similar behaviour in fashion as well.

## Digital Shadows and the physical / virtual boundary

One final example I wanted to share is in the realm of kids toys - which is always an interesting space to see technology opportunities in the future. The idea I think was sound, but it was probably a little ahead of it's time and was a commercial failure but it's worth mentioning regardless.

Disney built a product called Clickables, which was physical jewellery and other objects that you bought. The product was marketed at Tween girls and was derived from the insight that these girls generally behave in a gift culture - that is, respect and social standing are raised by gifting each other - typically through helping others out and making and giving things to their significant friends.

The physical jewellery could be paired with a friends by clicking them together and that would create a friend relationship in a virtual world played online. Here girls could exchange virtual goods and go on adventures together. Obviously the product outcome was that additional physical artefacts could be bought and gifted to another person in the real world and that would unlock achievements, special goods and activities within the virtual one.

As I say, the product itself was a flop and was probably indicative of Disney's lack of network thinking as a Web veteran would put it.This was because the value of the virtual environment was dependent on the number of physical devices in the real world. For any given circle of friends, in order for the virtual world to be useful they all had to have a clickables product linked together - a classic network effect issue. Someone taking another crack at this now would probably have a better run, given the drop in development costs associated with doing this type of work now that would see greater ubiquity of devices.

## Conclusion

And so this that brings me full circle to the question I asked at the start; what happens when web connected, physical devices are so cheap that the hardware is disposable. What happens when a smart device can be handed out for free with a Happy Meal or as part of conference schwag?

As yet we don't quite know where this will go, but those who have web thinking in their core DNA and who can also become skilled in designing and building physical things will architect new products and services. This will redefine whole product segments across toys, wellness, and health care all the way down to changing our relationships with ownership and the way we understand our physical environment.

The web of things for me is about the humanisation of the web, bringing it into our physical spaces and things; in order to enhance them both. This trend is just in it's beginning, but the effects it will have on our physical world and the way we interact with it will be profound.
