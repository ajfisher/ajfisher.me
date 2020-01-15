/* Used to specify the main breakpoints used for the site */

const size = {
  small: '401px',
  medium: '501px',
  large: '751px',
  wide: '1051px'
};

// I think the wide size is broken
export const device = {
  small: `(min-width: ${size.small})`,
  medium: `(min-width: ${size.medium})`,
  large: `(min-width: ${size.large})`,
  wide: `(min-width: ${size.wide})`
};
