---
author: ajfisher
date: 2026-06-13 12:00:00+10:00
layout: post
slug: fail-fast-fix-faster
title: "Fail fast, fix faster: Why faster models can beat smarter ones"
tags: ai, development, agents, presentation, conference
excerpt: >
    Transcript and slides from my AI Engineer Melbourne 2026 talk about how,
    once a model is competent enough, the speed of the iteration loop matters
    more than the headline intelligence of the model.
twitter_excerpt: >
    Transcript and slides from my AI Engineer Melbourne 2026 talk on why faster
    feedback loops can beat smarter models once the model is competent enough.
featureimage: ../../img/posts/presentations/aieng26/brain-bunny-tradeoff-background-v2.png
imageby: ajfisher - ChatGPT Images 2.0
listimage: ../../img/posts/presentations/aieng26/brain-stopwatch-scales-background.png
smalltitle: true
---

I gave this talk at [AI Engineer Melbourne
2026](https://webdirections.org/ai-engineer/speakers/aj-fisher.php). The slides
from the talk are embedded below, and the full transcript of the talk with key
slides is presented after that.

<p class="mediacontainer"><iframe title="Fail fast, fix faster slides"
  src="https://aieng26.ajf.io/?embed"></iframe></p>

<p class="caption"><a href="https://aieng26.ajf.io/">Fail fast, fix faster:
Why faster models can beat smarter ones</a> - (CC) ajfisher</p>

A large version is available at [aieng26.ajf.io](https://aieng26.ajf.io/), and
the supporting resources are collected at
[ajfisher.me/aieng26/](/aieng26/).

The full talk transcript follows:

## Fail fast, fix faster

Good afternoon.

I'm very pleased to be here this afternoon to talk to all of you about how, once
a model is competent enough, the speed of your iteration loop matters more than
the headline intelligence of the model.

### Does smart mean slow?

![Does smart mean
slow?](../../img/posts/presentations/aieng26/brain-bunny-tradeoff-background-v2.png)
*Does smart mean slow? (cc) ajfisher - ChatGPT Images 2.0*

For [a while now I've had this
idea](../posts/2026-02-26-mercury-2-diffusion-agents.md) that instead of
focussing on how well a model performs a task, what happens when a model gets
good enough you expect it to succeed, and instead, benefit lies in how quickly
can it achieve a result.

Earlier this year [we got new
models](https://www.inceptionlabs.ai/blog/introducing-mercury-2) that made this
idea worth testing and today I'll talk you through the results of that and
discuss the implications.

### Tradeoff changes

![Tradeoff
changes](../../img/posts/presentations/aieng26/brain-stopwatch-scales-background.png)
*Good enough, but fast. (cc) ajfisher - ChatGPT Images 2.0*

When Mercury 2 from Inception Labs launched it immediately
caught my attention. It stood out because it was fast and seemed competent.
It was not frontier level competent, but it was comparable to early-2025 models,
and it could produce useful code in seconds.

After trying it, I was stunned, it was really fast.

This new model seemed to be a step change in terms of the way we think about the
capability vs speed tradeoff.

### The fast-loop hypothesis

![The fast-loop
hypothesis](../../img/posts/presentations/aieng26/arcade-tortoise-hare-speedrun-background-v2.png)
*Fast-loop theory. (cc) ajfisher - ChatGPT Images 2.0*

Off the back of this I did some quick calculations: if you could produce a loop
that was really fast, could you brute force your way to success? Put another way,
could you speed run a Ralph Wiggum Loop?

The idea was, if you have a lower capability model but a reasonable rate of
improvement and you can iterate quickly, in theory you can outperform a slow,
high performance frontier model before it's finished generation.

A Ralph Loop is perfectly designed for goal based systems - assuming it has good
feedback mechanisms

Looking at the Mercury 2 performance data  I worked out that it should make this
theory testable.

A couple of weeks later, [Andrej Karpathy releases
AutoResearch](https://github.com/karpathy/autoresearch) with a similar
pattern but from a different direction. Cheap experiments, measureable feedback
and repeated iterative improvement.

So with all of these ideas in hand I built a small benchmark to test the theory.

I'll talk you through that now.

### A benchmark for measurable work

**Spec and rules**

- OpenAPI contract
- Over $1000 quote = approve
- Line / Order Discount > 10% = approve
- Approval once only
- API best practices

**Validation**

- 47 parallel tests ~300ms exec
- Specific failure feedback
- Logic tests (rules, edge cases)
- API shape tests (headers, enums)
- Robustness tests (responses)

The task isn't exhaustive in terms of model capability but it's a job
that should be familiar to all of you as you've all probably built something
like this at some point.

The task is a Quote Approval API. It has an OpenAPI contract, business
rules around discounts and approval thresholds, and 47 parallel tests that run
in a few hundred milliseconds.

### The agent harness

- Invoke models via API
- OpenAI, Gemini, Mercury, Ollama, alt local model providers
- Run implementation - validate - inform next turn

I then set about building a little agent harness modelled on a Ralph Wiggum
style loop.

The agent harness does model API calls, gets the resulting implemenation and then
runs it through the validation harness to test it. As much as possible, the
models are coerced to use instant modes so they run at the highest speeds
possible.

Once complete, the agents get the feedback of the turn, it's current
implementation and they are rebriefed on the goal and then they take another
turn.

### The run

- Run allowed up to 15 turns
- Each turn attains PASS / PARTIAL / FAIL / THRASH
- Record detailed trace performance data per run
- 10 fresh runs and aggregate model results

All together this creates the benchmark.

I limit the harness to run for a maximum of up
to 15 turns. If it passes before that, then it stops and, likewise, there's
some checks to stop it if it gets stagnant and thrashes for several turns.

It does 10 fresh runs for each model so it can get a spread of results and then
calculates its benchmark score from there.

_Note: At this point in the talk I ran some live trace results side by side.
This data is available in the [GitHub
Repo](https://github.com/ajfisher/demo-dumb-fast-agents). Mercury 2 finished in
7s and GPT-5.5 took about 90s, with Gemini 2.5 taking about 70s and GPT-5.4 mini
talking approx 45s._

### Latency changes model economics

So why is diffusion so fast here?

It doesn't inherently make the model smarter but it does change the cost
it takes to produce the next candidate solution.

If you look at these two animations side by side you can see how different model
architectures solve the same problem with two different approaches.

<div class="latency-animation-pair">
  <iframe
    src="/animation/aieng26/terminal-stream.html"
    title="Autoregressive stream"
    loading="lazy"
  ></iframe>
  <iframe
    src="/animation/aieng26/diffusion-stream.html"
    title="Diffusion stream"
    loading="lazy"
  ></iframe>
</div>

An autoregressive model iterates sequentially through tokens until it gets
to a stop point.

A diffusion model starts from random noise and iteratively refines the output
over a small number of steps.

For this talk, don't worry too much about the internal mechanics of text
diffusion - that could be a long talk on it's own. The key is that
candidate generations can be produced with extremely low latency.

Then, external validation can make these fast generations steerable using
our Ralph loop set up.

What this means is that a marginally competent model coupled to a very high speed
loop improves quality very quickly.

And I'll show you why this happens.

### Convergence compounds

**score = 1 - (1 - r)^n**

- **r** improvement against remaining error
- **n** completed iterations

Fast iteration is important because progress compounds.

You can see how this unfolds in this equation, if each iteration removes some
fraction of the remaining error - then the number of iterations you take starts
to matter a lot.

A frontier model might make one big move and solve the task in a single step.
But it takes time for this to happen.

A less capable model may need to make smaller steps, but if it gets way more attempts
in the same window of time then those smaller moves compound on each other.

### Small gains add up

![Completion score chart showing SOTA passing in three turns after three
minutes, Fast 30% passing in nine turns after 54 seconds, and Fast 15% passing
in 19
turns after 114 seconds.](../../img/posts/presentations/aieng26/feedback-compounding-chart.svg)
*Small gains accumulate. (cc) ajfisher*

So if we have a slightly less competent but extremely fast model, all
it needs is a 20 or 30% incremental improvement against the remaining error
every single step and it can get to the end point before the big model
completes it's one big step.

You can see this on this chart.

This process is like a compounding performance ratchet.

If you can move through each incremental step rapidly then you iterate
your way to success very quickly.

But we need cheap experiments and measurable evaluation to push the ratchet.

And to do this we need good tests and feedback to drive it.

### The headline result

**GPT-5.4:** one-shots more often, ~88s mean

**Mercury 2:** requires feedback to pass, ~6s mean

So let's get back to our results, a taste of which you saw in the trace runs.

This is the headline match up.

GPT-5.4 solved this task the way we now expect. Pretty much one shot each go.
But it took time do it.

Mercury 2 couldn't one shot. It had to use the feedback loop. But the loop was so
fast that the wall-clock time was tiny.

### Loop speed changes system behavior

<div class="benchmark-results-table" aria-hidden="true"></div>

| Model | Class | Runs Passed | One-shot | Median Iterations | Mean Time To Pass | P90 | Best Failed Score |
|---|---|---:|---:|---:|---:|---:|---:|
| Mercury 2 | H/D | 10/10 | 0 | 2 | 6s | 7s | n/a |
| GPT-5.4 mini | H/AR | 10/10 | 7 | 1 | 41s | 65s | n/a |
| GPT-5.4 | H/AR | 10/10 | 6 | 1 | 88s | 101s | n/a |
| GPT-4.1 mini | H/AR | 10/10 | 0 | 2 | 54s | 66s | n/a |
| Gemini 2.5 Flash | H/AR | 8/10 | 0 | 4 | 77s | 589s | 0.947 |
| Gemma 4 31B cloud | H/AR | 10/10 | 0 | 5 | 133s | 209s | n/a |
| Qwen3 Coder 480B cloud | H/AR | 7/10 | 0 | 5 | 611s | 1154s | 0.957 |
| Orthrus Qwen3 8B MLX | L/D | 0/5 | 0 | n/a | n/a | 159s | 0.938 |
| Phi3 | L/AR | 0/5 | 0 | n/a | n/a | 355s | 0.125 |

Class (H=Hosted, L=Local, AR=Autoregressive, D=Diffusion)

Going beyond the headline, this table shows a summary of the traces I
recorded across a selection of  models. Some of these were hosted and some
local, some diffusion and most autoregressive.

Speed aside, what you can also observe is that there is a competence threshold
the model has to exceed to even be able to do the task. The model has to be
competent enough that it can eventually finish the task with feedback.

You can see that a couple of the models don't ever achieve the solution in ten
runs with 15 turns. Ultimately they are not competent enough to solve this
scenario.

The two highlights for me are:

* Mercury completed 10 successful runs in roughly the time GPT-5.4 took to do one.
* But GPT-5.4 Mini got the same result in half the time as it's bigger sibling
because it's a tuned model and is more efficient at inference.

As I said a moment ago, loop speed changes the performance economics
and these results change where the engineering work sits. Model intelligence
does still matter, but the speed and quality of the loop starts to matter just
as much.

So what's the implication of this from an engineering standpoint?

### Validation becomes the product

![Validation becomes the
product](../../img/posts/presentations/aieng26/validation-machine-product.png)
*Validation is the product. (cc) ajfisher - ChatGPT Images 2.0*

It means that validation becomes the product.

The combination of specs plus your validation processes really becomes the
core of what your product is, not necessarily the code you've produced.

If generation is fast, accurate and cheap then building the right thing is driven
wholly by how you define what to build and then how to prove it's correctness.

This means deep domain understanding and dense validation of that domain
becomes your moat. Not how quickly can you build features.

### How to build good validation

- Dense feedback
- Cheap error detection
- Fast feedback process

How do I build good validation?

* We need dense feedback so the system doesn't thrash
* it has to be cheap so the system can detect an error easily
* And it's got to be fast so that the feedback process can happen quickly

The quality of our validation really matters for autonomous systems.

This became very evident as I set up the benchmark. Bad errors cause stalls.
Feedback gaps inhibit progression. Weak validations cause the models to thrash.
You need to have a level of quality or the system can't work autonomously.

As a pattern, this is more or less really test-driven development.

Test-driven development in this scenario is less about just building a
confidence tool for developers. It's now also a control system
so agents can go away and build something, or rebuild it, or build five versions
of it at the same time or optimise it.

It changes what we can use this for.

### Sometimes you need more than speed

Fast iteration when:

- Dense feedback
- Measurable correctness
- Fast, cheap feedback

Frontier judgement when:

- Sparse feedback
- Subjective evaluation
- Ambiguous validation

Now, based on the results I showed you might be thinking you need to chuck
out your claude or chatgpt subscriptions and go all in on diffusion models.

So I would be remiss if I didn't call these things out.

Diffusion is not inherently better than an autoregressive model. In terms of
absolute frontier, it's not. We're talking about a model that's about
equivalent to Gemini 2.5, but an extremely high speed Gemini 2.5.

The frontier still matters for a lot of tasks, and raw intelligence is important.
You have to have to attain a certain level of competence before any model can
be used for meaningful work and especially if you want to do it autonomously.

Autonomous systems work best when you've got dense feedback, measurable
correctness, and cheap, fast validation.

It breaks down when you have sparse feedback, subjective evaluation, or slow or
ambiguous validation criteria. In that scenario you still want to have one
really good attempt, try to validate against that, and provide feedback to
refine it.

### The question shifts to feedback speed

- Explore alternative architectures
- Optimise system and validation speed
- Consider stronger harnesses

To wrap this up then.

The last few years we have been making models smarter and building harnesses
to run them somewhat autonomously. Now, in order to use them more effectively
we need to make our models and loops faster and more resilient.

The things I would encourage you to do off the back of this.

Try alternative architectures to see how they might fit different problems.
Benchmark your total loop speed, not just output quality and look for
optimisation opportunities. Invest in validation harnesses, because this is
what allows autonomous models to progress.

### Get in touch

[Additional resources including slides](/aieng26/)


As I finish up I'll leave you with this:
Once a model clears the competence threshold, the question changes. Not just,
"how smart is the model?" but, "How fast is the feedback loop?"
