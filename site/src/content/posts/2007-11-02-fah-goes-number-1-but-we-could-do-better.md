---
author: ajfisher
comments: true
date: 2007-11-02 11:44:00+00:00
layout: post.hbt
slug: fah-goes-number-1-but-we-could-do-better
title: FAH goes number 1 but we could do better
wordpress_id: 18
categories:
- general
tags:
- distributed computing
- gaming
- supercomputers
---

[Folding at home](http://folding.stanford.edu/) (FAH) has taken the [Guiness World Record ](http://www.guinnessworldrecords.com/)for being the most powerful distributed computing network with a top speed of over 1 petaflop - (a thousand trillion calculations per second).

This is a remarkable achievement and shows the immense power that can be brought to bear by spare computing power used in a distributed network. The key here though is massive parallelism which means the various nodes in the network (your PC or PS3) are all doing different jobs at the same time and are at various points through these jobs. This is what made FAH and the old title holder Seti at Home (a search for extraterrestrial life) so scaleable.

Individual computers on the network download work units from the central repository, process them individually and then resubmit them back to the central core for post processing.

This is in contrast to say the Earth Simulator of Japan, a massive supercomputer capable of running huge simulations with ridiculous numbers of variables and calculations very quickly but where everything is interdependent. Likewise the ultimate aim of the BLUE project from IBM and the US Department of Energy is to be able to simulate all the forces and atoms of a nuclear explosion to simulate what's happening to USA's aging atomic weapons stockpile as they are no longer allowed to perform live tests.

This doesn't take anything away from their achievement, however it does go to show just how much wasted processing capacity there is lying around on the network.

The FAH project ramped up from 250 Teraflops (trillions of instructions per second) to just over a petaflop by the introduction of 670,000 PS3 owners supplying their hardware, up from the 200,000 PC users who got it to 250 Teraflops. Given that there are over 6 million PS3s in the wild this represents about 10% of the total Ps3 userbase - a quick calculation indicates that PS3 owners alone, should they all connect up to the internet, could provide about 7.5 Petaflops of processing power... this is beore we take into account PCs, XBoxes and Nintendo Wiis.

What this illustrates to me is that many of these projects are limited by their publicity and how "glamourous" they are. Taking nothing away from the geekiness of searching for ET or the importance of seeing how protein folding will affect drug development in the future, a more elegent solution would be an open framework that users subscribe to which is then used by anyone who wants to create a distributed processing application.

For the end user it is seamless and the for the multitude of public projects requiring raw processing cycles it gives them to opportunity to get access to larger numbers than their marketing budget would otherwise provide for. Even private companies could pay to rent processing time thus investing funds back into the project for ongoing development or optimisation.
