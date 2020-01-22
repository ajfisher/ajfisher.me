/** This component provides the core layouts that are then used by the others **/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { device } from './devices';

import PostHeader from './header';
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
    width: 1026px;
    margin: 0 auto;
  }

`;

export const Article = styled.article`
  width: 100%;

  @media only screen and ${device.large} {
    /** Article is a flex item when it's bigger **/
    flex-grow: 2;
    align-self: flex-start;
    width: 61vw;
    max-width: 65%

    & section {
      /**padding: 0 3rem;**/
    }
  }

  & section {

    & p, & pre {
      padding: 0 var(--gutter);
    }

    & p, & ul > li, & blockquote {
      font-size: 2rem;

      @media only screen and ${device.large} {
        font-size: 2.2rem;
      }
    }

    & ul {
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
    width: 28vw;

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

const Layout = ({ children, slug}) => {

  return (
    <>
      <PostHeader/>
      <Main>
        <article>
          {children}
        </article>
        <Aside>
          <Nav/>
        </Aside>
      </Main>
      <Footer slug={slug}/>
    </>
  )
}

export default Layout;
