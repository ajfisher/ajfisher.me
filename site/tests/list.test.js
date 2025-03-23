// list.test.js
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { ListItems, PostListItem, RelatedListItem } from '../src/components/list';
import moment from 'moment';
import { pathDate } from '../src/lib/utils';

describe('ListItems Container', () => {
  it('renders its children correctly', () => {
    const { container } = render(
      <ListItems>
        <li>Item 1</li>
        <li>Item 2</li>
      </ListItems>
    );
    expect(container).toHaveTextContent("Item 1");
    expect(container).toHaveTextContent("Item 2");
  });
});

describe('PostListItem Component', () => {
  const defaultProps = {
    title: "Test Post",
    image: "dummyImageData",
    position: "50% 50%",
    excerpt: "This is a test excerpt.",
    date: "2021-01-01",
    slug: "test-post",
    readingtime: 7.3, // should be ceiled to 8
    wordcount: 350,   // mock returns "350"
  };

  it('renders correctly when an image is provided', () => {
    // Spy on console.error to suppress and capture output if needed.
    // This is because of CSS container query parsing in RTL
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<PostListItem {...defaultProps} />);

    const expectedUrl = `/${pathDate(defaultProps.date)}/${defaultProps.slug}/`;
    // Verify both the image link and the title link use the same URL.
    const links = screen.getAllByRole("link", { name: "Test Post" });
    links.forEach(link => {
      expect(link.getAttribute("href")).toBe(expectedUrl);
    });
    // GatsbyImage should be rendered
    expect(screen.getByTestId("gatsby-image")).toBeInTheDocument();
    // Verify that the date is rendered correctly (using moment)
    const expectedDate = moment(defaultProps.date).format("dddd, MMMM Do YYYY");
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
    // Verify the reading time string (7.3 -> 8 min)
    const expectedReadingTime = `8 min (350 words).`;
    expect(screen.getByText(expectedReadingTime)).toBeInTheDocument();
    // Excerpt should be rendered
    expect(screen.getByText("This is a test excerpt.")).toBeInTheDocument();

    // check that the only error warning is due to CSS
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0].type).toMatch(/css parsing/i);
    // Restore console.error.
    consoleErrorSpy.mockRestore();
  });

  it('renders a placeholder image when image prop is empty', () => {
    // Force a specific branch in ListItemPlaceholderImage by controlling Math.random.
    // To hit case 1, we want: Math.floor(0.1 * 12) === 1.
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);
    render(<PostListItem {...defaultProps} image="" />);
    // Expect that a static image (placeholder) is rendered.
    // Our mock for StaticImage renders an <img> with data-testid "static-image"
    expect(screen.getByTestId("static-image")).toBeInTheDocument();
    randomSpy.mockRestore();
  });

  it('does not render excerpt when excerpt is empty', () => {
    render(<PostListItem {...defaultProps} excerpt="" />);
    expect(screen.queryByText("This is a test excerpt.")).not.toBeInTheDocument();
  });
});

describe('RelatedListItem Component', () => {
  const defaultProps = {
    title: "Related Post",
    image: "dummyImageData",
    position: "50% 50%",
    date: "2021-01-01",
    slug: "related-post",
  };

  it('renders correctly when an image is provided', () => {
    render(<RelatedListItem {...defaultProps} />);
    const expectedUrl = `/${pathDate(defaultProps.date)}/${defaultProps.slug}/`;
    // Check that the Link wrapping the title has the correct URL.
    const links = screen.getAllByRole("link", { name: "Related Post" });
    links.forEach(link => {
      expect(link.getAttribute("href")).toBe(expectedUrl);
    });

    // GatsbyImage should be rendered for the image.
    expect(screen.getByTestId("gatsby-image")).toBeInTheDocument();
  });

  it('renders a placeholder image when image prop is empty', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);
    render(<RelatedListItem {...defaultProps} image="" />);
    // Expect a StaticImage (placeholder) to be rendered.
    expect(screen.getByTestId("static-image")).toBeInTheDocument();
    randomSpy.mockRestore();
  });
});

describe('Specifically test the random image selection for static images', () => {
  const defaultProps = {
    title: "Test Post",
    position: "50% 50%",
    excerpt: "This is a test excerpt.",
    date: "2021-01-01",
    slug: "test-post",
    readingtime: 7.3, // should be ceiled to 8
    wordcount: 350,   // mock returns "350"
  };

  const testCases = [
    { random: 0.0, expected: 'li0.png' },  // floor(0.0*12)=0 => default branch
    { random: 0.08, expected: 'li0.png' }, // any value < 1/12 ~0.0833 should give 0, so to be safe use 0.0.
    { random: 0.1, expected: 'li1.png' },  // floor(0.1*12)=1
    { random: 0.16, expected: 'li1.png' }, // still in [0.0833, 0.1667) would be case 1
    { random: 0.18, expected: 'li2.png' }, // floor(0.18*12)=2
    { random: 0.27, expected: 'li3.png' }, // floor(0.27*12)=3
    { random: 0.35, expected: 'li4.png' }, // floor(0.35*12)=4
    { random: 0.42, expected: 'li5.png' }, // floor(0.42*12)=5
    { random: 0.51, expected: 'li6.png' }, // floor(0.51*12)=6
    { random: 0.60, expected: 'li7.png' }, // floor(0.60*12)=7
    { random: 0.68, expected: 'li8.png' }, // floor(0.68*12)=8
    { random: 0.78, expected: 'li9.png' }, // floor(0.78*12)=9
    { random: 0.85, expected: 'li10.png' }, // floor(0.85*12)=10
    { random: 0.95, expected: 'li11.png' }, // floor(0.95*12)=11
  ];

  testCases.forEach(({ random, expected }) => {
    it(`selects the correct image for random value ${random}`, () => {
      const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(random);
      render(<PostListItem {...defaultProps} />);
      const staticImage = screen.getByTestId("static-image");

      // check does filename contain the expected value
      expect(staticImage.getAttribute("src")).toContain(expected);
      randomSpy.mockRestore();
      cleanup();
    });
  });

});

