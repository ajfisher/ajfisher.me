// A set of utility functions for various common tasks

// allows to transform image URLs to a format that suits astro set up on images
export const imageTransform = (val) => {
  if (!val) return val;

  // get rid of relative paths in image URLs
  let transformed = val.replace('../../img/', '/img/');
  transformed = transformed.replace('../img/', '/img/');

  return transformed;
}
