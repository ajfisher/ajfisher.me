---
title: "Deepseek R1 is capable, but shaped by its geography"
slug: deepseek-r1-geography-bias
author: ajfisher
date: 2025-01-28 16:14:23+11:00
layout: post
excerpt: >
    Deepseek R1 shows strong reasoning, but its safety controls reflect
    geopolitical constraints and may leak into adjacent topics.
twitter_excerpt: >
    Deepseek R1 is capable, but its safety controls reflect geography and
    may bleed into nearby topics. #ai #llm
tags: ai, business, development
featureimage: ../../img/posts/deepseek-redacted-stamp.png
listimage: ../../img/posts/deepseek-redacted-stamp.png
imageby: ajfisher - Gemini / nanobanana
---

I've been spending some time with Deepseek R1 over the last few days after it
became available on Ollama.

In summary, it's a capable reasoning model but it is a product of its geography.

The screenshots below show clean runs of the model, being asked about particularly
politicised events in China and US history. Deepseek R1, even under repeated
prompting won't talk about [Tiananmen
Square](https://en.wikipedia.org/wiki/1989_Tiananmen_Square_protests_and_massacre)
at all, but it's quite happy to talk through the [January 6
insurrection](https://en.wikipedia.org/wiki/January_6_United_States_Capitol_attack)
without any censorship.

![Deepseek image Tiananmen
square](../../img/posts/deepseek-r1-geography-bias-1.jpg)
*Even with some light steering, the model refuses to answer*

![Deepseek transcript. Jan 6
insurrection](../../img/posts/deepseek-r1-geography-bias-2.jpg)
*No qualms working through this historical event...*

![Deepseek transcript. Jan 6
insurrection cont.](../../img/posts/deepseek-r1-geography-bias-3.jpg)
*A reasonable summary of events given no lookups allowed.*

This isn't really surprising given the provenance of Deepseek, and for many
business use cases, such as a summarisation or decisioning engine, this won't
matter at all. But, because of its inherent safety controls relating to banned
topics, the edges of this are likely to bleed over into a number of adjacent
topics and cause weird behaviour.

Imagine being denied a summary when [asking about Winnie the
Pooh](https://en.wikipedia.org/wiki/Censorship_of_Winnie-the-Pooh_in_China) for
instance. In some cases this would be inexplicable unless you have the context
for why this might be banned.

This becomes something else you need to be aware of when using these models (on
top of all of the other "normal" adherence, hallucination and error issues). I'd
be wary about using them to create synthetic data because of this too.

For me, the key story about Deepseek R1 and Deepseek V3 are that <b>open models
are closing the gap</b> on the big closed ones and this builds on the trajectory
we've already seen from Llama3.2, Qwen Coder, Phi4, and others.

There are no moats when it comes to foundational models - the only moat will be
bundling these capabilities up into a compelling UX / CX to make them easy to
use in orgs that want to deploy them. This is the same strategy that allowed
the big Cloud Tech companies to take off (for both good and bad impacts on the
Open Source community - but that's another post).

We're still very much in the "A computer is the size of a fridge" period of AI
models so smaller, faster, cheaper to train and run is very much the future and
this is another data point along that path.
