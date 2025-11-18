import { handler } from '../../app/handlers/gatsby_index_redirect.mjs';

const buildHeaders = (values = {}) => Object.entries(values).reduce((acc, [key, value]) => {
  acc[key.toLowerCase()] = [{ key, value }];
  return acc;
}, {});

const buildEvent = (uri, headers) => ({
  Records: [
    {
      cf: {
        request: {
          uri,
          headers,
        },
      },
    },
  ],
});

describe('gatsby_index_redirect handler', () => {
  it('defaults to HTML when markdown headers are absent', async () => {
    const response = await handler(buildEvent('/2024/07/02/example-post/', {}));
    expect(response.uri).toBe('/2024/07/02/example-post/index.html');
  });

  it('rewrites to markdown when Accept prefers text/markdown for posts', async () => {
    const headers = buildHeaders({ accept: 'text/markdown' });
    const response = await handler(buildEvent('/2024/07/02/example-post/', headers));
    expect(response.uri).toBe('/2024/07/02/example-post/index.md');
  });

  it('rewrites to markdown when Prefer header asks for it on page slugs', async () => {
    const headers = buildHeaders({ prefer: 'return=representation;format=markdown' });
    const response = await handler(buildEvent('/who/', headers));
    expect(response.uri).toBe('/who/index.md');
  });

  it('keeps HTML for non-markdown paths even if markdown is requested', async () => {
    const headers = buildHeaders({ accept: 'text/markdown' });
    const response = await handler(buildEvent('/blog/', headers));
    expect(response.uri).toBe('/blog/index.html');
  });
});
