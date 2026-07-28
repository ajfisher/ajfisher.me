export const postUri = (dateValue, slug) => {
  const date = new Date(dateValue);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}/${month}/${day}/${slug}/`;
};

export const pageUri = (slug) => `${slug}/`;
