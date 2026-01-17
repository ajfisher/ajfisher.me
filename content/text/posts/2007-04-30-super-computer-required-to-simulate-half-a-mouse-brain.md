---
author: ajfisher
date: 2007-04-30 19:15:00+00:00
layout: post.hbt
slug: super-computer-required-to-simulate-half-a-mouse-brain
title: Super computer required to simulate half a mouse brain
tags: ai, supercomputers
excerpt: >
    Blue Gene L can barely simulate half a mouse brain, a reminder of how far we
    are from human-scale neural models. Small, specialized neural networks are
    likely more practical than brute-force brain simulations.
---

Scientists have published that the've used the [IBM Blue Gene L supercomputer](http://www.llnl.gov/asc/computing_resources/bluegenel/bluegene_home.html) to simulate half of a typical mouse's brain. More accurately they've simulated about half the neurons and just over half the number of synaptic connections for 10 seconds - which because the simulation was running at about a tenth of normal speed showed about 1 second's worth of realtime information.

You can read the whole story [here](http://news.bbc.co.uk/1/hi/technology/6600965.stm)

Don't get me wrong, the guys at Nevada Uni have my utmost respect. I studied a lot about cognition and neural networks when I was at Uni, in fact I specialised in it with a degree in Computer Science and Psychology so I have a fair grasp of how hard this is to do.

What gets me going though is the reasons behind doing it. As can be seen here, [the top Supercomputer](http://www.top500.org/lists/2006/11) in the world can be brought to its knees by modelling half a mouse brain for a very limited period of time. The reason for this is the sheer number of connections (synapses) that occur between neurons - a single neuron in a mouse can influence the behaviour of about 8,000 other neurons. It doesn't take long for the cascade to build up and your computations to start slowing down.

What I find most interesting is that Blue Gene is designed to simulate molecular interactions particularly associated with the degradation of US Nuclear Weapons but it grinds to a halt with half a mouse brain.

I must say that when I was playing with this over 10 years ago we were talking about ant or fruit fly brains which are merely hundreds of neurons in size and our computers were falling over. Given that baseline, the achievement these guys have made is incredible, although using the most powerful computer on the planet just shows you how far we are from modelling a human brain.

Human brains typically have about a 100 billion neurons with many thousands of synapses. Rough estimates put the number of connections at about a quadrillion synapses which for those of you that like zeros looks like this: 1,000,000,000,000,000

Also to note was that when this is done typically one uses random assignation for where the synapses end up, it isn't a true model of how a brain works as there would be too much information to configure and would have to be done by hand. In these models the neurons are loaded into the system then randomly assigned a number of dendrites which randomly point to other neurons. You don't get real behaviour as in hearing and vision and the like but you do get a sense of how the flow of stimulus and response works.

My own conclusion from my studies and keeping abreast of the topic since leaving formal education behind is that small neural networks specialised to a particular task are more likely to have results than large scale applications like this. Even mother nature adopted this process as you can see in evolutionary history that old structures are built upon by new, more specialised ones - you only need to look at a reptilian brain and compare it with our own, particularly the basal ganglia cluster to see the similarities in structure and function. In pulling these structures together you can then start achieving something that is greater than the sum of its parts.
