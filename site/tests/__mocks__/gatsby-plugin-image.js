// __mocks__/gatsby-plugin-image.js
import React from 'react';

const GatsbyImage = jest.fn().mockImplementation(({ alt }) => (
  <img alt={alt} data-testid="gatsby-image" />
));

const getImage = jest.fn().mockImplementation((image) => image);

export { GatsbyImage, getImage };


