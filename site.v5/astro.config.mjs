import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import icon from "astro-icon";
import sitemap from '@astrojs/sitemap';
import rehypeRaw from 'rehype-raw';
import remarkPullQuotes from './src/lib/remark-pullquotes.mjs';
import remarkSlideshow from './src/lib/remark-slideshow.mjs';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import { generateIcons } from './scripts/generate-icons.mjs';
import { loadSearchPolicy } from './scripts/load-search-policy.mjs';
import { createSitemapSerializer } from './src/lib/search-policy.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDirectory = path.resolve(__dirname, '../content');
const searchPolicy = await loadSearchPolicy({ contentDirectory });

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
  compressHTML: true,
  markdown: {
    processor: unified({
      remarkPlugins: [remarkPullQuotes, remarkSlideshow, remarkReadingTime],
      rehypePlugins: [rehypeRaw],
    }),
  },
  integrations: [
    icon(),
    // Let search engines decide crawl frequency and relative priority. Applying
    // the same values to every page makes old posts look as volatile as the
    // homepage and does not provide a useful signal.
    sitemap({
      serialize: createSitemapSerializer(searchPolicy),
    }),
    iconGenerator(),
  ],
  image: {
    lazyLoad: true,
    layout: 'constrained',
  }
});
