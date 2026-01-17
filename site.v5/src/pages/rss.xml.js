import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import { SITE_META } from '../lib/site-meta.mjs';

export async function GET(context) {
  const site = context.site ?? SITE_META.siteUrl;
  const posts = await getCollection('posts');
  const items = posts
    .slice()
    .sort((a, b) => b.data.date - a.data.date)
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt ?? '',
      link: new URL(`/${post.data.uri}`, site).toString(),
    }));

  return rss({
    title: SITE_META.defaultTitle,
    description: SITE_META.description,
    site,
    items,
  });
}
