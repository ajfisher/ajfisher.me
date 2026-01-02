import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'astro/config';
import rehypeRaw from 'rehype-raw';
import remarkPullQuotes from './src/lib/remark-pullquotes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // site: 'https://ajfisher.me', // Uncomment when ready for production
  srcDir: './src',

  // Static assets (favicons, etc) usually live in public/
  // But we need to map to the global img folder instead.
  publicDir: path.resolve(__dirname, '../content'),
  build: {
    format: 'directory', // Ensures /path/to/page/ index.html structure
  },
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkPullQuotes],
    rehypePlugins: [rehypeRaw],
  },
});
