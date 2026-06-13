import assert from 'node:assert/strict';
import { test } from 'node:test';

import { handler } from '../handlers/security_cache_headers.mjs';

const eventFor = (uri) => ({
  Records: [
    {
      cf: {
        request: { uri },
        response: { headers: {} }
      }
    }
  ]
});

test('denies framing for normal pages', async () => {
  const response = await handler(eventFor('/2026/06/13/fail-fast-fix-faster/'));

  assert.equal(response.headers['x-frame-options'][0].value, 'DENY');
});

test('allows same-origin framing for animation assets', async () => {
  const response = await handler(
    eventFor('/animation/aieng26/terminal-stream.html')
  );

  assert.equal(response.headers['x-frame-options'][0].value, 'SAMEORIGIN');
});
