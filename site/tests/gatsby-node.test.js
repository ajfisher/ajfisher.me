const path = require('path');

jest.mock('fs', () => {
  const actual = jest.requireActual('fs');
  return {
    ...actual,
    promises: {
      mkdir: jest.fn().mockResolvedValue(),
      writeFile: jest.fn().mockResolvedValue(),
    },
  };
});

const { promises: { mkdir, writeFile } } = require('fs');
const { onPostBuild } = require('../gatsby-node');
const { pathDate } = require('../lib/utils');

describe('onPostBuild markdown export', () => {
  beforeEach(() => {
    mkdir.mockClear();
    writeFile.mockClear();
  });

  it('writes raw markdown bodies into the public mirror for posts and pages', async () => {
    const postDate = '2020-01-15';
    const graphql = jest.fn().mockResolvedValue({
      data: {
        allMarkdownRemark: {
          nodes: [
            {
              rawMarkdownBody: '# Hello world',
              frontmatter: {
                slug: 'my-post',
                layout: 'post-default',
                date: postDate,
              },
            },
            {
              rawMarkdownBody: 'Just a page',
              frontmatter: {
                slug: '/about/',
                layout: 'page',
              },
            },
          ],
        },
      },
    });

    await onPostBuild({ graphql, reporter: { panicOnBuild: jest.fn() } });

    const postDir = path.join('public', `${pathDate(postDate)}/my-post/`);
    const pageDir = path.join('public', 'about/');

    expect(mkdir).toHaveBeenCalledWith(postDir, { recursive: true });
    expect(writeFile).toHaveBeenCalledWith(path.join(postDir, 'index.md'), '# Hello world', 'utf8');

    expect(mkdir).toHaveBeenCalledWith(pageDir, { recursive: true });
    expect(writeFile).toHaveBeenCalledWith(path.join(pageDir, 'index.md'), 'Just a page', 'utf8');
  });
});
