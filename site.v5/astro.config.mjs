import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import sitemap from '@astrojs/sitemap';
import rehypeRaw from 'rehype-raw';
import remarkPullQuotes from './src/lib/remark-pullquotes.mjs';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import { generateIcons } from './scripts/generate-icons.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const iconGenerator = () => ({
  name: 'icon-generator',
  hooks: {
    'astro:build:setup': async () => {
      await generateIcons();
    },
    'astro:server:setup': async () => {
      await generateIcons();
    },
  },
});

export default defineConfig({
  site: 'https://ajfisher.me',
  srcDir: './src',

  // Static assets (favicons, etc) usually live in public/
  // But we need to map to the global img folder instead.
  publicDir: path.resolve(__dirname, '../content'),
  build: {
    format: 'directory', // Ensures /path/to/page/ index.html structure
  },
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkPullQuotes, remarkReadingTime],
    rehypePlugins: [rehypeRaw],
  },
  integrations: [
    icon(),
    sitemap({ changefreq: 'daily', priority: 0.7 }),
    iconGenerator(),
  ],
});
