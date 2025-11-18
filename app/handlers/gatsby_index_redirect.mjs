// this handler looks for requests that are effectively for directories
// coming through cloudfront. As it doesn't know that that means to serve
// the index file, it just throws a 404. This will perform the appropriate
// rerouting of the URL so that S3 can retrieve the right file and respond
// correctly.

const MARKDOWN_PAGE_SLUGS = new Set(['who', 'colophon', 'dis-everything']);

const getHeaderValue = (headers = {}, headerName) => {
  if (!headerName) {
    return '';
  }

  const normalized = headerName.toLowerCase();

  // CloudFront canonicalises header names to lowercase but tests sometimes
  // refer to the original casing. Check the common permutations before
  // falling back to the header being absent altogether.
  const headerEntries =
    headers[normalized] || headers[headerName] || headers[normalized.toUpperCase()];

  if (!headerEntries || !headerEntries.length) {
    return '';
  }

  return headerEntries[0].value?.toLowerCase() ?? '';
};

const wantsMarkdown = (headers) => {
  const acceptHeader = getHeaderValue(headers, 'accept');
  if (acceptHeader.includes('text/markdown')) {
    return true;
  }

  const preferHeader = getHeaderValue(headers, 'prefer');
  return preferHeader.includes('markdown');
};

const isPostPath = (uri = '') => /^\/\d{4}\/\d{2}\/\d{2}\/[^/.]+\/?$/.test(uri);

const isMarkdownPagePath = (uri = '') => {
  const trimmed = uri.replace(/^\/+|\/+$/g, '');
  if (!trimmed || trimmed.includes('/')) {
    return false;
  }

  return MARKDOWN_PAGE_SLUGS.has(trimmed);
};

const needsMarkdown = (uri, headers) => wantsMarkdown(headers) && (isPostPath(uri) || isMarkdownPagePath(uri));

const ensureIndexFile = (uri, filename) => {
  if (uri.endsWith('/')) {
    return `${uri}${filename}`;
  }

  if (!uri.includes('.')) {
    return `${uri}/${filename}`;
  }

  return uri;
};

export const handler = async (event) => {
  const request = event.Records[0].cf.request;
  const { uri } = request;

  if (uri.endsWith('%7Bauthourl%7D')) {
    // this is dealing with a bunch of the 404 errors we see where there's a
    // {authourl} appended to the end of the request - just remove this
    request.uri = uri.replace('%7Bauthourl%7D', '');
  }

  if (uri.endsWith('{authourl}')) {
    // this is dealing with a bunch of the 404 errors we see where there's a
    // {authourl} appended to the end of the request - just remove this
    request.uri = uri.replace('{authourl}', '');
  }

  if (uri.endsWith('/tagged/sms/')) {
    request.uri = '/tagged/mobile/';
  }
  if (uri.endsWith('/tagged/data/')) {
    request.uri = '/tagged/data-science/';
  }

  const serveMarkdown = needsMarkdown(request.uri, request.headers);

  if (serveMarkdown) {
    request.uri = ensureIndexFile(request.uri, 'index.md');
  } else if (request.uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!request.uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
};

