/* Used to specify the main breakpoints used for the site */

const size = {
  small: '401px',
  medium: '501px',
  large: '801px',
  wide: '1140px'
};

// I think the wide size is broken
export const device = {
  small: `(min-width: ${size.small})`,
  medium: `(min-width: ${size.medium})`,
  large: `(min-width: ${size.large})`,
  wide: `(min-width: ${size.wide})`
};
