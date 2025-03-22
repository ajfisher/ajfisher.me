import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Template, { Head } from '../../src/templates/post-list';
import { useStaticQuery } from 'gatsby';

// we use this due to the mocks and we have proper definitions elsewhere
/* eslint-disable react/prop-types, react/display-name */

// Mock sub-components so that you can inspect their props and rendered output.
jest.mock('../../src/components/footer', () => () => <footer data-testid="footer">Footer Mock</footer>);
jest.mock('../../src/components/nav', () => () => <nav data-testid="nav">Footer Mock</nav>);

jest.mock('../../src/components/page-head', () => (props) => {
  return (
    <div
      data-testid="pagehead"
      data-title={props.title}
      data-description={props.description}
      data-type={props.type}
    >
      Page Head Mock
    </div>
  );
});

jest.mock('../../src/components/pagination', () => ({
  Paginate: ({ basepath, currentpage, numpages }) => (
    <div
      data-testid="paginate"
      data-basepath={basepath}
      data-currentpage={currentpage}
      data-numpages={numpages}
    />
  )
}));

jest.mock('../../src/components/list', () => ({
  ListItems: ({ children }) => <ul data-testid="listitems">{children}</ul>,
  PostListItem: ({ title, slug }) => (
    <li data-testid={"postlistitem_" + slug}>
      {title} - {slug}
    </li>
  )
}));

jest.mock('../../src/components/header', () => (props) => {
  return (
    <div
      data-testid="header"
      data-title={props.title}
      data-excerpt={props.excerpt}
      data-smalltitle={props.smalltitle}
      data-largetitle={props.largetitle}
    />
  );
});


// Setup our dummy site metadata for useStaticQuery ---
const dummySiteMetadata = {
  defaultTitle: 'Default Title',
  description: 'Default Description',
  author: 'Test Author',
  siteUrl: 'http://example.com',
};

const mockData = {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          id: '1',
          frontmatter: {
            slug: 'post-1',
            title: 'Post 1',
            date: '2021-08-05',
            excerpt: 'Excerpt 1',
            featured: false,
            listimage: { childImageSharp: { gatsbyImageData: {} } },
            listimage_position: 'center',
            small_title: false,
            large_title: false
          },
          excerpt: 'Post 1 excerpt',
          wordCount: { words: 100 },
          timeToRead: 5
        }
      },
      {
        node: {
          id: '2',
          frontmatter: {
            slug: 'post-2',
            title: 'Post 2',
            date: '2021-08-04',
            excerpt: 'Excerpt 2',
            featured: true,
            listimage: { childImageSharp: { gatsbyImageData: {} } },
            listimage_position: 'left',
            small_title: false,
            large_title: false
          },
          excerpt: 'Post 2 excerpt',
          wordCount: { words: 150 },
          timeToRead: 7
        }
      },
      {
        node: {
          id: '3',
          frontmatter: {
            slug: 'post-3',
            title: 'Post 3',
            date: '2021-08-03',
            featured: false,
            listimage: { childImageSharp: { gatsbyImageData: {} } },
            listimage_position: 'right',
            small_title: false,
            large_title: false
          },
          excerpt: 'Post 3 excerpt',
          wordCount: { words: 200 },
          timeToRead: 8
        }
      }
    ]
  }
};

// Set the pageContext with currentPage = 2 and numPages = 3.
const mockPageContext = { currentPage: 2, numPages: 3 };

describe('Archive template head tests', () => {
  // Mock useStaticQuery so that PageHead and Template get our dummy site metadata.
  beforeAll(() => {
    useStaticQuery.mockReturnValue({
      site: { siteMetadata: dummySiteMetadata },
    });
  });

  it('renders Head with the correct SEO props', () => {
    render(<Head data={{}} pageContext={{ currentPage: 2 }} />);

      const pageHead = screen.getByTestId('pagehead');
      expect(pageHead).toBeInTheDocument();
      expect(pageHead).toHaveAttribute('data-title', 'Article archive - page 2');
      expect(pageHead).toHaveAttribute('data-description', 'Article archive page 2 from ajfisher.me');
      expect(pageHead).toHaveAttribute('data-type', 'list');
  });
});

describe('Archive template post rendering tests', () => {
  // Mock useStaticQuery so that PageHead and Template get our dummy site metadata.
  beforeAll(() => {
    useStaticQuery.mockReturnValue({
      site: { siteMetadata: dummySiteMetadata },
    });
  });

  it('renders the correct page title', () => {
    render(<Template pageContext={mockPageContext} data={mockData} />);

    const pageTitle = screen.getByRole('heading', { name: /Article archive - page 2/i });
    expect(pageTitle).toBeInTheDocument();
  });

  it('renders the correct number of posts', () => {
    render(<Template pageContext={mockPageContext} data={mockData} />);

    const postList = screen.getByTestId('listitems');
    expect(postList).toBeInTheDocument();
    expect(postList.children).toHaveLength(2);
  });

  it('elevates the featured post out of the list', () => {
    render(<Template pageContext={mockPageContext} data={mockData} />);

    const postList = screen.getByTestId('listitems');
    expect(postList).toBeInTheDocument();
    expect(postList.children).toHaveLength(2);

    const post1 = within(postList).getByText('Post 1 - post-1');
    expect(post1).toBeInTheDocument();

    const post3 = within(postList).getByText('Post 3 - post-3');
    expect(post3).toBeInTheDocument();

    // Post 2 should not be in the list.
    const post2 = within(postList).queryByText('Post 2 - post-2');
    expect(post2).toBeNull();

    // check that the featured post is now in the header.
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('data-title', 'Post 2');

  });

  it('elevates the first post when none are featured', () => {

    // remove the featured flag from the second post.
    const noFeatureData = { ...mockData };
    noFeatureData.allMarkdownRemark.edges[1].node.frontmatter.featured = false;

    render(<Template pageContext={mockPageContext} data={noFeatureData} />);

    const postList = screen.getByTestId('listitems');
    expect(postList).toBeInTheDocument();
    expect(postList.children).toHaveLength(2);

    const post2 = within(postList).getByText('Post 2 - post-2');
    expect(post2).toBeInTheDocument();

    const post3 = within(postList).getByText('Post 3 - post-3');
    expect(post3).toBeInTheDocument();

    // check that the first post is now in the header.
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('data-title', 'Post 1');

  });

  it('renders the correct pagination data', () => {
    render(<Template pageContext={mockPageContext} data={mockData} />);

    const paginate = screen.getByTestId('paginate');
    expect(paginate).toBeInTheDocument();
    expect(paginate).toHaveAttribute('data-basepath', '/blog');
    expect(paginate).toHaveAttribute('data-currentpage', '2');
    expect(paginate).toHaveAttribute('data-numpages', '3');
  });
});












