import React from 'react';

const FontAwesomeIcon = jest.fn().mockImplementation(({ icon }) => (
  <span data-testid={`icon-${icon.iconName}`} />
));

export { FontAwesomeIcon };

