import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Template, { Head } from '../../src/templates/article';
import { useStaticQuery } from 'gatsby';

// Mock sub-components so that you can inspect their props and rendered output.
jest.mock('../../src/components/footer', () => () => <footer data-testid="footer">Footer Mock</footer>);
jest.mock('../../src/components/nav', () => () => <nav data-testid="nav">Footer Mock</nav>);

// Mock Layout so we can inspect its props
jest.mock('../../src/components/post-layout', () => ({children, ...props}) => {
  return (
    <div data-testid="layout" {...props}>{children}</div>
  );
});

jest.mock('../../src/components/page-head', () => (props) => {
  return (
    <div
      data-testid="pagehead"
      data-title={props.title}
      data-description={props.description}
      data-tweet={props.tweet}
      data-type={props.type}
    >
      Page Head Mock
    </div>
  );
});

const mockArticleData = {
  markdownRemark: {
    html: "<p>Test HTML content</p>",
    frontmatter: {
      date: "2021-01-01",
      slug: "test-post",
      title: "Test Post Title",
      excerpt: "Test excerpt",
      twitter_excerpt: "Twitter excerpt",
      featureimage: null,
      imageby: "John Doe",
      imagelink: "http://example.com",
      small_title: false,
      large_title: true,
    },
    excerpt: "Fallback excerpt",
    wordCount: { words: 500 },
    timeToRead: 5,
    fields: {
      taglist: ["tag1", "tag2"],
    },
  },
};

const mockLocation = { pathname: "/test-post" };

describe('Head export', () => {
  it('renders PageHead with correct props when frontmatter.excerpt and twitter_excerpt are provided', () => {
    render(<Head data={mockArticleData} />);
    const pageHead = screen.getByTestId("pagehead");
    expect(pageHead).toHaveAttribute("data-title", "Test Post Title");
    expect(pageHead).toHaveAttribute("data-description", "Test excerpt");
    expect(pageHead).toHaveAttribute("data-tweet", "Twitter excerpt");
    expect(pageHead).toHaveAttribute("data-type", "article");
  });

  it('falls back to markdownRemark.excerpt when frontmatter.excerpt is missing', () => {
    // Remove frontmatter.excerpt and twitter_excerpt
    const dataWithoutExcerpt = {
      markdownRemark: {
        ...mockArticleData.markdownRemark,
        frontmatter: {
          ...mockArticleData.markdownRemark.frontmatter,
          excerpt: undefined,
          twitter_excerpt: "",
        },
      },
    };
    render(<Head data={dataWithoutExcerpt} />);
    const pageHead = screen.getByTestId("pagehead");
    // Expect that the fallback value "Fallback excerpt" is used for both description and tweet.
    expect(pageHead).toHaveAttribute("data-description", "Fallback excerpt");
    expect(pageHead).toHaveAttribute("data-tweet", "Fallback excerpt");
  });

  it('falls back to empty string when both frontmatter.excerpt and markdownRemark.excerpt are missing', () => {
    // Remove frontmatter.excerpt and markdownRemark.excerpt
    const dataWithoutExcerpt = {
      markdownRemark: {
        ...mockArticleData.markdownRemark,
        frontmatter: {
          ...mockArticleData.markdownRemark.frontmatter,
          excerpt: undefined,
        },
        excerpt: "",
      },
    };
    render(<Head data={dataWithoutExcerpt} />);
    const pageHead = screen.getByTestId("pagehead");
    // Expect that the fallback value "" is used for description.
    expect(pageHead).toHaveAttribute("data-description", "");
  });
});

describe('Article template tests', () => {
  it('renders Layout with correct props and children', () => {
    const { container } = render(<Template data={mockArticleData} location={mockLocation} />);
    const layout = screen.getByTestId("layout");
    expect(layout).toBeInTheDocument();

    // check that the layout gets html content as children
    expect(layout).toContainHTML("<p>Test HTML content</p>");

    // check that a section with class content is rendered with the HTML content
    const content = container.querySelector("section.content");
    expect(content).toBeInTheDocument();
    expect(content).toContainHTML("<p>Test HTML content</p>");
  });

  it('handles missing fields gracefully when rendering', () => {
    // Remove fields from mock data
    const dataWithoutFields = {
      markdownRemark: {
        ...mockArticleData.markdownRemark,
        fields: undefined,
      },
    };
    render(<Template data={dataWithoutFields} location={mockLocation} />);
    expect(screen.getByText("Test HTML content")).toBeInTheDocument();
    // Expect that the taglist is empty
    expect(screen.queryByText("tag1")).not.toBeInTheDocument();
    expect(screen.queryByText("tag2")).not.toBeInTheDocument();
  });

  it('handles missing tags gracefully when rendering', () => {
    // Remove taglist from fields
    const dataWithoutTags = {
      markdownRemark: {
        ...mockArticleData.markdownRemark,
        fields: {
          taglist: undefined,
        },
      },
    };
    render(<Template data={dataWithoutTags} location={mockLocation} />);
    expect(screen.getByText("Test HTML content")).toBeInTheDocument();
    // Expect that the taglist is empty
    expect(screen.queryByText("tag1")).not.toBeInTheDocument();
    expect(screen.queryByText("tag2")).not.toBeInTheDocument();
  });
});
