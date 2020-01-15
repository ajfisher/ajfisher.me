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

const Aside = styled.aside`
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
          <PostData tags={tags} title={title} publicationDate={date} author="ajfisher"/>
          <Nav/>
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
