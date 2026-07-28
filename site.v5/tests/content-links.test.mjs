import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDirectory = path.resolve(__dirname, '../../content/text');
const relativeMarkdownLink =
  /(?<!!)\[[^\]]*\]\((?:\.\.?\/)[^)\s]+\.md(?:#[^)]*)?\)/g;

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

test('content does not link to repository-relative Markdown files', async () => {
  const failures = [];

  for (const filePath of await markdownFiles(contentDirectory)) {
    const source = await fs.readFile(filePath, 'utf8');
    const matches = source.match(relativeMarkdownLink) ?? [];

    for (const match of matches) {
      failures.push(`${path.relative(contentDirectory, filePath)}: ${match}`);
    }
  }

  assert.deepEqual(failures, []);
});
