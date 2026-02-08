---
title: "Mistral 3 Small could unlock powerful local AI use cases"
slug: mistral-3-small-local-ai
author: ajfisher
date: 2025-01-31 17:51:27+11:00
layout: post
excerpt: >
    Mistral 3 Small is fast, lightweight, and ideal for local workflows,
    but it exhibits knowledge compression when compared to bigger frontier
    models.
twitter_excerpt: >
    Mistral 3 Small is fast and lightweight for local AI, but with a
    compressed knowledge base which may limit some use cases.
    #ai #mistral
tags: ai, business, development
featureimage: ../../img/posts/mistral-3-hero.png
imageby: ajfisher - Gemini / Nanobanana (Mistral Logo via Mistral.ai)
listimage: ../../img/posts/mistral-3-list.png
---

It seems like this week is proving to be a particularly big week for AI models
that you can run on your laptop. Seemingly not to be outdone, [Mistral has
dropped Mistral 3 Small today](https://mistral.ai/news/mistral-small-3/), which
has been optimised for speed and footprint size.

The model certainly runs on my laptop (M2 Macbook Pro) easily and from my early
benchmarking, the memory use is really low compared to Llama3.3. It's also
*incredibly* fast - token generation is lightning fast.

Assuming you were working locally and had local [STT](https://en.wikipedia.org/wiki/Speech_recognition)
and [TTS](https://en.wikipedia.org/wiki/Speech_synthesis) set up I suspect
this could provide low latency for interactions that don't require backing data
or network lookups.

The biggest gap I can see immediately is that there's been considerable compression
of the knowledge base. Whereas with [Llama3.3:70B](https://www.llama.com/docs/model-cards-and-prompt-formats/llama3_3/)
you can ask it about specific blog posts by users and it will actually know
what you're talking about (without looking it up), it seems
[Mistral 3 Small:24B](https://ollama.com/library/mistral-small) has largely
"smooshed" (technical term) that knowledge out.

Coupled with the [deepseek
developments](/2025/01/28/deepseek-r1-geography-bias/) this week, this is
driving home the point that open models have made up significant ground in the
last few months, that the moat around frontier models is now almost non-existent.
Companies playing in the model space need to really start thinking about how
they create great user / developer experience, enable security and make this
compelling for businesses to adopt.
