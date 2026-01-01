---
author: ajfisher
date: 2012-06-10 01:29:55+00:00
layout: post.hbt
title: Is this the end of Windows Server?
slug: is-this-the-end-of-windows-server
tags: cloud computing, open source, development, internet, linux, predictions, os
listimage: ../../img/posts/windows_server.jpg
featureimage: ../../img/posts/servers.jpg
imageby: Shawn T. O'Neil
imagelink: https://www.flickr.com/photos/oneilsh/14601920735
excerpt: >
    A sacred cow has been bumped off over at Micrsoft with Linux now available
    in Azure instances. This is a major change in the server OS world.
twitter_excerpt: >
    Azure team ups the ante by allowing Server OS rival Linux into their data centre,
    and probably saves the business.
---

Well, probably not quite yet - just look at how long it's taken Unix to die in the data centre. However I can't but feel that Microsoft's [announcement this week](http://www.zdnet.com/blog/microsoft/windows-azures-spring-fling-linux-comes-to-microsofts-cloud/12869), that they will now be supporting Linux under Azure, represents a fundamental shift in the balance of power of server operating systems.

Microsoft haven't been competitive on the web server and database side of things since the [middle of the decade](http://news.netcraft.com/archives/category/web-server-survey/) with steady decline since then. Yet, they've held up more strongly in the traditional data centre side of things and the conventional wisdom is that historically Linux has gained at the expense of Unix - ie workloads were being migrated to Linux when they came under review. More recently we've [seen that wisdom be questioned]((http://www.linuxfoundation.org/publications/linux-foundation/linux-adoption-trends-end-user-report-2012) and importantly the role of Open Source within the enterprise has[ hit its tipping point](http://blogs.hbr.org/cs/2011/03/open_source_software_hits_a_st.html) and is now becoming entrenched as a respected method of providing software.

All of this started before we seriously began moving workloads to cloud environments though. Revenues from Azure are hard to come across but are tipped to be about $200-400M, compare this with [AWS](http://aws.amazon.com) however which has just broken $1.2B this year. Azure strategists would be looking at those numbers and wondering why they weren't getting anywhere near given their marketable base (and dominance in paid server revenues) and asking serious questions about the validity of Windows Server and SQL Server within a cloud environment.

## End of days?

While this post stems from an action by Azure, it's really about Windows Server and the end of an era.

The reality is that Windows Server and SQL server in a cloud environment just plain suck. I know, I've tried it - indeed for some workloads I have to use it. It's terrible for multiple reasons. Obviously there's price, it's going to cost you a lot more, even with PAYG licensing than any other OS. But more fundamentally, the Microsoft stack is too monolithic for most cloud applications to be really useful. If I want a constellation of dedicated machines undertaking different tasks that I can scale independently, I'm saddled with Microsoft's stack all the way down.

Okay sure, I don't HAVE to use IIS, I don't HAVE to use SQL Server and I don't HAVE to use .NET. But if I don't have to use any of these things, <b>why the hell would I chose to run any of the alternatives on Windows?</b> All I'm doing then is opening my application up to more stability, management and development problems and I become a second class citizen as a result. Only an idiot actively chooses to be a second class citizen in any instance.

Here's why that has happened. Over the last 5-6 years, largely BECAUSE of the shift to commodity infrastructure services like AWS and [RackSpace Cloud](http://www.rackspace.com/cloud/) etc, what we've seen is a refocussing of the efforts of hundreds and thousands of developers on tooling to support the differences in this architecture. No longer was the system design about expensive hardware that had to have maximal utilisation and so required a monolithic approach to your workloads - architecture moved towards a more modular approach (not N-teir or even service based) and take advantage of being able to run different workloads on differently instanced machines (eg high memory or high CPU or both etc) that are dedicated to the task at hand.

So now most applications and services designed to take advantage of cloud based architecture are using Linux as the core with layers on top of it to achieve this. For the web there's not just [Nginx](http://www.nginx.org), but a host of application servers such as [Gunicorn](http://gunicorn.org) and [Node](http://nodejs.org) that are designed to work with it for specific tasks. You've got [Varnish](http://varnish-cache.org) to do content caching, [memcached](http://memcached.org) to do data caching. And this is just the web based stuff, before we start talking about things like [RabbitMQ](http://rabbitmq.com) for messaging and the multitude of NoSQL data stores (eg [Riak](http://www.rackspace.com/cloud/), [Redis](http://redis.io), [Hadoop](http://hadoop.apache.org) etc).

If you're building a serious new application, regardless of whether it's a web app, and certainly regardless of whether it needs to be "web scale" or not, you're quite simply not going to find the breadth of tooling available to you anywhere other than Linux. Yes, out of those applications I mentioned above, some can be run on or interfaced with Windows Server. Why would I want to be a second class citizen in my own application though? If I'm going to build a new application for our business, why would I put it on anything less than the best of foundations? No one in their right mind would run something like Gunicorn on a Windows server in production!

Back in the day, many of these applications would be ported back to Windows due to developer demand (eg Apache, PHP, MySQL etc). Now, the fact <b>that few are bothering is a sure indicator of how irrelevant Windows Server is</b> to new projects leading the direction of technology for this next decade. In an evolutionary sense, Linux has provided a better host for rapid development of new projects that simply couldn't or wasn't possible under Windows. As a result, Windows Server has become an evolutionary dead end and will slowly become extinct.

Given this scenario, if I was the product manager for Windows Server, I'd be seriously polishing my CV - and probably giving [Canonical](http://www.canonical.com) a call, or at least applying to the Mobile or Gaming divisions where Microsoft are doing some valid and good work.

The news that Azure is going to support Linux has probably got some old school MS employees chewing bricks but it's a smart play in the cloud space. Azure's two most serious competitors are Amazon and RackSpace, both of whom have excellent Linux support AND both support Windows. This move by the Azure team cements them into a position where they can compete effectively and if they have to jettison some old party lines about product support then so be it. Now they can get on with the job of being a credible "Top 3" cloud infrastructure provider.

On balance this is a good thing for Azure, a great stamp of approval for Linux, and I think, the beginnings of the end of Windows server. I'm sure Windows Server will continue for many years and versions yet but I'd like to hope we don't get to see windows server 2020.
