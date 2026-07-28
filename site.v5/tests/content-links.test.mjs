import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..'
);
const contentDirs = [
  path.join(repoRoot, 'content/text/pages'),
  path.join(repoRoot, 'content/text/posts'),
];

async function markdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return markdownFiles(fullPath);
      }
      return entry.isFile() && entry.name.endsWith('.md') ? [fullPath] : [];
    })
  );
  return files.flat();
}

function stripHashAndQuery(href) {
  return href.split(/[?#]/, 1)[0];
}

function isPublicOrExternalHref(href) {
  return (
    href.startsWith('/') ||
    href.startsWith('#') ||
    /^[a-z][a-z0-9+.-]*:/i.test(href)
  );
}

function markdownLinkHrefs(content) {
  return [
    ...content.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g),
    ...content.matchAll(/^\s*\[[^\]]+\]:\s*(\S+)/gm),
  ].map((match) => match[1].replace(/^<|>$/g, ''));
}

test('content links do not point to repository Markdown files', async () => {
  const violations = [];
  for (const dir of contentDirs) {
    for (const file of await markdownFiles(dir)) {
      const content = await readFile(file, 'utf8');
      for (const href of markdownLinkHrefs(content)) {
        if (
          !isPublicOrExternalHref(href) &&
          stripHashAndQuery(href).endsWith('.md')
        ) {
          violations.push(`${path.relative(repoRoot, file)} -> ${href}`);
        }
      }
    }
  }

  assert.deepEqual(violations, []);
});
