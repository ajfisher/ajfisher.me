/* Used to specify the main breakpoints used for the site */

const size = {
  medium: '501px',
  large: '768px',
  wide: '1140px'
};

// I think the wide size is broken
export const device = {
  medium: `(min-width: ${size.medium})`,
  large: `(min-width: ${size.large})`,
  wide: `(min-width: ${size.wide})`
};
