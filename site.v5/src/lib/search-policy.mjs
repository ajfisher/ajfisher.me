export const isIndexable = (value) => value !== false;

export const robotsContent = (value) =>
  isIndexable(value) ? undefined : 'noindex, follow';

export const documentTitle = (title, siteTitle) => {
  const normalizedTitle = title?.trim();

  if (!normalizedTitle || normalizedTitle === siteTitle) {
    return siteTitle;
  }

  if (normalizedTitle.endsWith(` | ${siteTitle}`)) {
    return normalizedTitle;
  }

  return `${normalizedTitle} | ${siteTitle}`;
};

export const createSitemapSerializer = (policyByPath) => (item) => {
  const pathname = new URL(item.url).pathname;
  const policy = policyByPath.get(pathname);

  if (policy && !isIndexable(policy.index)) {
    return undefined;
  }

  if (policy?.lastmod) {
    return {
      ...item,
      lastmod: new Date(policy.lastmod).toISOString(),
    };
  }

  return item;
};
