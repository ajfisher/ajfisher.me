---
title: Information design for the agentic age
slug: information-design-agentic-age
author: ajfisher
date: 2026-09-24 12:00:00+10:00
layout: post
excerpt: >
  Most information on the web is published primarily for humans, even though
  increasingly the thing consuming it is likely an agent. We built a version
  of our annual report explicitly for agents which forced us to think about
  information design, trust and verification systems.
twitter_excerpt: >
  When the consumer of your information is an agent how do your systems change?

  Building an AI-friendly annual report became an exercise in information
  design, provenance, verification and #agenticCX.

  #AI #agents
featureimage: ../../img/posts/information-design-mapping.png
listimage: ../../img/posts/information-design-multiformat.png
imageby: ajfisher - ChatGPT Images
tags: ai, agents, responsive design, strategy, data science
featured: false
---

A few weeks ago I made a joke in a WIP meeting along the lines of, “given every
professional uses AI now, we should make our annual report for AI tools as no
human is going to read it”. It started as a joke, but we quickly decided that
given how we blend AI and data to support our daily decision making, having our
report natively accessible to machines would help analysts and shareholders
better understand, integrate and interact with the information contained in it.

And so we decided to build a completely AI-friendly annual report and release
it alongside all of our other, human-friendly material and do it in a way that
would allow AI tools to work with the information in a structured, verifiable
way. The feedback so far has been extremely positive, and based on feedback we
are one of the first to actively do this.

