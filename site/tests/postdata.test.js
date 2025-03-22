import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';
import PostData from '../src/components/postdata';

// we use this due to the mocks and we have proper definitions elsewhere
/* eslint-disable react/prop-types, react/display-name */

// Since the PostData component imports the Tags component from './tags',
// we can mock it here to simply render its children inside a <div>
// with a test id for easier selection.
jest.mock('../src/components/tags', () => (props) => (
  <div data-testid="tags">{props.children}</div>
));

describe('PostData Component', () => {
  // Use a fixed ISO date for consistency.
  const publicationDate = "2021-08-05T00:00:00.000Z";
  // Calculate the expected formatted date using moment.
  const formattedDate = moment(publicationDate).format("dddd, MMMM Do YYYY");

  it('renders title, published info, and tags with default author', () => {
    render(
      <PostData
        title="Test Post"
        publicationDate={publicationDate}
        tags="tag1, tag2"
      />
    );

    // Check that the title is rendered.
    expect(screen.getByText("Test Post")).toBeInTheDocument();

    // Check that the published info is rendered with the default author "ajfisher".
    expect(
      screen.getByText(`Published on ${formattedDate} by ajfisher`)
    ).toBeInTheDocument();

    // Check that the tags are rendered via the mocked Tags component.
    expect(screen.getByTestId("tags")).toHaveTextContent("tag1, tag2");
  });

  it('renders published info with provided author', () => {
    render(
      <PostData
        title="Test Post"
        publicationDate={publicationDate}
        tags="tag1"
        excerpt="Excerpt"
        author="Jane Doe"
      />
    );
    expect(
      screen.getByText(`Published on ${formattedDate} by Jane Doe`)
    ).toBeInTheDocument();
  });

});

