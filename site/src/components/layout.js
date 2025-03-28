/** This component provides the core layouts that are then used by the others **/
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { device } from './devices';

import Header from './header';
import Nav from './nav';
import Footer from './footer';

export const Main = styled.main`
  width: 100%;
  box-sizing: border-box;

  @media only screen and ${device.large} {
    /** Main is a flex container when it's bigger*/
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: space-between;
  }

  @media only screen and ${device.wide} {
    width: 1020px;
    margin: 0 auto;
  }
`;

export const Article = styled.article`
  width: 100%;

  @media only screen and ${device.large} {
    /** Article is a flex item when it's bigger **/
    flex-grow: 2;
    align-self: flex-start;
    width: 62%;
  }

  @media only screen and ${device.wide} {
    width: 66%;
  }

  & section {
    margin-top: var(--gutter);

    & h2, & h3 {
      margin: 0;
      margin-left: var(--gutter);
      padding: 0px 0px 0.5rem;
    }

    & h4, & h5 {
      margin: calc(0.5 * var(--gutter)) var(--gutter);
    }

    & p, & pre {
      padding: 0 var(--gutter);

      & b {
        font-weight: inherit;
      }
    }

    /** use this for inline code snippets **/
    & p > code.language-text {
      background-color: var(--lightened-grey);
      border-radius: 0.2rem;
      font-size: initial;
      color: var(--light-text-colour);
      padding: 0.2rem 0.5rem;
    }

    & p, & ul > li, & blockquote, & ol > li {
      font-size: 2rem;

      @media only screen and ${device.large} {
        font-size: 2.2rem;
      }
    }

    & ul, & ol {
      margin: 0 var(--gutter);
      margin-left: calc(-1 * var(--gutter));

      @media only screen and ${device.large} {
        margin-left: -2rem;
      }

      @media only screen and ${device.wide} {
        margin-left: -1rem;
      }
    }

    & p img {
      width: 100%;
    }
`;

export const Aside = styled.aside`
  /** Aside is a flex item **/
  width: 100%;

  @media only screen and ${device.large} {
    /** Aside is a flex item at bigger resolutions **/
    flex-grow: 1;
    align-self: flex-start;
    top: var(--gutter);
    margin-top: var(--gutter);
    position: sticky;
    padding: 0 var(--gutter);
    height: min-content;
    width: 27%;

    /** But it is also a container of the nav and post data **/
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  /** change the order if it's a row layout.**/
  & nav {

    @media only screen and ${device.large} {
      order: 1;
    }
  }

  & section {

    @media only screen and ${device.large} {
      order: 2;
    }
  }
`;

const Layout = ({
  children,
  title = 'This page has no name',
  excerpt = '',
  featuredimage = null,
  largetitle = false,
  smalltitle = false,
  slug = '/unknown'
}) => {
  return (
    <>
      <Header title={title} excerpt={excerpt}
        largetitle={largetitle} smalltitle={smalltitle}
        featuredimage={featuredimage}
      />
      <Main>
        <Article>
          {children}
        </Article>
        <Aside>
          <Nav/>
        </Aside>
      </Main>
      <Footer slug={slug}/>
    </>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  featuredimage: PropTypes.any,
  largetitle: PropTypes.bool,
  smalltitle: PropTypes.bool,
  slug: PropTypes.string,
};

export default Layout;
