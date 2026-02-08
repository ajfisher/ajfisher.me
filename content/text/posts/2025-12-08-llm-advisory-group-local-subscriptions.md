---
title: "A locally running LLM advisory board"
slug: llm-advisory-group-local-subscriptions
author: ajfisher
date: 2025-12-08 15:57:04+11:00
layout: post
excerpt: >
    A local LLM board of advisors that reuses existing Claude, Gemini, and ChatGPT
    subscriptions, with models debating and converging on answers together.
twitter_excerpt: >
    Built a local LLM council that reuses existing subscriptions and
    converges on answers through multi-model review. #ai #agents
tags: ai, agents, development
listimage: ../../img/posts/llm-judge.png
featureimage: ../../img/posts/llm-advisors.png
imageby: ajfisher - Gemini
---

Inspired by Andrej Karpathy's [LLM
Council](https://github.com/karpathy/llm-council), I decided to make something
similar, but leverage my already existing LLM subscriptions to Claude, Gemini
and ChatGPT as well as use my local models via Ollama.

Ultimately, I wanted to make something work without having to make API keys and
manage it all via OpenRouter. For a Saturday afternoon vibe-project this is way
too much hassle. Also I am literally spending many hundreds of dollars a month
on AI subscriptions, and there's only so much cash I'm prepared to give these
companies.

The tool is an [LLM advisory group](https://github.com/ajfisher/llm-advisors/) running
on your machine using your existing subscriptions or local models.

Ask a question, such as "What is the best way to poach an egg at home?" and get
an answer from multiple perspectives and provide advice.

This approach uses a similar model as LLM Council. You get each model to provide
an answer, then each LLM reviews all the others (anonymomised) and consolidates
some feedback, and finally a judge composes all of the feedback into an answer. This
[LLM-as-judge pattern](https://en.wikipedia.org/wiki/LLM-as-a-Judge) is a really
good way to leverage poorer quality models (eg local or older, cheaper ones)
and evaluate their output. <b>This is especially useful when the judge is
consolidating perspectives</b>.

In addition to using local models or my subcriptions, I also wanted the process
to have the option of multiple turns. Specifically, I wanted each "turn"
to drive the models to revisit their previous responsed with new information
or approaching it from a new perspective.

Depending on how many turns the user chooses to run for, each turn will have
a general motivation - not dissimilar to stages of a well run workshop.

* Turn 1: Baseline - each advisor answers freely then the chairman synthesises
and produces a summary of all positions.
* Turn 2: Divergence - advisors are given roles (more below) and push new ideas
beyond the baseline. From this the chairman produces a task sheet of ideas to
pursue.
* Turn 3: Task solving - advisors work through the task sheet to close out ideas
that may have been left open and needing closure. The chairman builds a convergence
preparation summary.
* Turn 4: Convergence - advisors propose their final positions. The chairman
then composes the final answer.

You can see a sped up version of this occurring below:

<video autoplay muted playsinline controls>
    <source src="/video/llm-advisors.mp4" type="video/mp4"/>
    <source src="/video/llm-advisors.webm" type="video/webm"/>
</video>

<p class="caption">A question is asked then the models each provide views and
answers as advisors before synthesis</p>

As noted above, in a multi-turn session, each of the advisors are given roles
from Turn 2 onwards. This is to avoid stagnation and essentially each advisor
just regurgitating the Chairman's summary back into the pot.

By taking on the role (which changes each turn) it acts as a forcing function
on the LLM to roleplay an alterantive position, using the inforamtion so far.

I found having this mix, especially when you have 3 or more advisors dramatically
improves the novelty of response from turn to turn and exploration of the
problem space.

Roles include Explorer, Skeptic, Synthesiser, Pragmatist, Theorist and Contrarian.

At the moment, the LLM is instructed to use their role to inform their updated
position this turn. A further enhancement would be to include specific prompts
to guide their behaviour into these personas even harder. That said, in most
cases, simply saying "Your role this turn is to act as a Contrarian" is enough
to get them to go in a different direction.

For something that was knocked up in an afternoon, whilst also watching the
cricket, <b>I'm surprised at how well it works</b>. One caveat is that with a 4-turn
session, it can take a while to execute (easily 8-15 mins). You can run the web
LLMs concurrently but there's a limit to running Ollama in parallel before your
computer just melts down. So far I've had good success with 2 running concurrently
on my MacBook.

After running a lot of test cases, I've generally found that even older (eg Phi3)
or small (eg Mistral Small) models will gradually improve over a multi-turn
scenario when there is solid feedback. AS a research exercise this is interesting
in that as these models get cheaper to run, the cost to double, triple, quadruple
check things gets less - so you may as well do it.

The [code is all in GitHub](https://github.com/ajfisher/llm-advisors) and you
can play with it on your laptop today with a quick install script.
