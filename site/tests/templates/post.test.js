import React from 'react';
import { render, screen } from '@testing-library/react';
import Template, { Head } from '../../src/templates/post';
import { useStaticQuery } from 'gatsby';

// we use this due to the mocks and we have proper definitions elsewhere
/* eslint-disable react/prop-types, react/display-name */

jest.mock('../../src/components/footer', () => () => <nav data-testid="footer">Footer Mock</nav>);

// Mock sub-components so that you can inspect their props and rendered output.
jest.mock('../../src/components/page-head', () => (props) => {
  return (
    <div
      data-testid="pagehead"
      data-title={props.title}
      data-description={props.description}
      data-image={props.image}
      data-tweet={props.tweet}
      data-readingtime={props.readingTime}
      data-words={props.words}
    >
      Page Head Mock
    </div>
  );
});

// --- Setup our dummy site metadata for useStaticQuery ---
const dummySiteMetadata = {
  defaultTitle: 'Default Title',
  description: 'Default Description',
  author: 'Test Author',
  siteUrl: 'http://example.com',
};

// Mock useStaticQuery so that PageHead and Template get our dummy site metadata.
beforeAll(() => {
  useStaticQuery.mockReturnValue({
    site: { siteMetadata: dummySiteMetadata },
  });
});

// --- Dummy location ---
const dummyLocation = {
  pathname: '/2021/08/05/test-post/',
};

