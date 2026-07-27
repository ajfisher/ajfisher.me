import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  createSitemapSerializer,
  documentTitle,
  robotsContent,
} from '../src/lib/search-policy.mjs';

test('adds the site title exactly once', () => {
  assert.equal(documentTitle('Home', 'ajfisher'), 'Home | ajfisher');
  assert.equal(documentTitle('Home\n', 'ajfisher'), 'Home | ajfisher');
  assert.equal(
    documentTitle('Home | ajfisher', 'ajfisher'),
    'Home | ajfisher'
  );
  assert.equal(documentTitle('ajfisher', 'ajfisher'), 'ajfisher');
});

test('only emits robots metadata for explicitly excluded pages', () => {
  assert.equal(robotsContent(undefined), undefined);
  assert.equal(robotsContent(true), undefined);
  assert.equal(robotsContent(false), 'noindex, follow');
});

test('omits noindex pages and applies content modification dates', () => {
  const policies = new Map([
    ['/private/', { index: false }],
    ['/updated/', { lastmod: '2026-07-27T00:00:00.000Z' }],
  ]);
  const serialize = createSitemapSerializer(policies);

  assert.equal(
    serialize({ url: 'https://ajfisher.me/private/' }),
    undefined
  );
  assert.deepEqual(
    serialize({ url: 'https://ajfisher.me/updated/' }),
    {
      url: 'https://ajfisher.me/updated/',
      lastmod: '2026-07-27T00:00:00.000Z',
    }
  );
});
