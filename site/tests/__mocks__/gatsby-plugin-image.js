// __mocks__/gatsby-plugin-image.js
const React = require('react');

const GatsbyImage = jest.fn().mockImplementation(({ alt }) =>
  React.createElement('img', { alt, 'data-testid': 'gatsby-image' })
);

const getImage = jest.fn().mockImplementation((image) => image);

module.exports = { GatsbyImage, getImage };