The machine-friendly report is available at
[https://reports.tetratherix.com](https://reports.tetratherix.com) if you want
to throw your own LLM of choice at it and ask it questions. Fair warning for
humans: the regular version is 150+ pages long and the machine version strips
out all the nice charts and photos and replaces it with structured text.
Looking at the HTML version, you'd be forgiven for thinking you'd been
transported back to a website from about 1999…

But that makes it very easy for a machine to consume.

I wrote a [short post about
why](https://www.linkedin.com/feed/update/urn:li:activity:7496036427621691393/)
we did this strategically, and how it aligns to our general AI and digital
strategy at Tetratherix. In this post I wanted to go deeper on the technical
side and in particular how we created native verification in the system and
output artefacts so a machine can easily validate and source claims for
information.

## The nature of an annual report

If you've never read an annual report: these documents are incredibly dense,
the financials are subject to external audit and are an obligation for public
companies to the market. Many companies also take the opportunity to dress up
the finances with some thoughts on market conditions and updates on products
and innovation. However, the performance information is the main game for
analysts.

Humans skim through this pretty quickly then focus into more detail as needed,
but an LLM will find this a mixed bag. If an LLM has to pass every page to its
vision model to interpret it, this makes processing the information slower and
less reliable.

Our goal was to simplify this all to text, in structured machine-readable
formats that can be quickly absorbed.

As weird as it sounds, this became a Consumer Experience project with an LLM
being the target Consumer.

## Information architecture for machines

Many organisations think about the document output as the artefact being
created but even a website or a PDF is just a presentation of information, not
the information itself.

If you look at the report, you'll mostly see what looks like simple HTML.

Behind that, everything is structured to provide clarity on how the
information is organised and its relationships. This includes canonical
representations of all sections, metrics, tables, footnotes and figures along
with provenance information and stable IDs so it can all be cross-referenced.

The [llms.txt](https://reports.tetratherix.com/llms.txt) highlights that the
report.json file is the canonical structured machine version of the report and
that semantic HTML, markdown and JSONL are all presentations derived from it.

```markdown
## Files

- [report.json](report.json): the complete canonical model — every section, table, metric, note and reference, each with source-page provenance.
- [sections.jsonl](sections.jsonl): one JSON object per section, streamable (retrieval / RAG).
- [annual-report.md](annual-report.md): human-readable reading-order render.
- [annual-report.html](annual-report.html): accessible HTML edition (real tables, anchors).
- [source-index.md](source-index.md): every section / table id → source PDF page(s).
```

This allows the model to switch back and forth between presentations of the
report depending on what the user requests with different formats supporting
different types of analysis.

Going forward, we'll be thinking about ways to manage for this and it reminds
me of work I did for the NHS over 20 years ago where we built systems to deliver
information so it could be *printed* and delivered digitally when both formats
were in equal use by clinical staff.

## Verification by design

A significant amount of my time over the last year has been spent researching
how we design automated systems for trust [^1].

In doing this work, and especially given the context of how it would be used,
it was imperative that verification was built in from the start and flowed
through every part of the pipeline.

Having methods of verifying that every claim, statement and number survives
correctly through the transformation pipeline is critical. There is no hope or
assumption in the system due to the volatility of the source [^2]. So you must
be confident the system verifies in real time - as you can't trust a human to
manually check every iteration of a 150+ page technical document or trust an
LLM to do it either.

How you do this largely depends on the source data.

We took a decision early to <b>produce governed versions of every table</b> and
produce tables of the underlying data for every figure. These each became Excel
documents that were version managed and were controlled sources. We then
created reference links so we knew that when we had a table or figure in the
report document, instead of trying to convert or interpret the “pretty”
version, the system should replace the object with the validated version
instead.

At the end of the pipeline we could then check this information back against
the original source docs to prove correctness.

We also built verification checks to cross-validate all derivative values to
prove that they were correct in the final output [^3]. This sounds like a
simple check, but it caught a surprising number of transformation errors as
well as upstream issues.

### Adversarial verification by design

What I've found through other work is that most verification systems can be
pretty simple. The key principle is that they need to be able to objectively
evaluate the output and they need to be adjacent to your main pipeline or loop
and feed back into it.

In a financial report, a cell being empty in a table has a different meaning
than it containing a zero. Likewise, testing that a cell contains $4.2M doesn't
tell you if the sign flipped and you're talking about profit or loss.
Syntactically these are close, semantically they are *very* different.

Context is key and not every verification system needs this to the extent that
I built, but some adversarial verification alongside your other techniques
will prove useful.

This manifests in other ways too such as extracting a final table from its
representation then verifying that the data in an HTML or markdown cell is
correct with respect to the source data table. That way we know it's
transformed correctly [^4].

Naïve tests will fail so adversarial thinking goes a long way with this type of
content verification. Assume it can be broken. What are the ways this could
break and now, how do we validate against that?

### Consistency and correctness are different things

The section above deals with the correctness side of this verification but
it's not the whole verification story.

When you're dealing with multiple forms of the same information, verifying
that each form is *consistent with the source data* is a different and specific
class of verification processes you need to handle.

At its simplest, it's ensuring that each piece of information appears in every
target representation. But it's also verifying that all representations of
that information agree with each other. In the pipeline these types of checks
are explicitly called out and are marked to note that they are checking
representational consistency, not correctness (which happens separately).

Another form of this is to ensure that information isn't mistakenly injected
into the representation because of a transformation quirk [^5].

There's no magical solution to build a test to answer, “is this correct?”.
Rather, you compose a set of guarantees for a number of scenarios until you
get to a point where the residual uncertainty becomes acceptable for the
scenario you're building for [^6].

### Conversion via LLM?

Transforming information from one form to another is a reasonable task for
many top-tier LLMs now. So why didn’t we just give it to Claude or ChatGPT and
say, “convert this PDF into a text document”.

This certainly would have been cheap to build, and we could have made it more
dependable by using the API and feeding in a page at a time to keep the context
small and then collate the results.

However, in a regulated financial document, this introduces a probabilistic
interpretation layer which would need to be assessed by a human to verify it.
It also introduces pipeline noise as there’s no ability to explain getting
from a PDF page to a markdown file and no deterministic guarantee of
repeatability ([even when setting a low
temperature](https://medium.com/@AIbatros/setting-temperature-to-zero-does-not-make-your-llm-deterministic-and-the-reason-is-not-a81987db975a)).

Wherever a deterministic process was an option we chose it as it helps manage
error risk and consequence.

## Provenance as a primitive

A long time ago, one of my team threatened to throw something at me every time
I mentioned provenance and how important it was for data-oriented automated
decision systems. To be fair, most teams don’t really care strongly about the
source of data and how it may have been treated [^7].

That is until more recently, when the number and scale of automated decision
systems and agents has increased dramatically.

As part of our system, <b>we decided that provenance should be a first-class data
type</b> that becomes a fundamental primitive to help drive the system and
guarantee claims.

Officially, the human-readable, market-submitted PDF is the definitive
reference document. As we knew the machine version was going to break that
document up and present it in different ways, it was important to ensure that
every piece of information and claim was sourced back to the original [^8],
along with any structural modifications made (eg a chart replaced with a data
table). This information had to be present in the canonical source but also
flow through to the representations in a way that was native to that
representation.

Working through the CX of building something useful for a machine consumer,
this manifests as a source index which enables a mapping between
representations and the source document.

```html
<table id="tbl-consolidated-statement-of-cash-flows">
<caption>Consolidated Statement of Cash Flows <span class="src">Source: p. 93</span></caption>
<thead><tr>...</tr></thead>
<tbody>
...
<tr>
	<th scope="row">Receipts from Customers (inclusive of GST)</th>
	<td></td>
	<td>4,200,700</td>
	<td>-</td>
</tr>
<tr>
	<th scope="row">Payments to Suppliers (inclusive of GST)</th>
	<td></td>
	<td>(10,423,126)</td>
	<td>(3,589,318)</td>
</tr>
...
</tbody></table>
```

Similarly, because the system takes the source then builds the canonical
reference, classic build tools can be used such as byte checksums to help show
if source data changed and the pipeline is now using stale data. All of this is
included, thus providing downstream trust markers for the consumer.

```json
{
  "file_count": 28,
  "files": [
    {
      "bytes": 417002,
      "path": "annual-report.html",
      "sha256": "1335aa0e857353000483bb7be086e21415f0d020a3934e77ac635f4b96b2efb2"
    },
    ...
  ],
  "generator": "ttx-agent-report",
  "generator_version": "0.3.0",
  "mode": "final",
  "source": {
    "document_id": "ttx-ar-final-28ad070d047e",
    "page_count": 153,
    "sha256": "28ad070d047ed77ba70bc12e64db3219123bdcaff652dc278d037ee140657676",
    "status": "final"
  },
  "total_bytes": 3292079
}
```

Provenance is particularly beneficial for agentic workflows to help deliver
trust downstream.

Say you task an agent to compare CAPEX spend across multiple financial years,
classify the types of spend and show how that's changing.

An agent can do this task and give you an answer that is objectively useful
without provenance.

With native provenance information, the agent can give the answer alongside
the provenance information which allows another system to independently
establish why that answer can be trusted [^9]. This makes the answer
considerably more valuable in higher-consequence downstream decisions (such as
altering your share portfolio or your estimate of what a reasonable share
price might be for the company).

Building something that is beneficial for an agent usually means it provides
benefit to its human counterpart too.

## Doesn't RAG address some of this?

[Retrieval-Augmented
Generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)
(RAG) is tackling many of the same problems but from a different perspective.

Typically an AI consumer has to deal with a hostile (or difficult) document
such as a PDF that is provided by the publisher. The system takes the document,
parses it, chunks it, creates embeddings so it can be searched semantically,
and then the consumable chunks are easier for an AI to consume.

The accuracy of this is contingent on how good your personal or organisational
RAG system is and it has to account for a wide range of document types.

Our approach inverts who does the work and we know our content better than
anyone. We also have all the source data so a random RAG system doesn't need to
try to derive it with mixed likelihood of success.

Economically this makes sense too. <b>Why ask 10,000 agents to take a PDF and try
and infer structure and parse the data when we can do it one time</b> with the best
knowledge of the information structure? Those 10,000 agents can just consume
it and everyone saves resources.

The design of the system is already retrieval-oriented as you can see in
[sections.jsonl](https://reports.tetratherix.com/sections.jsonl). Each section
has a stable semantic identity, tables remain tables, as do figures, and
relationships are structured and explicit.

```json
{
  "id": "chunk-sec-people-and-culture",
  "section_path": [
    "TTX by the data",
    "People and Culture"
  ],
  "heading": "People and Culture",
  "text": "25 FT Employees # (Full-Time Equivalent)\n\n94% AI Daily usage in initial onboarded cohort\n\n0 Employee regrettable loss over 5 years",
  "table_ids": [
    "tbl-curated-p26-people-culture"
  ],
  "page_start": 26,
  "content_type": "management_commentary",
  "provenance": {
    "source_document": "ttx-ar-final-28ad070d047e",
    "source_sha256": "28ad070d047e…",
    "printed_page_start": "26",
    "extraction_method": "semantic_reconstruction"
  }
}
```

If an organisation wanted to ingest our information, it already has explicit
structure and semantic boundaries so a RAG system can chunk it deliberately
rather than try and infer structure from a flattened output document [^10]. All
you need is to run it through your preferred embeddings model then store it.

Having built multiple RAG knowledge systems I've spent a lot of time cursing
source documents, formats and spending way too much time on chunking strategy
or reverse engineering some publisher’s structural decisions.

If all publishers built machine-ready representations of their information,
the role of RAG can move away from processing and actually towards retrieval
[^11].

## Machine-native is responsive design

For a [very](/2015/09/09/datatium-material-for-contextually-responsive-design/)
[long](/2015/01/20/context-in-ambient-technology/)
[time](/2012/10/19/datatium-a-material-to-create-responsive-experiences/)
I've argued that the context of the consumer of your information or service
is what matters.

With an internet and web dominated by human actors this means responding to
whether they were using a phone or a laptop, on a high-speed connection or
intermittent mobile network, or what time of the day it is.

As the internet and web become agent-dominated, this is another version of
contextually responsive design. But, this time it's about responding to an
actor that prefers text, structured data and extensive metadata.

![One source, multiple
presentations](../../img/posts/information-design-multiformat.png)
*One source, correctly validated, can power multiple presentations for
different uses. Image: ajfisher / ChatGPT Images*

Some (like Katja Forbes) are already working in this space [and thinking about
how to design systems that support agentic
commerce](https://www.katjaforbes.com/book.html) but we would be remiss if we
assume these techniques only belong in retail transactions.

Presently, our systems of production prioritise a human-first approach,
assuming they are the priority consumer [^12].

The future is considerably more messy and in many cases we may be transitioning
back and forth between a human and their agents working collectively. So the
actor is not one or the other but rather both.

For twenty years, we’ve been focussed on devices for responsive design. Some
orgs also focussed on context. Now <b>we need to make our information responsive
to actors too</b>.

Our authoring and publishing systems will need to change too. Humans want
narrative, design and progressive disclosure whilst agents want explicit
structure, stable identities, provenance, data completeness and cheap
verification.

Neither representation needs to be privileged and they can both be governed
and compiled from the same source information. But we’ll need to develop
systems and processes that can account for these needs.

For us, anything greenfield we’re already building thinking about agent
consumption and we’ll look at ways to apply the approaches from our recent work
to existing systems as well. The role of agents in our work is moving at pace
and we won’t get the luxury of waiting while mobile devices slowly diffuse
across populations; this change is here already and only deepening.

Whether you're interested in Tetratherix or biotech I'd encourage you to point
an agent at
[https://reports.tetratherix.com/llms.txt](https://reports.tetratherix.com/llms.txt)
and see how your tools can interact with this type of information. If you do
something interesting with it I'd love to see it.

[^1]: To be fair this goes back a lot further such as to work I did at JBA /
    Kalido on machine learning systems for consumer segmentation and addressing
    bias in automated decision-making.

[^2]: In the period leading up to market release, the source documents are
    being edited by a large number of people including feedback from external
    auditors so the volume of changes is very high right to the last minutes
    before release.

[^3]: This extended to even something as simple as a sum of a column of numbers
    or any other multi-step calculation. Applied at the start and end meant that
    having this derivation check in place provided additional independent
    verification that the pipeline worked and that the source data tallied up
    correctly too.

[^4]: Conceptually this is like a unit test that isolates a single function to
    verify its behaviour but is applied to content translation between source
    and presentation instead.

[^5]: This is relatively common when you're going from more complex document
    forms such as JSON or HTML to things like markdown.

[^6]: What your tolerance for uncertainty is will depend on the scenario. In
    our case of the annual report we had a low tolerance when it came to claims
    and financial numbers but if a heading was at the wrong level structurally
    then this would be okay. The key is to pick which hill you’re prepared to
    die on with regards to verifying correctness.

[^7]: Outside of a few people within organisations talking about data quality
    guarantees and data architecture. Many orgs dismiss this under claims of
    being too perfectionist or purist or potentially don’t even realise this
    may be an issue.

[^8]: Literally which page and section did this particular claim or figure
    come from.

[^9]: This could be an LLM or judge model, a deterministic evaluator or even a
    probabilistic evaluator such as Jev.

[^10]: Because this makes ingestion simpler you can have cleaner, more
    meaningful chunks. As such, you don't need to guess with your chunking
    strategy or rely on shotgun-overlap to compensate for uncertainty. That
    work is already done. (You’re welcome)

[^11]: On the face of it, RAG as the name of the technique belies the sheer
    amount of effort most orgs spend getting information into some sort of form
    that the RAG element can actually do its job.

[^12]: Many organisations not only prioritise humans but, beyond some search
    engine optimisation (itself rapidly disappearing), they don’t consider
    non-human consumers at all.
