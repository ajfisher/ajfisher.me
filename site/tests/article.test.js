// article.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleComponent, {
  Attribution,
  PostArticle,
  ListArticle
} from '../src/components/article';

// --- Mocks ---
// Mock the layout Article so that we can check for its presence.
jest.mock('../src/components/layout', () => ({
  Article: ({ children }) => <article data-testid="layout-article">{children}</article>,
}));

// Mock TagList to simply render its children.
jest.mock('../src/components/tags', () => ({
  TagList: ({ children }) => <div data-testid="tag-list">{children}</div>,
}));

// Attribution Component Tests
describe('Attribution Component', () => {
  const baseProps = {
    author: "Test Author",
    featuredImageBy: "Photographer",
    featuredImageLink: "https://example.com/photo",
    title: "Test Title",
    pageurl: "https://example.com/post",
    date: "2021-08-05T00:00:00.000Z",
    tags: ["tag1", "tag2"],
  };

  it('renders attribution with a link for title image when both featuredImageBy and featuredImageLink are provided', () => {
    render(<Attribution {...baseProps} />);
    // Check that the header "About this post" is rendered.
    expect(screen.getByText("About this post")).toBeInTheDocument();
    // Title attribute: it should display the title in quotes.
    expect(screen.getByText(/"Test Title"/)).toBeInTheDocument();
    // Published on: using the moment mock, this should be "Mon, Jan 1st 2024"
    expect(screen.getByText("Mon, Jan 1st 2024")).toBeInTheDocument();
    // Tags: our mocked TagList should render the tags.
    expect(screen.getByTestId("tag-list")).toHaveTextContent("tag1");
    expect(screen.getByTestId("tag-list")).toHaveTextContent("tag2");
    // Title image: should render a link containing "Photographer".
    const imageLink = screen.getByText("Photographer");
    expect(imageLink.tagName).toBe("A");
    expect(imageLink).toHaveAttribute("href", baseProps.featuredImageLink);
    // License and Permanent source should be rendered.
    expect(screen.getByText(/CC BY-NC-SA 4.0 International License/i)).toBeInTheDocument();
    const permSource = screen.getByText(baseProps.pageurl);
    expect(permSource.tagName).toBe("A");
    expect(permSource).toHaveAttribute("href", baseProps.pageurl);
  });

  it('renders attribution without a link for title image when featuredImageLink is missing', () => {
    const props = { ...baseProps, featuredImageLink: null };
    render(<Attribution {...props} />);
    // "Photographer" should appear but not as a link.
    const photographerEl = screen.getByText("Photographer");
    expect(photographerEl.tagName).not.toBe("A");
  });
});

// ----------------------------------------
// PostArticle Component Tests
// ----------------------------------------
describe('PostArticle Component', () => {
  const relatedPosts = [
    {
      post: {
        frontmatter: {
          slug: "post-1",
          title: "Post 1",
          date: "2021-08-05T00:00:00.000Z",
          listimage: "dummyImage1",
          listimage_position: "50% 50%",
          excerpt: "Excerpt 1",
        },
      },
    },
    {
      post: {
        frontmatter: {
          slug: "post-2",
          title: "Post 2",
          date: "2021-08-06T00:00:00.000Z",
          listimage: "dummyImage2",
          listimage_position: "50% 50%",
          excerpt: "Excerpt 2",
        },
      },
    },
    // Extra posts are sliced off.
    {
      post: {
        frontmatter: {
          slug: "post-3",
          title: "Post 3",
          date: "2021-08-07T00:00:00.000Z",
          listimage: "dummyImage3",
          listimage_position: "50% 50%",
          excerpt: "Excerpt 3",
        },
      },
    },
  ];

  const baseProps = {
    featuredImageBy: "Photographer",
    featuredImageLink: "https://example.com/photo",
    title: "Main Post Title",
    url: "https://example.com/main-post",
    relatedposts: relatedPosts,
    date: "2021-08-05T00:00:00.000Z",
    tags: ["news", "tech"],
    children: <p>Post content here</p>,
  };

  it('renders children, related posts section (when at least 2 valid posts exist) and attribution', () => {
    render(<PostArticle {...baseProps} />);
    // Check that the main content is rendered.
    expect(screen.getByText("Post content here")).toBeInTheDocument();
    // Related posts section should appear.
    expect(screen.getByRole("heading", { name: /Similar posts you might like/i })).toBeInTheDocument();
    // Check that only the first two valid related posts are rendered.
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.queryByText("Post 3")).not.toBeInTheDocument();
    // Attribution should be rendered.
    expect(screen.getByText("About this post")).toBeInTheDocument();
  });

  it('does not render related posts section when less than 2 valid related posts exist', () => {
    const props = { ...baseProps, relatedposts: [{ post: { frontmatter: {
      slug: "post-1", title: "Post 1", date: "2021-08-05T00:00:00.000Z",
      listimage: "dummyImage1", listimage_position: "50% 50%", excerpt: "Excerpt 1",
    }}}] };
    render(<PostArticle {...props} />);
    expect(screen.queryByRole("heading", {
      name: /Similar posts you might like/i
    })).not.toBeInTheDocument();
  });

  it('handles missing related posts', () => {
    const props = { ...baseProps, relatedposts: undefined };
    render(<PostArticle {...props} />);
    expect(screen.queryByRole("heading", {
      name: /Similar posts you might like/i
    })).not.toBeInTheDocument();
  });

  it('handles related posts set to null', () => {
    const props = { ...baseProps, relatedposts: null };
    render(<PostArticle {...props} />);
    expect(screen.queryByRole("heading", {
      name: /Similar posts you might like/i
    })).not.toBeInTheDocument();
  });

});

// ----------------------------------------
// ListArticle Component Tests
// ----------------------------------------
describe('ListArticle Component', () => {
  it('renders its children within a styled container', () => {
    render(<ListArticle><p>List article content</p></ListArticle>);
    expect(screen.getByText("List article content")).toBeInTheDocument();
  });
});

