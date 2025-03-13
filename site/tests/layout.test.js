import React from 'react';
import { render, screen } from '@testing-library/react';
// import Layout, { Main, Article, Aside } from '../src/components/layout';
import Layout from '../src/components/layout';

// Mock sub-components so that you can inspect their props and rendered output.
jest.mock('../src/components/header', () => (props) => {
  return (
    <div
      data-testid="header"
      data-title={props.title}
      data-excerpt={props.excerpt}
      data-largetitle={props.largetitle}
      data-smalltitle={props.smalltitle}
    >
      Header Mock
    </div>
  );
});

jest.mock('../src/components/nav', () => () => <nav data-testid="nav">Nav Mock</nav>);

jest.mock('../src/components/footer', () => (props) => {
  return <div data-testid="footer" {...props}>Footer Mock</div>;
});

describe('Layout Component', () => {
  const childContent = <div data-testid="child">Child Content</div>;

  it('renders the layout structure and passes default props when none provided', () => {
    render(<Layout>{childContent}</Layout>);

    // Header should use default props.
    const header = screen.getByTestId('header');
    expect(header).toHaveTextContent('Header Mock');
    expect(header).toHaveAttribute('data-title', 'This page has no name');

    // Main container exists.
    const mainEl = document.querySelector('main');
    expect(mainEl).toBeInTheDocument();

    // Article should contain the children.
    const articleEl = document.querySelector('article');
    expect(articleEl).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Child Content');

    // Aside should render Nav.
    const navEl = screen.getByTestId('nav');
    expect(navEl).toBeInTheDocument();

    // Footer should receive the default slug.
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveAttribute('slug', '/unknown');
  });

  it('passes provided props to Header and Footer', () => {
    const props = {
      title: "Test Title",
      excerpt: "Test excerpt",
      featuredimage: "dummy-image-data",
      largetitle: true,
      smalltitle: false,
      slug: "/test-slug"
    };

    render(<Layout {...props}>{childContent}</Layout>);
    // Check Header
    const header = screen.getByTestId('header');
    expect(header).toHaveAttribute('data-title', props.title);
    expect(header).toHaveAttribute('data-excerpt', props.excerpt);
    expect(header).toHaveAttribute('data-largetitle', 'true');
    expect(header).toHaveAttribute('data-smalltitle', 'false');

    // Check Footer
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveAttribute('slug', props.slug);
  });

  it('renders the Main container with Article and Aside', () => {
    render(<Layout>{childContent}</Layout>);

    // Verify that Main is rendered.
    const mainEl = document.querySelector('main');
    expect(mainEl).toBeInTheDocument();

    // Verify that Article is rendered inside Main.
    const articleEl = document.querySelector('article');
    expect(articleEl).toBeInTheDocument();

    // Verify that Aside contains the Nav.
    const asideEl = document.querySelector('aside');
    expect(asideEl).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });
});

