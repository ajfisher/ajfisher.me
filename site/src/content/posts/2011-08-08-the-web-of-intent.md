---
author: ajfisher
date: 2011-08-08 11:41:32+00:00
layout: post.hbt
slug: the-web-of-intent
title: The web of intent
large-title: true
tags: internet, media, predictions, web
listimage: posts/will_you.jpg
excerpt: >
    Web applications could handle common tasks such as sharing or pinning using
    an Intent oriented design.
---

Web Intents, Web Activities, Web Actions - call them what you will, I'm going to call them the future of the web app. The idea isn't new - for example the humble mailto: "protocol intent" has been around since about web 0.1 as a means of telling the browser to do something other than render a web page (in this case, fire up an email client and send a "mail to" whoever's email address it was). Various application makers have hooked into this over time to give you more functionality direct from the browser eg Skype transforming all the tel: links to clickable phone numbers so you can [Skype](http://www.skype.com) to directly (as well as doing some regex parsing to trying and find phone numbers in text too). Likewise there have been a [few](http://www.webintents.org/) [thoughts](http://tantek.com/2011/220/b1/web-actions-a-new-building-block) [over](http://web-send.org/introducer/) [the](http://mozillalabs.com/blog/2011/07/web-apps-update-experiments-in-web-activities-app-discovery/) last 6 months or so attempting to develop out this idea with varying levels of success.

For the purposes of this post, I'm going to use the term Web Intent. I know it has android specific loading as well as infers an underpinning API binding but I'm going to assume here they are all interchangeable.

What makes web intents different than a protocol link is that they are fundamentally bound to the services we play with on the web. I look at the applications I have installed on my computer these days and other than the stock things I use to develop code, just about everything I use day to do day is a web app - twitter, gmail, gtalk, flickr, github etc. Installing applications on my computer is becoming a thing of the past, but I haven't replaced this behaviour by installing loads of plugins / extensions for my browser.

Instead; in the tabbed browser world, I simply have tabs up one end of my browser window that are permanently there. I also have a couple of extensions that operate at a meta-level on the whole page I'm viewing - notably bit.ly, evernote and chrome2phone.

![Chalkboard with the phrase 'will you (blank) me?'](../../img/posts/will_you.jpg)

<p class="caption"><a href="http://www.flickr.com/photos/pinkpoppyimages/">image (cc) Poppy Thomas-Hill</a></p>

But all of this is back to front - and this is the beauty of the web intent - I want to bring my existing services to the attention of the page so it can interact with what I'm looking at right now without that web page needing to know anything specific about the Intent directly (eg what protocol or services it also has available).

It's at this point that a demonstration is probably useful. This is the Mozilla labs view of Web Activities which is a similar concept. It's a little contrived because nothing exists yet except the flickr plugin but it explains the idea. Go ahead, watch the video, this will wait.

<p class="mediacontainer"><iframe title="Demonstration of web activities by mozilla" width="560" height="315" src="https://www.youtube.com/embed/m5_YDG_jiYg" frameborder="0" allowfullscreen></iframe></p>

<p class="caption">Demonstration of web activities</p>

So now you get the idea - as a user I can "install" personally useful web apps that do certain things and when I want to use them I can push the content to the app which then interacts with it in some fashion.

That's all well and good but I can imagine my "app tray" beginning to look something like my twitter favourites or my browser bookmarks so will get out of control pretty quickly. Likewise, as a developer I struggle with this issue all the time. Just tonight I was updating the share plugin for word press and there are over 50 places I can share a link to - if I was to list them all the share system would be bigger than this blog post. That's insane! I get into trouble about this all the time with clients - yes I know you still think everyone's using mySpace but seriously no one's sharing there - least of all from your professional services oriented blog post.

As a user I probably use two (either facebook or twitter as well as email), possibly three (add a bookmarking service of some sort) and rarely use four (say chrome to phone). I'm a power user - my mum just shares it to facebook - my wife just copies the link into an email.

So now I'm going to talk about real intents as I see this developing. I see this broadly aligned to the way Android Intents work, which as a developer was one of the strongest features of the early platform. It allowed developers to build upon others' work without needing to worry about the specifics of the programming library (which is how you usually build on programming code) or the API (which is how you usually interact with other web services).

Real intents are exactly that, they capture the "idea" of what you're trying to do and take action upon it. The best one I always think about is sharing. Say I have a page, a snippet of content or a photo and I want to share it. What do I do? If it was a URL I could bit.ly it, I could send it to my phone, I could email it, tweet it, facebook send it, facebook like it, digg it, ever note it, reddit it or all sorts of things. The reality is I'd probably just tweet it, I may email it and if I want it later it'd evernote it.

This is where intents come in. As the page author (or web application author) <b>all I need to do is declare the intent "Share URL" and the browser will query my services that match that intent</b> and provide them to me. Only the web apps that can service that intent will appear and there'll be extra points for a browser that tracks how often I use each one and surface them to the top of the list.

I could also have "Share image" which will render a different set of intents - including local and remote printing services for example. "Save for later" could sync it to my reader, send it to my kindle or phone, create a diary entry for me to read it later or just book mark it.

And so the realm of intents gets created and we come full circle with the web - the idea that there is an interconnection of information and services that are all interrelated and can interact with each other. To me this starts looking like the real semantic web - no top down taxonomies, no RDF, no microformats and no standards bodies arguing for 5 years on the best way to construct a "share protocol". This is classic survival of the fittest. The same way links between sites and web apps themselves work - a democratic, user oriented, grass roots approach to self-organisation of services.

Within the Android community, certain "intent patterns" quickly emerged - sharing, video watching and photo manipulation being the most common. No one architected how these worked, <b>no governing body decreed that to share a URL "one must call this method"</b>. The beauty of this is that as an app developer I can choose which intents I'm going to "service" as well as which ones I'm going to "call".

"But how are you going to keep track of all these intents?" I hear the cry going.

It doesn't matter, you'll learn pretty quickly what's important and we'll coalesce around the main ones pretty quickly (by virtue of them being smart, logical and useful - like web sites and apps themselves). What will make this beautiful for the end user is if the application calls for an intent that isn't installed and it goes off and searches the web for intents that match - giving the user the opportunity to install one.

We're a little way off this nirvana in my view, but not as far as you'd think. With the clearing of some of the old browsers we're pretty much on an ever more rapid upgrade path that will see more users with this technology in their hands more quickly. It will only take some early adopters on the web publishing side to start using it to gain traction very quickly. Imagine a day in 2013 when you can view a blog post or a news article and when you get to the bottom, instead of being assaulted by 20 share icons that look like a designer vomited on the page, you get one elegant button just saying "Share this"...
