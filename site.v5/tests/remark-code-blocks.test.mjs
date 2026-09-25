import assert from 'node:assert/strict';
import test from 'node:test';

import remarkCodeBlocks from '../src/lib/remark-code-blocks.mjs';

const transform = (tree) => {
  const file = {
    data: {
      astro: {
        frontmatter: {},
      },
    },
  };

  remarkCodeBlocks()(tree, file);
  return file.data.astro.frontmatter;
};

test('marks Markdown containing a code block', () => {
  const frontmatter = transform({
    type: 'root',
    children: [
      { type: 'paragraph', children: [{ type: 'text', value: 'Before' }] },
      { type: 'code', lang: 'js', value: 'console.log("hello");' },
    ],
  });

  assert.equal(frontmatter.hasCodeBlocks, true);
});

test('does not mark Markdown containing only inline code', () => {
  const frontmatter = transform({
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'inlineCode', value: 'const value = true' }],
      },
    ],
  });

  assert.equal(frontmatter.hasCodeBlocks, undefined);
});
