// footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer, { PostItem } from '../src/components/footer';
import { useStaticQuery } from 'gatsby';

// we use this due to the mocks and we have proper definitions elsewhere
/* eslint-disable react/prop-types */

// Mock useStaticQuery for consistent data.
const defaultData = {
  responsiveDesign: {
    childImageSharp: { gatsbyImageData: 'responsiveDesignImage' },
  },
  jsRobotics: {
    childImageSharp: { gatsbyImageData: 'jsRoboticsImage' },
  },
  podcast: {
    childImageSharp: { gatsbyImageData: 'podcastImage' },
  },
  featuredPosts: {
    edges: [
      { node: { frontmatter: {
          title: 'Post 0',
          date: '2021-01-01',
          listimage: { childImageSharp: { gatsbyImageData: 'image0' } },
          listimage_position: 'pos0',
          excerpt: 'Excerpt 0',
          slug: 'post-0'
        } } },
      { node: { frontmatter: {
          title: 'Post 1',
          date: '2021-01-02',
          listimage: { childImageSharp: { gatsbyImageData: 'image1' } },
          listimage_position: 'pos1',
          excerpt: 'Excerpt 1',
          slug: 'post-1'
        } } },
      { node: { frontmatter: {
          title: 'Post 2',
          date: '2021-01-03',
          listimage: { childImageSharp: { gatsbyImageData: 'image2' } },
          listimage_position: 'pos2',
          excerpt: 'Excerpt 2',
          slug: 'podcast-enterprise-ai'
        } } },
      { node: { frontmatter: {
          title: 'Post 3',
          date: '2021-01-04',
          listimage: { childImageSharp: { gatsbyImageData: 'image3' } },
          listimage_position: 'pos3',
          excerpt: 'Excerpt 3',
          slug: 'post-3'
        } } },
    ],
  },
};

beforeEach(() => {
  // Provide the default data for each test.
  useStaticQuery.mockReturnValue(defaultData);
});

// Mock pathDate so featured URLs become predictable.
jest.mock('../lib/utils', () => ({
  pathDate: (_date) => '2021/01/01', // simple fixed return value for testing
}));

// Optionally, you can also mock OutboundLink if needed.
jest.mock('gatsby-plugin-google-analytics', () => ({
  OutboundLink: ({ href, children }) => <a href={href}>{children}</a>,
}));

