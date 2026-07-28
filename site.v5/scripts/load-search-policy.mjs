import fs from 'node:fs/promises';
import path from 'node:path';

import { parse } from 'yaml';

import tagMetadata from '../../content/lib/tag_data.json' with { type: 'json' };
import { pageUri, postUri } from '../src/lib/content-route.mjs';
import { slugifyTag } from '../src/lib/utils.mjs';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

const markdownFiles = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await markdownFiles(entryPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(entryPath);
    }
  }

  return files;
};

const readFrontmatter = async (filePath) => {
  const source = await fs.readFile(filePath, 'utf8');
  const match = source.match(FRONTMATTER);

  if (!match) {
    throw new Error(`Missing frontmatter in ${filePath}`);
  }

  return parse(match[1]);
};

const policyForCollection = async (directory, collection) => {
  const policies = new Map();

  for (const filePath of await markdownFiles(directory)) {
    const data = await readFrontmatter(filePath);
    const uri = collection === 'posts'
      ? postUri(data.date, data.slug)
      : pageUri(data.slug);

    policies.set(`/${uri}`, {
      index: data.index,
      lastmod: data.updated ?? data.date,
    });
  }

  return policies;
};

export const loadSearchPolicy = async ({ contentDirectory }) => {
  const posts = await policyForCollection(
    path.join(contentDirectory, 'text/posts'),
    'posts'
  );
  const pages = await policyForCollection(
    path.join(contentDirectory, 'text/pages'),
    'pages'
  );
  const policies = new Map([...posts, ...pages]);

  for (const metadata of tagMetadata) {
    if (metadata.index === false) {
      policies.set(`/tagged/${slugifyTag(metadata.tag)}/`, {
        index: false,
      });
    }
  }

  return policies;
};
