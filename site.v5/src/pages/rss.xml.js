import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import { SITE_META } from '../lib/site-meta.mjs';

const UNESCAPED_ENTITY = /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[\da-fA-F]+;)/g;

const escapeXmlText = (value) => value.replace(UNESCAPED_ENTITY, '&amp;');

const sanitizeFeedXml = (xml) =>
  xml.replace(/<(title|description)>([\s\S]*?)<\/\1>/g, (_match, tag, text) => (
    `<${tag}>${escapeXmlText(text)}</${tag}>`
  ));

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

  const response = await rss({
    title: SITE_META.defaultTitle,
    description: SITE_META.description,
    site,
    items,
  });

  const xml = await response.text();
  const sanitizedXml = sanitizeFeedXml(xml);

  return new Response(sanitizedXml, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
