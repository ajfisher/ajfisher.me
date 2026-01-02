// A set of utility functions for various common tasks

// allows to transform image URLs to a format that suits astro set up on images
export const imageTransform = (val) => val ? val.replace(/^.*\/img/, 'img/') : val;