describe('Post.js Template', () => {

  let dummyHeadData;

  beforeEach(() => {
    // reset the dummy head data before each test.
    dummyHeadData = {
      markdownRemark: {
        frontmatter: {
          title: 'Test Head Post Title',
          excerpt: 'Test Head excerpt.',
          twitter_excerpt: 'Test Head Twitter excerpt.',
          featureimage: 'dummyFeatureImageData',
        },
        timeToRead: 5,
        wordCount: { words: 500 },
      },
    };
  });



  describe('Head meta info export', () => {
    it('renders Head with the correct props', () => {
      render(<Head data={dummyHeadData} pageContext={{}} />);

      // Check that the PageHead component rendered with the correct props.
      const pageHead = screen.getByTestId('pagehead');
      expect(pageHead).toBeInTheDocument();
      expect(pageHead).toHaveAttribute('data-title', 'Test Head Post Title');
      expect(pageHead).toHaveAttribute('data-description', 'Test Head excerpt.');
      expect(pageHead).toHaveAttribute('data-image', 'dummyFeatureImageData');
      expect(pageHead).toHaveAttribute('data-tweet', 'Test Head Twitter excerpt.');
      expect(pageHead).toHaveAttribute('data-readingtime', '5');
      expect(pageHead).toHaveAttribute('data-words', '500');
    });

    it('handles excerpt on markdownRemark instead of frontmatter', () => {
      // Add excerpt to markdownRemark instead of frontmatter.
      const dummyHeadDataWithExcerpt = {
        markdownRemark: {
          ...dummyHeadData.markdownRemark,
          excerpt: 'Test Head excerpt from markdownRemark.',
        },
      };

      delete dummyHeadDataWithExcerpt.markdownRemark.frontmatter.excerpt;

      render(<Head data={dummyHeadDataWithExcerpt} pageContext={{}} />);

      // Check that the PageHead component rendered with the correct props.
      const pageHead = screen.getByTestId('pagehead');
      expect(pageHead).toBeInTheDocument();
      expect(pageHead).toHaveAttribute('data-description', 'Test Head excerpt from markdownRemark.');
    });

    it('handles missing excerpt', () => {
      // Remove excerpt from frontmatter and markdownRemark.
      const dummyHeadDataWithoutExcerpt = {
        markdownRemark: {
          ...dummyHeadData.markdownRemark,
        },
      };

      delete dummyHeadDataWithoutExcerpt.markdownRemark.frontmatter.excerpt;
      delete dummyHeadDataWithoutExcerpt.markdownRemark.excerpt;

      render(<Head data={dummyHeadDataWithoutExcerpt} pageContext={{}} />);

      // Check that the PageHead component rendered with the correct props.
      const pageHead = screen.getByTestId('pagehead');
      expect(pageHead).toBeInTheDocument();
      expect(pageHead).toHaveAttribute('data-description', '');
    });

    it('handles missing twitter_excerpt by using excerpt', () => {
      // Remove twitter_excerpt from frontmatter.
      const dummyHeadDataWithoutTwitterExcerpt = {
        markdownRemark: {
          ...dummyHeadData.markdownRemark,
        },
      };

      delete dummyHeadDataWithoutTwitterExcerpt.markdownRemark.frontmatter.twitter_excerpt;

      render(<Head data={dummyHeadDataWithoutTwitterExcerpt} pageContext={{}} />);

      // Check that the PageHead component rendered with the correct props.
      const pageHead = screen.getByTestId('pagehead');
      expect(pageHead).toBeInTheDocument();
      expect(pageHead).toHaveAttribute('data-description', 'Test Head excerpt.');
      expect(pageHead).toHaveAttribute('data-tweet', 'Test Head excerpt.');
    });

    it('handles missing featureimage', () => {
      // Remove featureimage from frontmatter.
      const dummyHeadDataWithoutFeatureImage = {
        markdownRemark: {
          ...dummyHeadData.markdownRemark,
        },
      };

      delete dummyHeadDataWithoutFeatureImage.markdownRemark.frontmatter.featureimage;

      render(<Head data={dummyHeadDataWithoutFeatureImage} pageContext={{}} />);

      // Check that the PageHead component rendered with the correct props.
      const pageHead = screen.getByTestId('pagehead');
      expect(pageHead).toBeInTheDocument();
      expect(pageHead).toHaveAttribute('data-image', '');
    });

  });

  describe('Template export', () => {

    let dummyTemplateData;

    beforeEach(() => {
      // reset the dummy data before each test.
      dummyTemplateData = {
        markdownRemark: {
          frontmatter: {
            title: 'Test Post Title',
            date: "2021-08-05T00:00:00.000Z",
            excerpt: 'Test excerpt.',
            slug: 'test-post',
            small_title: false,
            large_title: true,
            featureimage: 'dummyFeatureImageData',
            imageby: 'Photographer Name',
            imagelink: 'http://example.com/image-link',
          },
          fields: {
            taglist: ['tag1', 'tag2'],
            excerpt: 'Fallback excerpt from fields.',
          },
          html: '<p>Test HTML content</p>',
          related: {
            post_similarity: [
              // Provide one or two dummy related posts (if needed)
              { post: { frontmatter: { slug: 'related-1', title: 'Related 1', date: '2021-07-01', excerpt: 'Excerpt 1', listimage_position: '50% 50%', listimage: 'dummyRelatedImage1' } } },
              { post: { frontmatter: { slug: 'related-2', title: 'Related 2', date: '2021-06-01', excerpt: 'Excerpt 2', listimage_position: '50% 50%', listimage: 'dummyRelatedImage2' } } },
            ],
          },
          timeToRead: 6,
          wordCount: { words: 600 },
        },
      };
    });

    it('renders Layout with the correct props and content', () => {
      // Spy on console.error to suppress and capture output if needed.
      // This is because of CSS container query parsing in RTL
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Render the Template component with dummy data and location.
      render(<Template data={dummyTemplateData} location={dummyLocation} />);

      // check that the Layout component rendered HTML content.
      const contentSection = document.querySelector('section.content');
      expect(contentSection).toBeInTheDocument();
      expect(contentSection.innerHTML).toBe(dummyTemplateData.markdownRemark.html);

      // check that the only error warning is due to CSS
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy.mock.calls[0][0].type).toMatch(/css parsing/i);
      // Restore console.error.
      consoleErrorSpy.mockRestore();
    });

    it('renders layout even if featureimage is missing', () => {
      // Remove featureimage from frontmatter.
      const dummyTemplateDataWithoutFeatureImage = {
        markdownRemark: {
          ...dummyTemplateData.markdownRemark,
        },
      };

      delete dummyTemplateDataWithoutFeatureImage.markdownRemark.frontmatter.featureimage;

      // Spy on console.error to suppress and capture output if needed.
      // This is because of CSS container query parsing in RTL
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Render the Template component with dummy data and location.
      render(<Template data={dummyTemplateDataWithoutFeatureImage} location={dummyLocation} />);

      // check that the Layout component rendered HTML content.
      const contentSection = document.querySelector('section.content');
      expect(contentSection).toBeInTheDocument();
      expect(contentSection.innerHTML).toBe(dummyTemplateData.markdownRemark.html);

      // check that the only error warning is due to CSS
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy.mock.calls[0][0].type).toMatch(/css parsing/i);
      // Restore console.error.
      consoleErrorSpy.mockRestore();
    });


  });
});

