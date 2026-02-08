---
title: "Nous Research pioneers distributed LLM training"
slug: nous-research-distributed-llm-training
author: ajfisher
date: 2024-12-03 11:41:51+11:00
layout: post
excerpt: >
    Nous Research is training a 15B model with distributed techniques,
    pointing to a future where more organisations can train their own LLMs.
twitter_excerpt: >
    Nous Research is training a 15B model with distributed techniques.
    A potential unlock for broader AI access. #ai #distributedcomputing
tags: ai, distributed computing, innovation
listimage: ../../img/posts/nous-research-glitch3.png
featureimage: ../../img/posts/nous-research-glitch2.png
imageby: ajfisher - gemini / Nous Research
---

Some genuinely interesting innovation is coming from [Nous
Research](https://nousresearch.com/) where they are training a 15B parameter
LLM using distributed training techniques.

The [paper](https://github.com/NousResearch/DisTrO/blob/main/A_Preliminary_Report_on_DisTrO.pdf)
this project was based on provides more technical depth to how you actually
build a highly distributed training process.

Training is nearly complete and you can see its [status on the live
dashboard](https://distro.nousresearch.com/).

Being able to use multiple datacentres around the world could be a game
changer for how training is currently conducted.

Distributed compute and services (plus on demand usage) was one of the biggest
unlocks for Cloud tech and I have high hopes that distributed model training
will be a big AI unlock. Not least to allow more orgs to train their own
models and we can get out of the current "Big tech" / "highly funded" era.

Service centralisation is expensive as well as being extremely fragile. If
something goes down (eg mid training run) then everything stops dead. <b>In the
worst case this could mean throwing out the entire training run</b> and starting
again.

Modern cloud / distributed architectures assume that services will just die
inexplicably and they build resilience into the design. Most AI training methods
don't have this resilience and so they just halt.

As a result, many AI data centres overbuild in terms of capacity and redundancy
which makes them more expensive to build and more expensive to run. This
directly increases the cost of your training run.

Additionally, with a normal data centre you want to run it at high utilisation
so the hardware isn't sitting idle. With AI training workloads running in a
centralised location, it may not be possible to have them running all the time.
This means more wasted resources - which you're still paying for
to sit idle. Again, directly increasing the costs of your training run.

Distribution of training is a huge unlock, as it inherently solves for these
problems.

It also incidentally addresses the issue of AI data centre energy use.

This isn't by using less energy directly. Instead, by spreading out where the
energy is being consumed it can ease pressure on the grid. This in turn can
leverage things like renewables or route to where there is an excess of energy
being produced so it isn't wasted.

If this works (and it seems to be working so far) at scale then this is a big,
pragmatic step forward for AI training methods. It will give more researchers
the ability to build their own models, be less capital intensive and less
impactful in infrastructure needs.
