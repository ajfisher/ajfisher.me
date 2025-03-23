import React from 'react';
import { render } from '@testing-library/react';
import PageHead from '../src/components/page-head';
import { useStaticQuery } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';

describe('PageHead Component', () => {
  const siteMetadata = {
    defaultTitle: 'Default Title',
    description: 'Default description',
    author: 'Author Name',
    siteUrl: 'https://example.com'
  };

  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      site: { siteMetadata }
    });
    getSrc.mockReset();
  });

  it('renders a title tag with combined title', () => {
    render(<PageHead title="Custom Title" />, {container: document.head});
    const titleTag = document.querySelector('title');
    expect(titleTag).toBeInTheDocument();
    expect(titleTag.textContent).toBe('Custom Title | Default Title');
  });

  it('renders site default title if no title prop is provided', () => {
    render(<PageHead />);
    const titleTag = document.querySelector('title');
    expect(titleTag).toBeInTheDocument();
    expect(titleTag.textContent).toBe('Default Title');
  });

  it('renders default meta tags when no additional props are provided', () => {
    render(<PageHead title="Custom Title" />);
    // Check meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc).toBeInTheDocument();
    expect(metaDesc.getAttribute('content')).toBe('Default description');
    // Check og:title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toBeInTheDocument();
    expect(ogTitle.getAttribute('content')).toBe('Custom Title');
    // Check og:type (defaults to the type prop, which by default is
    // 'post' and then overridden to website? In our code, seo.pageType
    // becomes type || `website`)
    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType).toBeInTheDocument();
    expect(ogType.getAttribute('content')).toBe('post');
  });

  it('uses tweet prop for twitter:description if provided', () => {
    render(<PageHead title="Custom Title" tweet="Tweet description" />);
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    expect(twitterDesc).toBeInTheDocument();
    expect(twitterDesc.getAttribute('content')).toBe('Tweet description');
  });

  it('adds image meta tags when image prop is provided', () => {
    const dummyImage = { dummy: 'data' };
    getSrc.mockReturnValue('/dummy-image.jpg');

    render(<PageHead title="Custom Title" image={dummyImage} />);
    const expectedUrl = 'https://example.com/dummy-image.jpg';
    const ogImage = document.querySelector('meta[property="og:image"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    expect(ogImage).toBeInTheDocument();
    expect(ogImage.getAttribute('content')).toBe(expectedUrl);
    expect(twitterImage).toBeInTheDocument();
    expect(twitterImage.getAttribute('content')).toBe(expectedUrl);
  });

  it('renders no image meta tags if image prop is not provided', () => {
    render(<PageHead title="Custom Title" />);
    const ogImage = document.querySelector('meta[property="og:image"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    expect(ogImage).not.toBeInTheDocument();
    expect(twitterImage).not.toBeInTheDocument();
  });

  it('adds twitter meta tags for readingTime when provided', () => {
    render(<PageHead title="Custom Title" readingTime={4.3} />);
    const label1 = document.querySelector('meta[name="twitter:label1"]');
    const data1 = document.querySelector('meta[name="twitter:data1"]');
    expect(label1).toBeInTheDocument();
    expect(label1.getAttribute('content')).toBe('Reading Time');
    expect(data1).toBeInTheDocument();
    // 4.3 should be ceiled to 5
    expect(data1.getAttribute('content')).toBe('5 minutes');
  });

  it('adds twitter meta tags for words when provided', () => {
    render(<PageHead title="Custom Title" words={350} />);
    const label2 = document.querySelector('meta[name="twitter:label2"]');
    const data2 = document.querySelector('meta[name="twitter:data2"]');
    expect(label2).toBeInTheDocument();
    expect(label2.getAttribute('content')).toBe('Words');
    expect(data2).toBeInTheDocument();
    expect(data2.getAttribute('content')).toBe('350');
  });

  it('concatenates additional meta props to the default meta', () => {
    const extraMeta = [{ name: 'custom-meta', content: 'custom' }];
    render(<PageHead title="Custom Title" meta={extraMeta} />);
    const customMeta = document.querySelector('meta[name="custom-meta"]');
    expect(customMeta).toBeInTheDocument();
    expect(customMeta.getAttribute('content')).toBe('custom');
  });

  it('renders no reading time if non number is provided', () => {
    // Spy on console.error and suppress output for this test.
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<PageHead title="Custom Title" readingTime="text" />);

    // Check that a PropTypes error was logged (the exact text may vary)
    expect(consoleErrorSpy).toHaveBeenCalled();
    // check that the error message contains a specific substring:
    expect(consoleErrorSpy.mock.calls[0][2]).toMatch(/Invalid prop `readingTime` of type `string`/i);

    const data1 = document.querySelector('meta[name="twitter:data1"]');
    expect(data1).not.toBeInTheDocument();

    // Restore the original console.error after the test.
    consoleErrorSpy.mockRestore();
  });

  it('renders no words if non number is provided', () => {
    // Spy on console.error and suppress output for this test.
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<PageHead title="Custom Title" words="text" />);

    // Check that a PropTypes error was logged (the exact text may vary)
    expect(consoleErrorSpy).toHaveBeenCalled();
    // check that the error message contains a specific substring:
    expect(consoleErrorSpy.mock.calls[0][2]).toMatch(/Invalid prop `words` of type `string`/i);

    // Verify that the subcomponent (meta tag) is not rendered.
    const data2 = document.querySelector('meta[name="twitter:data2"]');
    expect(data2).not.toBeInTheDocument();

    // Restore the original console.error after the test.
    consoleErrorSpy.mockRestore();
  });

});

