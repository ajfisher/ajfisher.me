import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../src/components/post-layout';
import { useStaticQuery } from 'gatsby';

// Stub the child components so you can inspect the props that Layout passes in.
jest.mock('../src/components/header', () => (props) => (
  <div
    data-testid="header"
    data-title={props.title}
    data-excerpt={props.excerpt}
    data-smalltitle={props.smalltitle}
    data-largetitle={props.largetitle}
  />
));


jest.mock('../src/components/article', () => ({
  PostArticle: (props) => (
    <div data-testid="post-article" {...props}>
      {props.children}
    </div>
  ),
}));

jest.mock('../src/components/postdata', () => (props) => (
  <div data-testid="post-data" {...props} />
));

jest.mock('../src/components/nav', () => () => <div data-testid="nav" />);

jest.mock('../src/components/footer', () => (props) => (
  <div data-testid="footer" {...props} />
));

// Since post-layout.js imports Main and Aside from the layout file,
// we can stub those too
jest.mock('../src/components/layout', () => ({
  Main: (props) => <main data-testid="main" {...props} />,
  Aside: (props) => <aside data-testid="aside" {...props} />,
}));

// Provide a dummy site metadata via useStaticQuery.
beforeEach(() => {
  useStaticQuery.mockReturnValue({
    site: {
      siteMetadata: {
        siteUrl: 'https://example.com',
      },
    },
  });
});

describe('PostLayout Component', () => {
  const frontmatter = {
    title: 'Test Post',
    date: '2021-08-05T00:00:00.000Z',
    excerpt: 'Test excerpt',
    slug: 'test-post',
    small_title: true,
    large_title: false,
    imageby: 'Test Image By',
    imagelink: 'https://example.com/image-link',
    featured: true,
    featureimage: 'dummyFeatureImage',
    tagimage: null,
    postcount: 5,
  };

  const defaultProps = {
    frontmatter,
    featuredimage: frontmatter.featureimage,
    path: '/test-post/',
    readingTime: 5,
    wordCount: { words: 500 },
    tags: ['tag1', 'tag2'],
    relatedposts: [
      {
        post: {
          frontmatter: {
            slug: 'related-1',
            title: 'Related 1',
            date: '2021-08-04',
            listimage: 'img1',
            listimage_position: '50%',
          },
        },
      },
      {
        post: {
          frontmatter: {
            slug: 'related-2',
            title: 'Related 2',
            date: '2021-08-03',
            listimage: 'img2',
            listimage_position: '50%',
          },
        },
      },
    ],
    children: <div data-testid="content">Content here</div>,
    slug: 'test-post',
  };

  it('renders the layout and passes correct props to child components', () => {
    render(<Layout {...defaultProps} />);

    // Check that the Header received the correct props.
    const header = screen.getByTestId('header');
    expect(header).toHaveAttribute('data-title', frontmatter.title);
    expect(header).toHaveAttribute('data-excerpt', frontmatter.excerpt);
    expect(header).toHaveAttribute('data-smalltitle', 'true');
    expect(header).toHaveAttribute('data-largetitle', 'false');

    // Check that PostArticle receives the computed URL.
    const expectedUrl = 'https://example.com/test-post/';
    const postArticle = screen.getByTestId('post-article');
    expect(postArticle).toHaveAttribute('url', expectedUrl);
    // Also check that children are rendered inside PostArticle.
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Check that Aside contains PostData and Nav.
    const aside = screen.getByTestId('aside');
    expect(aside).toContainElement(screen.getByTestId('post-data'));
    expect(aside).toContainElement(screen.getByTestId('nav'));

    // Check that Footer is rendered with the correct slug.
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveAttribute('slug', frontmatter.slug);
  });

  it('defaults small_title and large_title to false when not provided', () => {
    const frontmatterMissing = { ...frontmatter };
    delete frontmatterMissing.small_title;
    delete frontmatterMissing.large_title;
    render(<Layout {...defaultProps} frontmatter={frontmatterMissing} />);
    const header = screen.getByTestId("header");
    // Destructuring in Layout defaults them to false.
    expect(header).toHaveAttribute('data-smalltitle', 'false');
    expect(header).toHaveAttribute('data-largetitle', 'false');
  });

  it('handles layout when tags not provided', () => {
    const props = { ...defaultProps };
    delete props.tags;
    render(<Layout {...props} />);
    // Check that PostData is still rendered.
    expect(screen.getByTestId('post-data')).toBeInTheDocument();
  });

});
