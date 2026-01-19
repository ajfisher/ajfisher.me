export const mergeEntryData = (entry) => {
  if (!entry) return {};

  const frontmatter = entry?.rendered?.metadata?.frontmatter ?? {};

  return {
    ...entry.data,
    ...frontmatter,
    featureimage: entry.data.featureimage ?? frontmatter.featureimage,
    listimage: entry.data.listimage ?? frontmatter.listimage,
  };
};
