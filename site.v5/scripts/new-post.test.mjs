import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';

import {
  buildPostPath,
  createPost,
  formatPostDate,
  parseArgs,
  renderPostMarkdown,
  slugifyTitle,
} from './new-post.mjs';

test('slugifies titles using the site slug rules', () => {
  assert.equal(
    slugifyTitle('Fail fast, fix faster: Why faster models can beat smarter ones'),
    'fail-fast-fix-faster-why-faster-models-can-beat-smarter-ones',
  );
  assert.equal(slugifyTitle("What's new in AI?"), 'whats-new-in-ai');
});

test('formats a local post date with timezone offset', () => {
  const fakeDate = {
    getFullYear: () => 2026,
    getMonth: () => 6,
    getDate: () => 11,
    getHours: () => 12,
    getMinutes: () => 34,
    getSeconds: () => 56,
    getTimezoneOffset: () => -600,
  };

  assert.equal(formatPostDate(fakeDate), '2026-07-11 12:34:56+10:00');
});

test('renders frontmatter with optional tags', () => {
  assert.equal(
    renderPostMarkdown({
      title: 'My Post',
      date: '2026-07-11 12:00:00+10:00',
      slug: 'my-post',
      tags: 'ai, development',
    }),
    `---
author: ajfisher
date: 2026-07-11 12:00:00+10:00
layout: post
slug: my-post
title: "My Post"
tags: "ai, development"
---

`,
  );
});

test('omits the tags field when no tags are supplied', () => {
  assert.equal(
    renderPostMarkdown({
      title: 'My Post',
      date: '2026-07-11 12:00:00+10:00',
      slug: 'my-post',
      tags: '',
    }),
    `---
author: ajfisher
date: 2026-07-11 12:00:00+10:00
layout: post
slug: my-post
title: "My Post"
---

`,
  );
});

test('builds the post path from the date and slug', () => {
  assert.equal(
    buildPostPath({
      repoRoot: '/repo',
      date: '2026-07-11 08:00:00+10:00',
      slug: 'my-post',
    }),
    path.join('/repo', 'content', 'text', 'posts', '2026-07-10-my-post.md'),
  );
});

test('rejects invalid calendar dates', () => {
  assert.throws(
    () => buildPostPath({
      repoRoot: '/repo',
      date: '2026-02-31 12:00:00+10:00',
      slug: 'bad-date',
    }),
    /valid calendar day/,
  );
});

test('parses supported flags', () => {
  assert.deepEqual(
    parseArgs([
      '--title',
      'My Post',
      '--date=2026-07-11 12:00:00+10:00',
      '--tags',
      'ai, development',
    ]),
    {
      help: false,
      values: {
        title: 'My Post',
        date: '2026-07-11 12:00:00+10:00',
        tags: 'ai, development',
      },
    },
  );
});

test('aborts when the derived post file already exists', async () => {
  const repoRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'new-post-'));
  const existingPath = buildPostPath({
    repoRoot,
    date: '2026-07-11 12:00:00+10:00',
    slug: 'my-post',
  });

  await fs.mkdir(path.dirname(existingPath), { recursive: true });
  await fs.writeFile(existingPath, 'existing content');

  await assert.rejects(
    () => createPost({
      repoRoot,
      title: 'My Post',
      date: '2026-07-11 12:00:00+10:00',
      tags: 'ai',
    }),
    {
      code: 'EEXIST',
      filePath: existingPath,
    },
  );

  assert.equal(await fs.readFile(existingPath, 'utf8'), 'existing content');
});
