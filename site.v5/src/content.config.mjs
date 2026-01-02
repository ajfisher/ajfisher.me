import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const imageTransform = (val) => val ? val.replace(/^.*\/img/, '/img/') : val;

// use this to make the tags URL-friendly
const slugifyTag = (tag) => tag
  .toLowerCase()
  .trim()
  .replace(/\s+/g, '-')          // Replace spaces with -
  .replace(/[^\w-]+/g, '')       // Remove all non-word chars
  .replace(/--+/g, '-')          // Replace multiple - with single -
  .replace(/^-+/, '')            // Trim - from start
  .replace(/-+$/, '');           // Trim - from end

const baseSchema = z.object({
  title: z.string(),

  // Explicit slug as required
  slug: z.string(),

  // Handles the YYYY-MM-dd hh:mm:ss+tz format automatically
  date: z.coerce.date(),
  author: z.string().optional().default('ajfisher'),

  // Requirement: enum
  layout: z.enum(['post', 'post.hbt', 'page', 'page.hbt']).optional(),

  excerpt: z.string().optional(),
  twitter_excerpt: z.string().optional(),

  // image path
  featureimage: z.string().optional().transform(imageTransform),
  listimage: z.string().optional(),
  imageby: z.string().optional(),

  featured: z.boolean().optional().default(false),

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
  schema: baseSchema.transform((data) => {
    const d = data.date;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return {
      ...data,
      uri: `${y}/${m}/${day}/${data.slug}/`
    };
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./../content/text/pages" }),
  schema: baseSchema.transform((data) => {
    return {
      ...data,
      // Pages just get the top-level slug
      uri: `${data.slug}/`
    };
  }),
});

export const collections = { posts, pages };
