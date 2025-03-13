import React from 'react';
import { render } from '@testing-library/react';
import { Paginate } from '../src/components/pagination';
import { MemoryRouter } from 'react-router-dom';

// A simple wrapper to render our component within a router context.
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};

describe('Paginate component', () => {
  it('does not render a previous link on the first page', () => {
    const { container } = renderWithRouter(
      <Paginate basepath="/blog" currentpage={1} numpages={5} />
    );
    // Should not render a link with rel="prev"
    expect(container.querySelector('a[rel="prev"]')).toBeNull();
  });

  it('renders a next link on the first page', () => {
    const { container } = renderWithRouter(
      <Paginate basepath="/blog" currentpage={1} numpages={5} />
    );
    const nextLink = container.querySelector('a[rel="next"]');
    expect(nextLink).toBeInTheDocument();
    // For page 1, next page should be "2" so the URL should be "/blog/2"
    expect(nextLink.getAttribute('href')).toBe('/blog/2');
  });

  it('renders both previous and next links on a middle page', () => {
    const { container } = renderWithRouter(
      <Paginate basepath="/blog" currentpage={3} numpages={5} />
    );
    const prevLink = container.querySelector('a[rel="prev"]');
    const nextLink = container.querySelector('a[rel="next"]');
    expect(prevLink).toBeInTheDocument();
    expect(nextLink).toBeInTheDocument();
    expect(prevLink.getAttribute('href')).toBe('/blog/2');
    expect(nextLink.getAttribute('href')).toBe('/blog/4');
  });

  it('does not render a next link on the last page', () => {
    const { container } = renderWithRouter(
      <Paginate basepath="/blog" currentpage={5} numpages={5} />
    );
    const nextLink = container.querySelector('a[rel="next"]');
    expect(nextLink).toBeNull();
  });

  it('renders pagination links for all pages with correct URLs', () => {
    const numpages = 4;
    const { getByText } = renderWithRouter(
      <Paginate basepath="/blog" currentpage={2} numpages={numpages} />
    );
    // Check that links for pages 1 to numpages are rendered with the correct URL.
    for (let i = 1; i <= numpages; i++) {
      const pageLink = getByText(i.toString());
      expect(pageLink).toBeInTheDocument();
      // For the first page, the link should be just the basepath (which will have a trailing slash)
      if (i === 1) {
        expect(pageLink.getAttribute('href')).toBe('/blog/');
      } else {
        expect(pageLink.getAttribute('href')).toBe(`/blog/${i}`);
      }
    }
  });

  it('applies the "current" class to the link for the current page', () => {
    const currentPage = 3;
    const { getByText } = renderWithRouter(
      <Paginate basepath="/blog" currentpage={currentPage} numpages={5} />
    );
    const currentLink = getByText(currentPage.toString());
    expect(currentLink.className).toMatch(/current/);
  });

  it('appends a trailing slash to basepath if missing', () => {
    // Provide a basepath without a trailing slash.
    const { getByText } = renderWithRouter(
      <Paginate basepath="/blog" currentpage={1} numpages={3} />
    );
    // The first pagination link should have href "/blog/".
    const firstLink = getByText("1");
    expect(firstLink.getAttribute('href')).toBe("/blog/");
  });

  it('does not append a trailing slash to basepath if already present', () => {
    // Provide a basepath with a trailing slash.
    const { getByText } = renderWithRouter(
      <Paginate basepath="/blog/" currentpage={1} numpages={3} />
    );
    // The first pagination link should have href "/blog/".
    const firstLink = getByText("1");
    expect(firstLink.getAttribute('href')).toBe("/blog/");
  });

});

