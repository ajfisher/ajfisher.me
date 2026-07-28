// This handler resolves directory-style routes to their S3 index files and
// returns permanent responses for legacy URLs with clear replacements.

const MARKDOWN_PAGE_SLUGS = new Set(['who', 'colophon', 'dis-everything']);

const PERMANENT_REDIRECTS = new Map([
  [
    '/2023/02/13/podcast-enterprise-ai/',
    '/2023/02/12/podcast-enterprise-ai/'
  ],
  [
    '/2007/11/19/fuzzy-logic-could-book-more-flights/2007/03/' +
      'fuzzys-where-its-at-or-will-be/',
    '/2007/03/05/fuzzys-where-its-at-or-will-be-eventually/'
  ],
  ['/tagged/johnny-five/', '/tagged/nodebots/'],
  ['/2011/12/20/', '/2011/12/20/towards-a-sensor-commons/'],
  ['/2011/12/20/towards-/', '/2011/12/20/towards-a-sensor-commons/'],
  [
    '/2007/11/27/adding-cron-jobs-to-a-qnap-server/',
    '/2007/11/26/adding-cron-jobs-to-a-qnap-server/'
  ],
  ['/tagged/sms/', '/tagged/mobile/'],
  ['/tagged/data/', '/tagged/data-science/'],
]);

const redirectLookupPath = (uri = '') => {
  if (uri.endsWith('/') || uri.includes('.')) {
    return uri;
  }

  return `${uri}/`;
};

const permanentRedirect = (location, querystring = '') => ({
  status: '301',
  statusDescription: 'Moved Permanently',
  headers: {
    location: [{
      key: 'Location',
      value: querystring ? `${location}?${querystring}` : location,
    }],
    'cache-control': [{
      key: 'Cache-Control',
      value: 'public, max-age=31536000',
    }],
  },
});

const isRedirectMethod = (method) => method === 'GET' || method === 'HEAD';

const trailingSlashTarget = (uri = '') => {
  if (!uri || uri === '/' || uri.endsWith('/') || uri.includes('.')) {
    return undefined;
  }

  return `${uri}/`;
};

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

const toMarkdownUri = (uri = '') => {
  const postMatch = uri.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/.]+)\/?$/);
  if (postMatch) {
    const [, year, month, day, slug] = postMatch;
    return `/text/posts/${year}-${month}-${day}-${slug}.md`;
  }

  const trimmed = uri.replace(/^\/+|\/+$/g, '');
  if (MARKDOWN_PAGE_SLUGS.has(trimmed)) {
    return `/text/pages/${trimmed}.md`;
  }

  return uri;
};

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
  const method = request.method ?? 'GET';
  const redirectTarget = PERMANENT_REDIRECTS.get(redirectLookupPath(uri));

  if (isRedirectMethod(method) && redirectTarget) {
    return permanentRedirect(redirectTarget, request.querystring);
  }

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

  const canonicalTarget = trailingSlashTarget(request.uri);
  if (isRedirectMethod(method) && canonicalTarget) {
    return permanentRedirect(canonicalTarget, request.querystring);
  }

  const serveMarkdown = needsMarkdown(request.uri, request.headers);

  if (serveMarkdown) {
    request.uri = toMarkdownUri(request.uri);
  } else if (request.uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!request.uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
};
