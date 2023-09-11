---
author: ajfisher
date: 2012-07-25 06:08:02+00:00
layout: post.hbt
slug: web-facilitated-play-in-the-real-world
title: Web Facilitated Play in the Real World
tags: development, gaming, open source, presentation, arduino, hardware, internet, IoT, media, mobile, web
featureimage: swing.jpg
imageby: fuschia.berry
imagelink: https://www.flickr.com/photos/fuchsia_berry/8500896205
listimage: ../../img/posts/swing.jpg
excerpt: >
    How can physical interaction with digital media augment the experience of
    both and what part does the web have to play in this space?

twitter_excerpt: >
    Explorations in the use of web technologies to facilitate play in physical spaces

---

I got the invitation to attend and present at the [Sketching in Hardware conference](http://sketching-in-hardware.com) this year on some of the work I had been doing around integrating real time web communication with physical devices. This aligned well with the overall theme of "Clouds and Atoms".

My presentation was called "Web facilitated play in the real world" and expressed a summation of the work I have been doing over the last 18 months to bring together mobile and network aware physical devices utilising the real time web. My slides are below and the transcript of my talk is underneath.

<p class="mediacontainer"><iframe src="//www.slideshare.net/slideshow/embed_code/key/GqOckL703dY6Y0" title="Web facilitated play in the real world" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; max-width: 100%;" allowfullscreen> </iframe></p>

<p class="caption"><a href="https://www.slideshare.net/andrewjfisher/web-facilitated-play-in-the-real-world">Web facilitated play in the real world</a> - (CC) ajfisher</p>

You can find the transcript of the talk below.

## Transcript


Hi. My name's Andrew Fisher and my background is as an interaction developer and today I want to talk to about web facilitated play in the real world.

Play is fundamental to our lives - from our earliest childhood through to being an adult, play is a core part of what defines our humanity. Technology and play are highly symbiotic with each one helping to drive the other forward and evolve.

Now, I was on a train the other day going to work and saw someone that looked like this; headphones in, iPhone out, totally immersed in what was obviously a multiplayer game. This has become a familiar view of play in the modern world - at times I am this person.

The technologist in me loves the fact we have the technical capability for someone to play a multi-player game from their phone in Melbourne with others in Madrid and Moscow all at the same time. This is brilliant! However the sociologist in me can't help but feel we've had to give something up as a result - and that is, we tune out the world around us almost completely.

I think our shared spaces are causing some of this as well. How often do you stand on a train station platform and see advertising 2 months or in some cases 2 years out of date. Not that anyone's noticed because they are all looking at little black rectangles of glass.

Our civic environment hasn't kept pace with technology and is becoming ever more boring just as our phones become ever more compelling - is it any wonder we tune out?

We have hit an interesting time though.

With approaching a billion smart phones in people's pockets and a billion more expected over the next decade.

With physical computing devices increasing in their capability and increasingly being networked with all the benefits that confers.

And all of this coupled with the web!

But now we have the technologies at our disposal to reshape play again, or at least methods of interaction, in our shared spaces using digital tooling. What could this do for play as a result?

Today I want to show you how this can work.

I'll give a brief introduction to web sockets, then show you the technical architecture for doing this and then round up with some examples and a demo at the end.


## Websockets


So the technology that enables real world play is called web sockets. Web sockets is part of the suite of tech that makes up HTML 5. Thought it's not actually anything to do with HTML directly.

Web sockets is an upgrade to the standard HTTP connection - getting rid of the traditional request / response model. Instead it opens a long lived, bi-directional, network connection that data can be passed along.

This lends itself well to scenarios where you are passing small packets of data very frequently over connections open for long periods like minutes or hours. There's a fair amount of overhead in opening this connection, but once you do it's much more efficient.

The most common messaging arrangement is called ["Pub/Sub"](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) or Publisher / Subscriber. We have a publisher that produces a message and sends it to the web sockets server which acts as a broker and it passes that on to subscribers who consume the message and do something with it.

Now in web sockets world most messages are passed around using JSON because it's lightweight, many libraries exist, it's expressive and flexible.

So this architecture scales well and you can have many publishers and subscribers just producing and consuming messages. Many topologies exist for different needs but this is one of the most common.

Now you understand a bit about web sockets let's talk about how we can use it to connect objects in the real world.


## Websocketing Things


What's interesting about web sockets is that it's a protocol and as such anything that can talk it can become a publisher or a subscriber and work with messages. For example, we could have an arduino with a temperature sensor on it that broadcasts temperature readings every 100 milliseconds to the broker. The subscribers could be a real time logging database for later processing and a web client for real time graphing of the data.

Now scale the arduino out and have 10 sensor nodes, 100, 1000 all producing data in real time that could be used by a dozen subscribers all doing different things with with the data.

As interesting as that facet is, I came here to talk about play. For play, then, we can turn all of this on it's head. So here's a view of the stack I use to do this.

At the top we have web browsers across phone, tablet or desktop with interfaces that create messages.

These get sent to the web sockets server for processing. I use [Django Socket IO](https://github.com/stephenmcd/django-socketio) as I'm a python guy but there's things like [Node.JS](http://nodejs.org/) which are conceptually similar.

The broker then forwards on messages to the subscribers which in this case is an arduino running a mod of [Kevin Rohling's excellent WebSockets](https://github.com/krohling/ArduinoWebsocketClient) library and it then turns that data into some type of physical control.

There's a lot of benefits to using this stack which you can see here, however the main one I want to call out is that as the system is web based and messages are JSON it means I can prototype and simulate EVERYTHING in the browser. This means I can get the web interaction rock solid and the networking totally debugged BEFORE going to hardware which then becomes a decoupled and more straightforward implementation on the physical side.

Now you understand how the architecture works I have three examples I want to share, including one I've brought with me that you can play with.


## Examples


My first iteration of this was purely digital in order to assess the viability of the stack under real world conditions. [Tank Tag](https://github.com/ajfisher/tank-tag) uses the tilt sensor in a phone to drive a tank around on a screen; and the touch screen to fire, so you can tag other players.

The key is that the phone is now the controller and everyone plays together on a shared space on a screen or via a projector.

The largest scale I've had about 100 people playing this on a 40ft projected screen at once. I tried for bigger once and got nearly 150 before the network seized up for volumes of data being shifted.

For my next iteration, I wanted to incorporate something much more physical but also create a sense of team work and focus in the space amongst the players. The tug of war concept was used for this and again players interact with their mobile phones. After hitting a web page the players are divided into a red and green team with their own goals to pull a magnet towards.

This time the accelerometer is used for input and players have to shake their phones as hard as possible. The team that is collectively pulling the hardest at any time will pull the magnet towards their goal and eventually light it up.

This was a lot of fun and really starts to create a sense of shared use in the space given the focus and requirements for team work and it's all facilitated by web enabled devices that people already have in their pockets.

The third example I've actually brought with me from Australia. It's quite simple so it was travel proof but hopefully it will serve to illustrate to you the direction this can all go.

If you want to play with this then point a web browser on any device to [ajf.io/sketch12](http://ajf.io/sketch12) - this won't work in Internet Explorer however so use something else - not that I expect that to be a problem here.

Click on the circles and away you go. As you all can have different colours they should mix somewhat if you hit the same lights at once.

As you can see the interaction is near instant and again there's almost no barrier to someone interacting with this.


## Applications


If you consider my original points about creating interactive spaces by bringing mobile, physical computing and the web together this is how we can do it.

Imagine something like this scaled up to say 10 metres across and hung on the side of a building and all you'd need is a phone with a web browser in order to interact with it. This stack will work in any context where we want to create interaction on a semi mass scale but where physical proximity is important.

So it could be used for interactive advertising for shared user experiences, general civic space upgrades or for spaces like museums to create points of interaction with exhibits via smartphones without having to worry about downloaded apps.

In summary, I've walked you through a tech stack that gives you the ability to harness the real time web and allow it to interact with the real world.

I've got some resources here which I'll send around as a link and all the code is in my [git hub](https://github.com/ajfisher/sketching-conf-demo) for the demos I've shown today. Obviously come and talk to me about this if you're interested and I can show you code etc if you want to see it.

I hope this gives a slightly different view on how we can bring together mobile with physical devices and use the web to facilitate play in the real world.
