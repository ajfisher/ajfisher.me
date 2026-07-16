# Search Console and search indexing

This document records the July 2026 Search Console audit and the repository
rules that follow from it. Search Console data is delayed and its example URL
lists are samples, so counts and examples will change between crawls.

## Sitemap

Astro's sitemap integration generates both `sitemap-index.xml` and the child
`sitemap-0.xml`. The index is the stable public entry point and is advertised
in page metadata and `robots.txt`.

Do not set one global `changefreq` or `priority`. Those values would apply to
every route, making an old article look as volatile and important as the home
page. Omitting them lets search engines infer crawl frequency from real change
history and other signals.

`https://ajfisher.me/sitemap-index.xml` was submitted to Search Console on
16 July 2026. Google accepted the submission, but the report initially showed
"Couldn't fetch" while it awaited processing.

After deploying the repository change:

1. Confirm that the sitemap index succeeds and reports discovered URLs.
2. Remove the stale `sitemap-0.xml` submission that Search Console currently
   reports as "Couldn't fetch".

Submitting a sitemap helps discovery but does not guarantee indexing.

## Canonical URLs and trailing slashes

The canonical form is HTTPS on the apex domain with a trailing slash. A URL
without its trailing slash should continue to work for people, but the ideal
HTTP behaviour is:

```text
/path -> 301 or 308 -> /path/
/path/ -> 200
```

No Search Console setting is required. A permanent redirect consolidates the
signals before Search Console sees the page. The current edge handler instead
rewrites both forms to the same S3 object, so both return `200`; the canonical
tag then has to do the consolidation. This is valid but less clear and creates
duplicate crawl paths.

Query-string variants can remain `200` when they represent the same content,
provided their canonical points to the clean URL. Search Console's
"Alternative page with proper canonical tag" classification is expected for
those URLs and is not an error.

## Indexing policy

"Crawled - currently not indexed" means Google fetched the URL but chose not
to retain it in the searchable index. It is not automatically a technical
fault. Pages can move in and out of this state as Google recrawls them,
re-evaluates duplicates, or changes how much value it sees in an archive.

The July 2026 report contained 143 such URLs. Its examples mixed older posts
with tag archives, including `leadership`, `responsive-design`, and `nodebots`.

For a URL that should be indexed, the desired state is:

- one canonical URL returning `200`;
- unique and useful content;
- crawlable internal links from relevant pages;
- inclusion in the sitemap; and
- no `noindex` directive.

Do not add `noindex` merely to make the exclusion report smaller. Use it only
when the site owner has decided a page should not appear in search.

### Recommended configurable model

Indexing should be explicit rather than based on a blanket post-count rule:

- use post count to flag thin tag archives for review;
- default normal posts and curated tag pages to indexable;
- support an explicit `index: false` choice for individual content or tags;
- drive both the robots meta tag and sitemap exclusion from the same policy;
- keep a noindexed URL crawlable until Google has observed the directive.

This should be implemented as a shared search policy rather than separate
hard-coded lists in the layout and sitemap config. No tags have been noindexed
as part of this change.

## Legacy URL review

Only redirect a missing URL when there is a clear equivalent. Obsolete files
with no replacement should remain `404` or deliberately become `410`; they
should not redirect to the home page.

