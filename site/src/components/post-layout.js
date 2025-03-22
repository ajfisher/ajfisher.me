/** layout for posts **/
import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { PostArticle } from './article';
import Header from './header';
import PostData from './postdata';
import Nav from './nav';
import Footer from './footer';
import { Main, Aside } from './layout';

const Layout = ({
  children,
  frontmatter,
  featuredimage,
  path,
  readingTime,
  wordCount,
  tags = {},
  relatedposts,
}) => {

  const { title, date, excerpt, slug, small_title=false, large_title=false,
    imageby, imagelink } = frontmatter;
  const {siteUrl} = useSiteMetadata();
  const urlpath = `${siteUrl}${path}`;

  return (
    <>
      <Header title={title} date={date} excerpt={excerpt}
        featuredimage={featuredimage} featuredImageBy={imageby}
        readingTime={readingTime} wordCount={wordCount}
        smalltitle={small_title} largetitle={large_title}/>
      <Main>
        <PostArticle title={title} url={urlpath} relatedposts={relatedposts}
          featuredImageBy={imageby} featuredImageLink={imagelink}
          date={date} tags={tags}>
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
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]).isRequired,
    excerpt: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    small_title: PropTypes.bool,
    large_title: PropTypes.bool,
    imageby: PropTypes.string,
    imagelink: PropTypes.string,
  }).isRequired,
  featuredimage: PropTypes.any,
  path: PropTypes.string.isRequired,
  readingTime: PropTypes.number.isRequired,
  wordCount: PropTypes.shape({
    words: PropTypes.number.isRequired,
  }).isRequired,
  tags: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object, // in case it's an object; adjust as needed
  ]).isRequired,
  relatedposts: PropTypes.arrayOf(PropTypes.object),
};

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `,
  );
  return site.siteMetadata;
};

export default Layout
