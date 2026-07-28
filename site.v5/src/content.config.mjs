import { defineCollection } from 'astro:content';
import { glob, _file } from 'astro/loaders';
import { z } from 'astro/zod';

import { pageUri, postUri } from './lib/content-route.mjs';
import { slugifyTag } from './lib/utils.mjs';

const buildBaseSchema = (image) => z.object({
  title: z.string(),

  // Explicit slug as required
  slug: z.string(),

  // Handles the YYYY-MM-dd hh:mm:ss+tz format automatically
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  author: z.string().optional().default('ajfisher'),

  // Requirement: enum
  layout: z.enum(['post', 'post.hbt', 'page', 'page.hbt']).optional(),

  excerpt: z.string().optional(),
  twitter_excerpt: z.string().optional(),
  seo_title: z.string().optional(),
  index: z.boolean().optional().default(true),

  // image path
  featureimage: image().optional(),
  listimage: image().optional(),
  imageby: z.string().optional(),
  imagelink: z.string().optional(),

  // flag directives
  featured: z.boolean().optional().default(false),
  smalltitle: z.boolean().optional().default(false),
  largetitle: z.boolean().optional().default(false),

  // reading time and word count derived from remark plugin
  wordCount: z.number().optional().default(0),
  readingTime: z.number().optional().default(0),

  // Convert "tag1, tag2" into ["tag1", "tag2"]
  tags: z.string()
    .default('')
    .transform(val =>
      val.split(',')
        .map(t => t.trim())
        .filter(Boolean)
        .map(tag => ({
          name: tag,
          slug: slugifyTag(tag),
        }))
    ),
});

// 4. Define collections
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./../content/text/posts" }),
  schema: ({ image }) => buildBaseSchema(image).transform((data) => {
    return {
      ...data,
      uri: postUri(data.date, data.slug)
    };
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./../content/text/pages" }),
  schema: ({ image }) => buildBaseSchema(image).transform((data) => {
    return {
      ...data,
      // Pages just get the top-level slug
      uri: pageUri(data.slug)
    };
  }),
});

export const collections = { posts, pages };
