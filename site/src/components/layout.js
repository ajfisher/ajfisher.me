/** Core site layout **/
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Article from './article';
import PostHeader from './header';
import PostData from './postdata';

import { device } from './devices';

import Nav from './nav';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  /** width: 90%; **/
  /** margin: 0 5%; **/
  box-sizing: border-box;

  @media only screen and ${device.large} {
    flex-direction: row;
    flex-wrap: nowrap;
  }

  @media only screen and ${device.wide} {
    width: 1026px;
    margin: 0 auto;
  }

`;

const Aside = styled.aside`
  /** Aside is a flex item **/
  flex-grow: 1;
  align-self: flex-start;
  width: 100%;

  /** But it is also a container **/
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media only screen and ${device.large} {
    flex-grow: 1;
    max-width: 31%;
    top: 3rem;
    position: sticky;
    height: min-content;
    padding: 0 3rem;
  }

  /** change the order depending on column or row **/
  & nav {
    order: 2;

    @media only screen and ${device.large} {
      order: 1;
    }
  }

  & section {
    order: 1;

    @media only screen and ${device.large} {
      order: 2;
    }
  }
`;

const Layout = ({ children, title, date, excerpt,
  featuredImage, featuredImageBy, featuredImageLink, path, readingTime, tags}) => {

  const {siteURL} = useSiteMetadata();
  const urlpath = `${siteURL}${path}`;

  return (
    <>
      <PostHeader title={title} date={date}
        excerpt={excerpt} featuredImage={featuredImage}
        readingTime={readingTime} />
      <Main>
        <Article title={title} url={urlpath}
          featuredImageBy={featuredImageBy} featuredImageLink={featuredImageLink}>
            {children}
        </Article>
        <Aside>
          <Nav>Here is the nav</Nav>
          <PostData tags={tags} title={title} publicationDate={date} author="ajfisher"/>
        </Aside>
      </Main>
      <footer>
        © {new Date().getFullYear()}, Built with
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteURL
          }
        }
      }
    `,
  );
  return site.siteMetadata;
};

export default Layout
