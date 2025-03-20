// tags.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Tags, { TagList } from '../src/components/tags';
import { MemoryRouter } from 'react-router-dom';

describe('Tags component', () => {
  it('renders nothing when no children are provided', () => {
    const { container } = render(
      <MemoryRouter>
        <Tags />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when an empty array is provided', () => {
    const { container } = render(
      <MemoryRouter>
        <Tags>{[]}</Tags>
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders tags when a non-empty array is provided', () => {
    const tagNames = ['React', 'JavaScript'];
    render(
      <MemoryRouter>
        <Tags>{tagNames}</Tags>
      </MemoryRouter>
    );
    // Check that the TagPara is rendered (it should include the text "Tags:")
    expect(screen.getByText(/Tags:/)).toBeInTheDocument();
    // Check that each tag is rendered as a link with the correct href.
    tagNames.forEach(tag => {
      const tagLink = screen.getByText(tag);
      expect(tagLink).toBeInTheDocument();
      // Our kebabCase simply lowercases the string (and replaces spaces)
      expect(tagLink.getAttribute('href')).toBe(`/tagged/${tag.toLowerCase()}/`);
    });
  });
});

describe('TagList component', () => {
  it('returns null when children is null', () => {
    const { container } = render(
      <MemoryRouter>
        <TagList children={null} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders a list of tags when provided an array', () => {
    const tagsArray = ['CSS', 'HTML'];
    render(
      <MemoryRouter>
        <TagList>{tagsArray}</TagList>
      </MemoryRouter>
    );
    tagsArray.forEach(tag => {
      const tagLink = screen.getByText(tag);
      expect(tagLink).toBeInTheDocument();
      expect(tagLink.getAttribute('href')).toBe(`/tagged/${tag.toLowerCase()}/`);
    });
  });
});

