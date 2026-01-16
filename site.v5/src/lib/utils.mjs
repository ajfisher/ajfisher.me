// A set of utility functions for various common tasks

// allows to transform image URLs to a format that suits astro set up on images
export const imageTransform = (val) => {
  if (!val) return val;

  if (typeof val !== 'string') {
    // this means it's probably alread converted to a static import by astro
    return val;
  }

  // get rid of relative paths in image URLs
  let transformed = val.replace('../../img/', '/img/');
  transformed = transformed.replace('../img/', '/img/');

  return transformed;
}

export const longDate = (date) => {
  const d = new Date(date);
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' });
  const month = d.toLocaleDateString('en-GB', { month: 'long' });
  const year = d.getFullYear();

  // Manual ordinal logic to match output as it's not supported natively
  const day = d.getDate();
  const suffix = ["th", "st", "nd", "rd"][(day % 10 > 3 || Math.floor(day % 100 / 10) === 1) ? 0 : day % 10];

  return `${weekday}, ${month} ${day}${suffix} ${year}`;
};
