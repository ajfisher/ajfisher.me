import React from 'react';
import { render, screen } from '@testing-library/react';
import ListLayout from '../src/components/list-layout';
import { pathDate } from '../src/lib/utils';

// --- Mocks ---
// Mock Header to render its props as data-attributes so we can assert on them.
jest.mock('../src/components/header', () => (props) => {
  return (
    <div
      data-testid="header"
      data-title={props.title}
      data-excerpt={props.excerpt}
      data-url={props.url}
      data-featuredimage={props.featuredimage}
      data-featuredimageby={props.featuredImageBy}
      data-tagimage={props.tagimage}
      data-postcount={props.postcount}
      data-smalltitle={props.smalltitle}
      data-largetitle={props.largetitle}
      data-readingtime={props.readingTime}
    >
      Header Mock
    </div>
  );
});

// Mock Nav, Footer, and ListArticle.
jest.mock('../src/components/nav', () => () => (
  <nav data-testid="nav">Nav Mock</nav>
));
jest.mock('../src/components/footer', () => (props) => (
  <div data-testid="footer" data-slug={props.slug}>Footer Mock</div>
));
jest.mock('../src/components/article', () => ({
  ListArticle: ({ children }) => (
    <div data-testid="list-article">{children}</div>
  ),
}));

// Mock Main and Aside from the layout module.
jest.mock('../src/components/layout', () => ({
  Main: ({ children }) => <main data-testid="main">{children}</main>,
  Aside: ({ children }) => <aside data-testid="aside">{children}</aside>,
}));

