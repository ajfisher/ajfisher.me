// __mocks__/gatsby-plugin-image.js
import React from 'react';

const GatsbyImage = jest.fn().mockImplementation(({ alt }) => (
  <img alt={alt} data-testid="gatsby-image" />
));

const getImage = jest.fn().mockImplementation((image) => image);

const StaticImage = jest.fn().mockImplementation(({ src }) => <img src={src} data-testid="static-image" alt="" />);

export { GatsbyImage, getImage, StaticImage };


