import React from 'react';
import { render, screen } from '@testing-library/react';
import Template, { Head } from '../../src/templates/tags';
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
    >
      Page Head Mock
    </div>
  );
});

const samplePostsMultiple = {
  posts: {
    edges: [
      {
        node: {
          id: '1',
          frontmatter: {
            title: 'Test Post 1',
            date: '2021-08-05T00:00:00.000Z',
            excerpt: 'Test excerpt 1',
            slug: 'test-post-1',
            listimage: { childImageSharp: { gatsbyImageData: {} } },
          },
          wordCount: {
            words: 100,
          },
          timeToRead: 5,
        },
      },
      {
        node: {
          id: '2',
          frontmatter: {
            title: 'Test Post 2',
            date: '2021-08-06T00:00:00.000Z',
            slug: 'test-post-2',
            listimage: { childImageSharp: { gatsbyImageData: {} } },
          },
          wordCount: {
            words: 150,
          },
          timeToRead: 5,
          excerpt: 'Test excerpt 2',
        },
      },
    ],
  },
  tagdata: {
    tag: 'tech',
    title: 'Technology',
    intro: 'Tech intro',
    tagimage: { childImageSharp: { gatsbyImageData: {} } },
  },
};

const samplePostsSingle = {
  posts: {
    edges: [
      {
        node: {
          id: '1',
          frontmatter: {
            title: 'Test Post 1',
            date: '2021-08-05T00:00:00.000Z',
            excerpt: 'Test excerpt 1',
            slug: 'test-post-1',
            listimage: { childImageSharp: { gatsbyImageData: {} } },
          },
          wordCount: {
            words: 100,
          },
          timeToRead: 5,
        },
      },
    ],
  },
  tagdata: {
    tag: 'tech',
    title: 'Technology',
    intro: 'Tech intro',
    tagimage: { childImageSharp: { gatsbyImageData: {} } },
  },
};

// Setup our dummy site metadata for useStaticQuery ---
const dummySiteMetadata = {
  defaultTitle: 'Default Title',
  description: 'Default Description',
  author: 'Test Author',
  siteUrl: 'http://example.com',
};

describe('Tags template head tests', () => {
  // Mock useStaticQuery so that PageHead and Template get our dummy site metadata.
  beforeAll(() => {
    useStaticQuery.mockReturnValue({
      site: { siteMetadata: dummySiteMetadata },
    });
  });

  it('renders Head with the correct title', () => {
    render(<Head data={samplePostsMultiple}
      pageContext={samplePostsMultiple.tagdata} />);

    const { tag, title } = samplePostsMultiple.tagdata;

    // Check that the PageHead component rendered with the correct props.
    const pageHead = screen.getByTestId('pagehead');
    expect(pageHead).toBeInTheDocument();
    expect(pageHead).toHaveAttribute('data-title', `${title} tagged posts`);
    expect(pageHead).toHaveAttribute('data-description',
      `Posts that are tagged ${tag} on ajfisher.me`);
  });
});

describe('Tags Template', () => {
  // Mock useStaticQuery so that PageHead and Template get our dummy site metadata.
  beforeAll(() => {
    useStaticQuery.mockReturnValue({
      site: { siteMetadata: dummySiteMetadata },
    });
  });

  it('renders multiple posts with correct data', () => {
    // Spy on console.error to suppress and capture output if needed.
    // This is because of CSS container query parsing in RTL
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Template data={samplePostsMultiple}
      pageContext={samplePostsMultiple.tagdata}
    />);
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Tech intro')).toBeInTheDocument();
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();

    // check that the only error warning is due to CSS
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0].type).toMatch(/css parsing/i);
    // Restore console.error.
    consoleErrorSpy.mockRestore();
  });

  it('renders single post with correct data', () => {
    render(<Template data={samplePostsSingle}
      pageContext={samplePostsSingle.tagdata}
    />);
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Tech intro')).toBeInTheDocument();
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
  });

  it('renders the tag as the title if no title is provided', () => {
    const removedTitlePosts = { ...samplePostsSingle };
    delete removedTitlePosts.tagdata.title;
    render(<Template data={removedTitlePosts}
      pageContext={removedTitlePosts.tagdata}
    />);
    expect(screen.getByText('tech')).toBeInTheDocument();
  });

  it('does not render an intro if none is provided', () => {
    const removedIntroPosts = { ...samplePostsSingle };
    delete removedIntroPosts.tagdata.intro;
    render(<Template data={removedIntroPosts}
      pageContext={removedIntroPosts.tagdata}
    />);
    expect(screen.queryByText('Tech intro')).not.toBeInTheDocument();
  });

  it('does not render an image if none is provided', () => {
    const removedImagePosts = { ...samplePostsSingle };
    delete removedImagePosts.tagdata.tagimage;
    render(<Template data={removedImagePosts}
      pageContext={removedImagePosts.tagdata}
    />);
    expect(screen.queryByAltText('Technology')).not.toBeInTheDocument();
  });
});
