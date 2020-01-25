/** layout for poasts **/
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { PostArticle } from './article';
import Header from './header';
import PostData from './postdata';

import { device } from './devices';

import Nav from './nav';
import Footer from './footer';
import { Main, Aside } from './layout';

const Layout = ({ children, frontmatter, featuredImage, path, readingTime, tags}) => {

  const { title, date, excerpt, slug, small_title=false, large_title=false,
    imageby, imagelink } = frontmatter;
  const {siteURL} = useSiteMetadata();
  const urlpath = `${siteURL}${path}`;

  return (
    <>
      <Header title={title} date={date} excerpt={excerpt}
        featuredImage={featuredImage} readingTime={readingTime}
        smalltitle={small_title} largetitle={large_title}/>
      <Main>
        <PostArticle title={title} url={urlpath}
          featuredImageBy={imageby} featuredImageLink={imagelink}>
            {children}
        </PostArticle>
        <Aside>
          <PostData tags={tags} title={title} publicationDate={date} author="ajfisher"/>
          <Nav/>
        </Aside>
      </Main>
      <Footer slug={slug}/>
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
            title: defaultTitle
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
