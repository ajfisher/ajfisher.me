import assert from 'node:assert/strict';
import { test } from 'node:test';

import { handler } from '../handlers/gatsby_index_redirect.mjs';

const eventFor = (
  uri,
  {
    method = 'GET',
    querystring = '',
    headers = {},
  } = {}
) => ({
  Records: [{
    cf: {
      request: {
        uri,
        method,
        querystring,
        headers,
      },
    },
  }],
});

const redirects = [
  [
    '/2023/02/13/podcast-enterprise-ai/',
    '/2023/02/12/podcast-enterprise-ai/'
  ],
  [
    '/2007/11/19/fuzzy-logic-could-book-more-flights/2007/03/' +
      'fuzzys-where-its-at-or-will-be',
    '/2007/03/05/fuzzys-where-its-at-or-will-be-eventually/'
  ],
  ['/tagged/johnny-five/', '/tagged/nodebots/'],
  ['/2011/12/20/', '/2011/12/20/towards-a-sensor-commons/'],
  ['/2011/12/20/towards-', '/2011/12/20/towards-a-sensor-commons/'],
  [
    '/2007/11/27/adding-cron-jobs-to-a-qnap-server/',
    '/2007/11/26/adding-cron-jobs-to-a-qnap-server/'
  ],
  ['/tagged/sms/', '/tagged/mobile/'],
  ['/tagged/data', '/tagged/data-science/'],
];

for (const [source, destination] of redirects) {
  test(`permanently redirects ${source}`, async () => {
    const response = await handler(eventFor(source));

    assert.equal(response.status, '301');
    assert.equal(response.headers.location[0].value, destination);
    assert.equal(
      response.headers['cache-control'][0].value,
      'public, max-age=31536000'
    );
  });
}

test('preserves query strings on redirects', async () => {
  const response = await handler(eventFor(
    '/tagged/johnny-five/',
    { querystring: 'source=legacy' }
  ));

  assert.equal(
    response.headers.location[0].value,
    '/tagged/nodebots/?source=legacy'
  );
});

test('does not redirect unsafe request methods', async () => {
  const request = await handler(eventFor(
    '/tagged/johnny-five/',
    { method: 'POST' }
  ));

  assert.equal(request.uri, '/tagged/johnny-five/index.html');
});

test('rewrites directory routes to their index file', async () => {
  const request = await handler(eventFor('/who/'));

  assert.equal(request.uri, '/who/index.html');
});

test('serves Markdown when a post requests it', async () => {
  const request = await handler(eventFor(
    '/2026/06/13/fail-fast-fix-faster/',
    {
      headers: {
        accept: [{ value: 'text/markdown' }],
      },
    }
  ));

  assert.equal(
    request.uri,
    '/text/posts/2026-06-13-fail-fast-fix-faster.md'
  );
});