| Search Console URL | Recommended outcome | Reason |
| --- | --- | --- |
| `/2023/02/13/podcast-enterprise-ai/` | Redirect to `/2023/02/12/podcast-enterprise-ai/` | Current canonical article |
| `/2007/11/19/fuzzy-logic-could-book-more-flights/2007/03/fuzzys-where-its-at-or-will-be` | Redirect to `/2007/03/05/fuzzys-where-its-at-or-will-be-eventually/` | Malformed historical internal link; the source link is now fixed |
| `/tagged/johnny-five/` | Redirect to `/tagged/nodebots/` | Closest current topic archive |
| `/2011/12/20/` | Redirect to `/2011/12/20/towards-a-sensor-commons/` | Clear incomplete historical URL |
| `/2011/12/20/towards-` | Redirect to `/2011/12/20/towards-a-sensor-commons/` | Clear truncated historical URL |
| `/2007/11/27/adding-cron-jobs-to-a-qnap-server/` | Redirect to `/2007/11/26/adding-cron-jobs-to-a-qnap-server/` | Clear date variant of an existing article |
| `/wdc/pinchzoom.html` | Retain `404` unless the demo can be restored | No current equivalent found |
| `/wdc/multitouch.html` | Retain `404` unless the demo can be restored | No current equivalent found |
| `/wdc/singletouch.html` | Retain `404` unless the demo can be restored | No current equivalent found |
| `/code/deviceapi-normaliser/examples/data.html` | Retain `404` unless the demo can be restored | No current equivalent found |

The redirect implementation should return a real permanent response instead
of silently rewriting to another S3 object. It also needs unit tests before the
Lambda@Edge function changes.

## Publication dates and existing URLs

Post routes are generated from UTC date components. Nine historical posts had
a local publication date one day later than their already-deployed route. To
avoid changing established URLs, their frontmatter dates now use a daytime
timestamp on the route's existing calendar day.

New posts should use a publication time whose UTC and intended route dates are
the same. This avoids an unexpected previous-day route while preserving the
current route-generation contract.

## Structured data

The list-item microdata previously used `itemscope="blogPost"`. In HTML,
`itemscope` is a boolean attribute; the item type belongs in `itemtype`, and
the relationship to the surrounding `Blog` belongs in `itemprop`.

The corrected shape is:

```html
<section itemscope itemtype="https://schema.org/Blog">
  <li
    itemprop="blogPost"
    itemscope
    itemtype="https://schema.org/BlogPosting"
  >
    ...
  </li>
</section>
```

The item now also exposes its author and image, and the invalid `itemtype` on
the abstract paragraph has been removed. A future enhancement can add complete
`BlogPosting` JSON-LD on article detail pages, including canonical URL,
publication/modification dates, author, headline, description, and image.

## Search performance and titles

Title changes should be based on relevant query intent, not aggregate CTR by
itself. Search Console may withhold low-volume queries, and irrelevant or
machine-generated queries can heavily distort impressions.

### OpenClaw on Raspberry Pi

Over the available 16-month report this article recorded 7,126 clicks from
543,302 impressions, with 1.3% CTR and average position 7.3. From publication
through 13 April it recorded 6,556 clicks at position 6.1; the latest three
months recorded 570 clicks at position 11.

This is consistent with first-mover demand decaying as competition grows. The
title already expresses the core intent and should not be changed merely to
chase the initial peak. The better maintenance strategy is to keep the guide
accurate, add genuinely useful updates, and link to it from relevant newer
articles. If substantive updates are made later, add a real modification date
rather than changing the publication date.

### QNAP cron article

The 16-month report recorded 40 clicks from 5,676 impressions, with 0.7% CTR
and average position 8.9. Queries are tightly aligned to `qnap cron`,
`qnap cron job`, and `qnap crontab`. Its title already matches intent and the
article remains a durable long-tail result. Preserve its URL and title; update
the content only when there is verified current QNAP behaviour to add.

### Other apparent title opportunities

The AI-native article's 2,124 impressions are dominated by an irrelevant query
that alone contributed 1,305 impressions. Its aggregate CTR is therefore not
a sound reason to rewrite the title.

Mercury 2 recorded 18 clicks from 3,614 impressions at average position 10.9.
Visible relevant queries include `mercury 2 coding`, `inception mercury 2`,
and `is mercury 2 open source`, but Search Console exposes only a small portion
of the total query impressions. A clearer SEO title could be tested later,
ideally through a separate `seo_title` field so the editorial headline need
not change, but the current data does not prove a specific replacement will
perform better.
