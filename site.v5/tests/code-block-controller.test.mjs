import assert from 'node:assert/strict';
import test from 'node:test';

import { copyText } from '../src/lib/code-block-controller.mjs';

test('copyText writes the complete source text to the Clipboard API', async () => {
  const source = 'echo "héllo"\n\nprintf "%s" "done"\n';
  let copiedText;

  const copied = await copyText(source, {
    clipboard: {
      writeText: async (text) => {
        copiedText = text;
      },
    },
  });

  assert.equal(copied, true);
  assert.equal(copiedText, source);
});

test('copyText uses the bounded fallback after Clipboard API failure', async () => {
  let textarea;
  let removed = false;
  let focused = false;

  const doc = {
    activeElement: {
      focus: () => {
        focused = true;
      },
    },
    body: {
      append: (element) => {
        textarea = element;
      },
    },
    createElement: () => ({
      setAttribute: () => {},
      style: {},
      select: () => {},
      remove: () => {
        removed = true;
      },
    }),
    execCommand: (command) => command === 'copy',
  };

  const copied = await copyText('fallback text', {
    clipboard: {
      writeText: async () => {
        throw new Error('Permission denied');
      },
    },
    doc,
  });

  assert.equal(copied, true);
  assert.equal(textarea.value, 'fallback text');
  assert.equal(removed, true);
  assert.equal(focused, true);
});

test('copyText reports failure when no copy mechanism is available', async () => {
  const copied = await copyText('cannot copy', {
    clipboard: undefined,
    doc: {},
  });

  assert.equal(copied, false);
});

test('copyText reports failure when the legacy fallback throws', async () => {
  const copied = await copyText('cannot copy', {
    clipboard: undefined,
    doc: {
      activeElement: null,
      body: { append: () => {} },
      createElement: () => ({
        setAttribute: () => {},
        style: {},
        select: () => {},
        remove: () => {},
      }),
      execCommand: () => {
        throw new Error('Copy is blocked');
      },
    },
  });

  assert.equal(copied, false);
});
