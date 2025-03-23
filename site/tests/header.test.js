import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../src/components/header.js";
import { Title } from "../src/components/header.js";

describe("Header Component", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title correctly", () => {
    render(<Header title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("throws an error when title is not provided", () => {
    // Spy on console.error and suppress output for this test.
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<Header />)).toThrow('Header component requires a title prop');

    // Check that a PropTypes error was logged (the exact text may vary)
    expect(consoleErrorSpy).toHaveBeenCalled();

    // Restore the original console.error after the test.
    consoleErrorSpy.mockRestore();
  });

  it("renders with a link when URL is provided", () => {
    render(<Header title="Test Title with Link" url="/test-page" />);
    const link = screen.getByRole("link", { name: "Test Title with Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test-page");
  });

  it("renders featured post text when featured is true", () => {
    render(<Header title="Post Title" featured={true} />);
    expect(screen.getByText("Featured Post")).toBeInTheDocument();
    expect(screen.getByText("Featured Post", { selector: "p" })).toBeInTheDocument();
  });

  it("renders date when provided", () => {
    render(<Header title="Post with Date" date="2024-01-01" />);
    expect(screen.getByText(/Published:/)).toBeInTheDocument();
    expect(screen.getByText(/Mon, Jan 1st 2024/)).toBeInTheDocument();
  });

  it("renders excerpt when provided", () => {
    const excerpt = "This is a test excerpt for the post";
    render(<Header title="Post with Excerpt" excerpt={excerpt} />);
    expect(screen.getByText(excerpt)).toBeInTheDocument();
  });

  it("renders reading time and word count when provided", () => {
    // Spy on console.error to suppress and capture output if needed.
    // This is because of CSS container query parsing in RTL
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Header title="Post with Reading Stats" readingTime={5} wordCount={{ words: 1000 }} />);
    expect(screen.getByText(/5 min/)).toBeInTheDocument();
    expect(screen.getByText(/1000 words/)).toBeInTheDocument();

    // check that the only error warning is due to CSS
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0].type).toMatch(/css parsing/i);
    // Restore console.error.
    consoleErrorSpy.mockRestore();
  });

  it("renders featured image when provided", () => {
    const mockImage = { childImageSharp: { gatsbyImageData: {} } };
    render(<Header title="Post with Image" featuredimage={mockImage} featuredImageBy="Photographer Name" />);
    expect(screen.getByTestId("gatsby-image")).toBeInTheDocument();
    expect(screen.getByText("Photographer Name")).toBeInTheDocument();
  });

  it("renders post count for tag pages", () => {
    render(<Header title="Tag Page" postcount={5} />);
    expect(screen.getByText("Read 5 articles in this topic.")).toBeInTheDocument();
  });

  it("handles singular form of article count", () => {
    render(<Header title="Tag Page Single" postcount={1} />);
    expect(screen.getByText("Read 1 article in this topic.")).toBeInTheDocument();
  });

  it("renders title with 'shrink' class when smalltitle prop is true", () => {
    render(<Header title="Small Title" smalltitle={true} />);
    const titleEl = screen.getByText("Small Title");
    expect(titleEl.className).toMatch(/shrink/);
  });

  it("renders title with 'enlarge' class when largetitle prop is true", () => {
    render(<Header title="Large Title" largetitle={true} />);
    const titleEl = screen.getByText("Large Title");
    expect(titleEl.className).toMatch(/enlarge/);
  });

  it("prefers smalltitle over largetitle when both are true", () => {
    render(<Header title="Conflicting Title" smalltitle={true} largetitle={true} />);
    const titleEl = screen.getByText("Conflicting Title");
    expect(titleEl.className).toMatch(/shrink/);
  });

  it("applies default values (false) when smalltitle and largetitle are not provided", () => {
    const { container } = render(Title({ children: "Default Title", url: undefined }));
    // check that the rendered title does not have the 'shrink' or 'enlarge' className
    expect(container.firstChild.className).not.toMatch(/shrink|enlarge/);
  });

  it("renders tag image when provided and featuredimage is null", () => {
    const mockImage = { childImageSharp: { gatsbyImageData: {} } };
    render(<Header title="Post with Tag Image" tagimage={mockImage} />);
    expect(screen.getByTestId("gatsby-image")).toBeInTheDocument();
  });

  it("renders a placeholder div with class 'imagefill' when no image are provided", () => {
    const { container } = render(<Header title="Post with No Images" />);
    expect(screen.getByText("Post with No Images")).toBeInTheDocument();
    expect(container.querySelector(".imagefill")).toBeInTheDocument();
  });

  it("does not render reading time block when ReadingTime is 0", () => {
    render(<Header title="Post with no Reading Stats" readingTime={0} wordCount={{ words: 1000 }} />);
    expect(screen.queryByText(/min/)).not.toBeInTheDocument();
  });

  it("rounds up fractional readingTime", () => {
    render(<Header title="Fractional Time" readingTime={0.1} wordCount={{ words: 250 }} />);
    expect(screen.getByText(/1 min/)).toBeInTheDocument();
  });

  it("does not render camera icon block when featuredImageBy is not provided", () => {
    const mockImage = { childImageSharp: { gatsbyImageData: {} } };
    render(<Header title="Post with Image" featuredimage={mockImage} />);
    expect(screen.queryByText(/Camera/)).not.toBeInTheDocument();
  });

  it("does not render published date block when date is undefined", () => {
    render(<Header title="Post with no Date" />);
    expect(screen.queryByText(/Published:/)).not.toBeInTheDocument();
  });

  it("renders reading time with missing wordCount", () => {
    const { compactInteger } = require("humanize-plus");
    // override the mock implementation to return an empty string
    compactInteger.mockImplementation(() => "");

    render(<Header title="No Word Count" readingTime={5} wordCount={{}} />);
    expect(screen.getByText(/\(0 words\)/)).toBeInTheDocument();
  });

  it("renders both featured and tag images when both are provided", () => {
    const mockImage = { childImageSharp: { gatsbyImageData: {} } };
    render(
      <Header
        title="Both Images"
        featuredimage={mockImage}
        tagimage={mockImage}
        featuredImageBy="Photographer Name"
      />
    );
    const images = screen.getAllByTestId("gatsby-image");
    expect(images).toHaveLength(2);
  });


});
