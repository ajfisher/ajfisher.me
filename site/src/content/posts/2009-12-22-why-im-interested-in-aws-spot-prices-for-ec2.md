---
author: ajfisher
date: 2009-12-22 06:46:00+00:00
layout: post.hbt
slug: why-im-interested-in-aws-spot-prices-for-ec2
title: Why I'm interested in AWS Spot Prices for EC2
small-title: true
tags: AWS, cloud computing, commodities, development, sysadmin
---

There's been a lot of chatter going on around the intertubes over the last couple of weeks since [Amazon Web Services](http://aws.amazon.com) released their [Spot Instances](http://aws.amazon.com/ec2/spot-instances/) pricing model for EC2.

In a nutshell - AWS have created a compute market. Instead of charging the same price to every person for the same product they have basically created a market where people can buy compute time at less than a price they are willing to spend based on the current demand.

There's been some conversation about the fact everyone should just put the current demand price in as their maximum and this would game the system ([the comments here for example](http://gevaperry.typepad.com/main/2009/12/amazon-ec2-spot-instances.html)) however this misses the point slightly. The [Clouderati](http://twitter.com/#/list/ajfisher/clouderati) often talk about Utility Computing or Commodification as one aspect of Cloud Computing and what AWS have done is the logical conclusion of that - they have created a true market for the provision of computing time based on supply and demand.

Now what's interesting with the ideas some commentators have come up with regarding gaming is it assumes everyone's working the interest of everyone else. That isn't the case. Yes I know I could get some resource cheaply if I keep my bid low and am willing to wait for a period of time however I have clients and they have deadlines. That big compute job crunching all the marketing data needs sorting out this afternoon - so I'm going to put a high bid in for 50 nodes NOW! The market will accommodate that and those with low bids will be knocked off. Thus the market constantly corrects to the requirements of demand.

But it's the flipside of this which makes me really interested in EC2 Spot Instances. I can have a battery of servers doing work at little to no cost if I build my system correctly.

The critical element to this is I need to address availability correctly - that is I need to ensure that my entire system doesn't go down because I've been priced out of the market.

This is a really rough idea at this point but I'd love feedback around it - it's obviously based around some kind of online application that requires multiple nodes.



	
  * I have an instance which is the master. All parts of the stack could be retreated back to this server if it's needed.

	
  * I have Cloudwatch or some other monitoring system assessing the performance of my nodes so I can see when I have spare capacity or when I'm under utilised.

	
  * The master server has a series of heuristics looking at the current work loads and the current costs that each server is incurring versus the work it is carrying out. Thus low utilisation and low cost is okay but low utilisation and high cost would cause alarms to go off.

	
  * The heuristic set up makes reference to the demand pricing level and strives to always keep each instance below that price.

	
  * As the spot prices go up and over the demand price I immediately terminate expensive spot instances and start replacing them with lower price demand ones. As the price comes back under then I can replace demand prices with spot prices

	
  * The master server then creates instances as required to fulfill the work units that are required and link them into the system.

	
  * Each node is able to be switched off mid unit so the entire network is self-healing


So the only thing that would be required to get this up and running now is having a reliable system for creating nodes and getting them working into the network as quickly as possible and producing the heuristic system to monitor and create and destroy instances based on some rules that would create some intelligence around pricing.

Not least the system would need to determine whether a mix of different types of instances would be appropriate if there are large distinctions between their current spot price for given work units. For example:

If we were serving a bunch of web pages using some heavy duty memcached system then RAM is the most important commodity. Say I have an instance of 1.7GB RAM at 3C/hr and another instance of 7.5GB RAM at 15C/hour then my intelligence system needs to understand the component (Memcached) just needs buckets of RAM and that getting 5 instances at 3C/hour is better value than 1 at 15.

Importantly it can then ramp up towards that number based on what is actually required rather than doing the whole lot and then under-utilising.

So I think we're quite a way away from this type of system but my opinion is that this isn't out of the realms of possibility and importantly the market Amazon has created has allowed (I could almost say "is going to force") these types of architectural considerations to start being made.

Interestingly all of a sudden decisions I am going to make around infrastructure is going to be much more value based. It's not about ROI - it's about value and am I getting the best value from my infrastructure. IT teams that get this are going to make an absolute killing with the type of services they can offer and the prices they'll be able to do it for.

Am I off my rocker? I'd love to explore this idea further.