// ----------------------------------
// Test Suite for ListLayout Component
// ----------------------------------
describe('ListLayout Component', () => {
  const dummyChild = <p>Dummy Child</p>;
  const dummySlug = '/test-slug';

  const featuredMock = {
    frontmatter: {
      title: "Featured Title",
      date: "2021-08-05T00:00:00.000Z",
      slug: "featured-slug",
      excerpt: "Featured excerpt",
      featureimage: "dummy-feature-image",
      featured: true,
      tagimage: "dummy-tag-image",
      postcount: "5",
      small_title: "true",
      large_title: "false",
      imageby: "Photographer"
    },
    fields: {
      excerpt: "Fields excerpt"
    },
    timeToRead: 7,
    wordCount: { words: 350 }
  };

  it('renders Header, Main (with ListArticle containing children), Aside (with Nav), and Footer with slug', () => {
    render(
      <ListLayout featured={featuredMock} slug={dummySlug}>
        {dummyChild}
      </ListLayout>
    );

    const header = screen.getByTestId("header");
    expect(header).toHaveTextContent("Header Mock");

    // When frontmatter.date and frontmatter.slug are provided,
    // URL should be computed.
    const computedUrl = `/${pathDate(featuredMock.frontmatter.date)}/${featuredMock.frontmatter.slug}/`;
    expect(header).toHaveAttribute("data-url", computedUrl);

    // Frontmatter.excerpt should be used (over fields.excerpt)
    expect(header).toHaveAttribute("data-excerpt",
      featuredMock.frontmatter.excerpt);

    // Verify boolean props for smalltitle and largetitle are passed as strings.
    expect(header).toHaveAttribute("data-smalltitle",
      featuredMock.frontmatter.small_title);
    expect(header).toHaveAttribute("data-largetitle",
      featuredMock.frontmatter.large_title);

    // Reading time passed as prop.
    expect(header).toHaveAttribute("data-readingtime",
      String(featuredMock.timeToRead));

    // --- Main and ListArticle ---
    const mainEl = screen.getByTestId("main");
    expect(mainEl).toBeInTheDocument();

    const listArticle = screen.getByTestId("list-article");
    expect(listArticle).toHaveTextContent("Dummy Child");

    // --- Aside ---
    const asideEl = screen.getByTestId("aside");
    expect(asideEl).toBeInTheDocument();
    expect(screen.getByTestId("nav")).toBeInTheDocument();

    // --- Footer ---
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveAttribute("data-slug", dummySlug);
  });

  it('does not compute a URL if frontmatter.date or frontmatter.slug is missing', () => {
    const incompleteFeatured = {
      frontmatter: {
        title: "No URL Title",
        date: undefined,
        slug: undefined,
        excerpt: "No URL excerpt",
      },
      fields: {},
      timeToRead: 5,
      wordCount: { words: 200 }
    };

    render(
      <ListLayout featured={incompleteFeatured} slug={dummySlug}>
        {dummyChild}
      </ListLayout>
    );
    const header = screen.getByTestId("header");

    // If URL isn't computed, data-url should be null or an empty string.
    expect(header.getAttribute("data-url")).toBeNull();
  });

  it('prefers frontmatter.excerpt over fields.excerpt when available', () => {
    const featuredWithBoth = {
      frontmatter: {
        title: "Test Title",
        date: "2021-08-05T00:00:00.000Z",
        slug: "test-slug",
        excerpt: "Frontmatter excerpt"
      },
      fields: {
        excerpt: "Fields excerpt"
      },
      timeToRead: 4,
      wordCount: { words: 150 }
    };

    render(
      <ListLayout featured={featuredWithBoth} slug={dummySlug}>
        {dummyChild}
      </ListLayout>
    );
    const header = screen.getByTestId("header");
    expect(header).toHaveAttribute("data-excerpt", "Frontmatter excerpt");
  });

  it('uses fields.excerpt if frontmatter.excerpt is missing', () => {
    const featuredWithFieldsOnly = {
      frontmatter: {
        title: "Test Title",
        date: "2021-08-05T00:00:00.000Z",
        slug: "test-slug",
        // excerpt is missing here
      },
      fields: {
        excerpt: "Fields excerpt"
      },
      timeToRead: 4,
      wordCount: { words: 150 }
    };

    render(
      <ListLayout featured={featuredWithFieldsOnly} slug={dummySlug}>
        {dummyChild}
      </ListLayout>
    );
    const header = screen.getByTestId("header");
    expect(header).toHaveAttribute("data-excerpt", "Fields excerpt");
  });

  it('uses featured excerpt if frontmatter and fields are missing', () => {
    const featuredWithNoExcerpt = {
      frontmatter: {
        title: "Test Title",
        date: "2021-08-05T00:00:00.000Z",
        slug: "test-slug",
        // excerpt is missing here
      },
      fields: {},
      excerpt: "Featured excerpt",
      timeToRead: 4,
      wordCount: { words: 150 }
    };

    render(
      <ListLayout featured={featuredWithNoExcerpt} slug={dummySlug}>
        {dummyChild}
      </ListLayout>
    );
    const header = screen.getByTestId("header");
    expect(header).toHaveAttribute("data-excerpt", "Featured excerpt");
  });

  it('uses no excerpt if all sources are missing', () => {
    const featuredWithNoExcerpt = {
      frontmatter: {
        title: "Test Title",
        date: "2021-08-05T00:00:00.000Z",
        slug: "test-slug",
        // excerpt is missing here
      },
      fields: {},
      timeToRead: 4,
      wordCount: { words: 150 }
    };

    render(
      <ListLayout featured={featuredWithNoExcerpt} slug={dummySlug}>
        {dummyChild}
      </ListLayout>
    );
    const header = screen.getByTestId("header");
    expect(header).toHaveAttribute("data-excerpt", "");
  });

  it('renders even if no fields are provided', () => {
    render(
      <ListLayout featured={{}} slug={dummySlug}>
        {dummyChild}
      </ListLayout>
    );

    const header = screen.getByTestId("header");
    expect(header).toHaveTextContent("Header Mock");
  });

  it('renders even if no featured prop is provided', () => {
    render(
      <ListLayout slug={dummySlug}>
        {dummyChild}
      </ListLayout>
    );

    const header = screen.getByTestId("header");
    expect(header).toHaveTextContent("Header Mock");
  });

});