describe('Footer Component', () => {
  it('renders all three sections with expected static content', () => {
    render(<Footer slug="random-slug" />);
    // Check section titles
    expect(screen.getByText('Featured Post')).toBeInTheDocument();
    expect(screen.getByText('Recent Media')).toBeInTheDocument();
    expect(screen.getByText('My Books')).toBeInTheDocument();
  });

  it('selects the default featured post when no slug conditions match', () => {
    // With slug not matching homepage or featured slug, featured remains featuredPosts[0]
    render(<Footer slug="random-slug" />);
    // Expect the featured post to be "Post 0" (default)
    expect(screen.getByText('Post 0')).toBeInTheDocument();
    // Optionally, check that the featured link’s href contains the expected slug
    const featuredLink = screen.getAllByRole('link', { name: 'Post 0' });
    expect(featuredLink.length).toBeGreaterThanOrEqual(1);
    // Check that at least one of the links is correct
    const matchingLink = featuredLink.find(link =>
      link.getAttribute('href').includes('post-0')
    );
    expect(matchingLink).toBeDefined();
  });

  it('selects the 4th featured post when slug is "/" (homepage)', () => {
    render(<Footer slug="/" />);
    // For homepage, featured becomes featuredPosts[3]
    expect(screen.getByText('Post 3')).toBeInTheDocument();
    const featuredLink = screen.getAllByRole('link', { name: 'Post 3' });
    // Verify that we found at least one link with the expected href
    expect(featuredLink.length).toBeGreaterThanOrEqual(1);
    // Check that at least one of the links is correct
    const matchingLink = featuredLink.find(link =>
      link.getAttribute('href').includes('post-3')
    );
    expect(matchingLink).toBeDefined();
  });

  it('selects the second featured post when current page matches the first featured post', () => {
    // If slug equals featuredPosts[0].slug ("post-0"), then featured becomes featuredPosts[1]
    render(<Footer slug="post-0" />);
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    const featuredLink = screen.getAllByRole('link', { name: 'Post 1' });
    // verify we found at least one link with the expected href
    expect(featuredLink.length).toBeGreaterThanOrEqual(1);
    // check on at least one of the links is correct
    const matchingLink = featuredLink.find(link =>
      link.getAttribute('href').includes('post-1')
    );
    expect(matchingLink).toBeDefined();
  });

  it('selects featuredPosts[2] when the first featured post slug is "podcast-enterprise-ai"', () => {
    const modifiedData = {
      ...defaultData,
      featuredPosts: {
        edges: [
          { node: { frontmatter: {
              title: 'Podcast Original',
              date: '2021-01-05',
              listimage: { childImageSharp: { gatsbyImageData: 'imageX' } },
              listimage_position: 'posX',
              excerpt: 'Excerpt X',
              slug: 'podcast-enterprise-ai'
            } } },
          ...defaultData.featuredPosts.edges.slice(1),
        ],
      },
    };
    useStaticQuery.mockReturnValue(modifiedData);
    render(<Footer slug="some-other-slug" />);
    expect(screen.getByText('Post 2')).toBeInTheDocument();
    const featuredLinks = screen.getAllByRole('link', { name: 'Post 2' });
    // Verify that we found two links, and at least one of them has the expected href
    expect(featuredLinks.length).toBeGreaterThanOrEqual(1);
    // You can check the first one, or iterate through them:
    const matchingLink = featuredLinks.find(link =>
      link.getAttribute('href').includes('podcast-enterprise-ai')
    );
    expect(matchingLink).toBeDefined();
  });

  it('renders the Recent Media section with proper links and description', () => {
    render(<Footer slug="random-slug" />);
    // Check for a Link in Recent Media section with the expected text
    expect(screen.getByText('ChatGPT and Generative AI in the enterprise')).toBeInTheDocument();
    // Check for description text
    expect(screen.getByText(/Sitting down with other technology leaders/)).toBeInTheDocument();
  });

  it('renders the My Books section with outbound links and images', () => {
    render(<Footer slug="random-slug" />);
    // Check for outbound links with expected book titles
    expect(screen.getByText('Make: JavaScript Robotics')).toBeInTheDocument();
    expect(screen.getByText('Jump Start Responsive Web Design')).toBeInTheDocument();
    // Optionally, verify that the OutboundLinks have the correct hrefs (if desired)
    expect(screen.getByText('Make: JavaScript Robotics').closest('a').getAttribute('href'))
      .toMatch(/amazon\.com\/JavaScript-Robotics/);
    expect(screen.getByText('Jump Start Responsive Web Design').closest('a').getAttribute('href'))
      .toMatch(/amazon\.com\/Jump-Start-Responsive-Web-Design/);
  });

});

describe('PostItem Component', () => {
  it('renders a PostItem with image, title, and excerpt', () => {
    render(<PostItem
      url="/2021/01/01/post-0/"
      title="Post 0"
      excerpt="Excerpt 0"
      image="image0"
      imagePosition="pos0"
    />);
    // Check for the title, excerpt, and image
    expect(screen.getByText('Post 0')).toBeInTheDocument();
    expect(screen.getByText('Excerpt 0')).toBeInTheDocument();
    expect(screen.getByAltText('Post 0')).toBeInTheDocument();
  });

  it('renders a PostItem correctly including conditional excerpt', () => {
    // When excerpt is non-empty, two paragraphs should be rendered.
    render(<PostItem
      url="/2021/01/01/post-0/"
      title="Post 0"
      excerpt="Excerpt 0"
      image="image0"
      imagePosition="pos0"
    />);
    expect(screen.getByText('Post 0')).toBeInTheDocument();
    expect(screen.getByText('Excerpt 0')).toBeInTheDocument();
  });

  it('defaults to / if url is not provided', () => {
    render(<PostItem
      title="Post 0"
      excerpt="Excerpt 0"
      image="image0"
      imagePosition="pos0"
    />);
    // Check that the link defaults to "/"
    const links = screen.getAllByRole('link', { name: 'Post 0' });
    links.forEach(link => expect(link.getAttribute('href')).toBe('/'));
  });

  it('defaults to / if url is an empty string', () => {
    render(<PostItem
      title="Post 0"
      excerpt="Excerpt 0"
      image="image0"
      imagePosition="pos0"
      url=""
    />);
    // Check that the link defaults to "/"
    const links = screen.getAllByRole('link', { name: 'Post 0' });
    links.forEach(link => expect(link.getAttribute('href')).toBe('/'));
  });
});
