import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/post-layout';
import PageHead from '../components/page-head';

export const Head = ({_location, _params, data, _pageContext}) => {
  const { markdownRemark} = data;
  const { frontmatter} = markdownRemark;

  const excerpt = frontmatter.excerpt || markdownRemark.excerpt || '';
  const twitter_excerpt = frontmatter.twitter_excerpt || excerpt;
  return (
    <>
      <PageHead
        title={frontmatter.title}
        description={excerpt}
        type="article"
        tweet={twitter_excerpt}
      />
    </>
  );
};

Head.propTypes = {
  _location: PropTypes.object,
  _params: PropTypes.object,
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        excerpt: PropTypes.string,
        twitter_excerpt: PropTypes.string,
      }).isRequired,
      excerpt: PropTypes.string,
    }).isRequired,
  }).isRequired,
  _pageContext: PropTypes.object,
};

export default function Template({ data, location }) {
  const { markdownRemark } = data;
  const { fields, frontmatter, html, timeToRead, wordCount } = markdownRemark;
  let taglist = null;
  if (fields) {
    taglist = fields.taglist || [];
  }

  const featuredImage = frontmatter?.featureimage || null;

  return (
    <Layout frontmatter={frontmatter} featuredimage={featuredImage}
      readingTime={timeToRead} wordCount={wordCount}
      path={location.pathname} tags={taglist}
    >
      <section
        className="content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
};

Template.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      timeToRead: PropTypes.number,
      wordCount: PropTypes.shape({
        words: PropTypes.number.isRequired,
      }).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
          .isRequired,
        slug: PropTypes.string.isRequired,
        excerpt: PropTypes.string,
        twitter_excerpt: PropTypes.string,
        featureimage: PropTypes.any,
        imageby: PropTypes.string,
        imagelink: PropTypes.string,
        small_title: PropTypes.bool,
        large_title: PropTypes.bool,
      }).isRequired,
      fields: PropTypes.shape({
        taglist: PropTypes.arrayOf(PropTypes.string),
      }),
      excerpt: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        slug
        title
        excerpt
        twitter_excerpt
        featureimage {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
            )
          }
        }
        imageby
        imagelink
        small_title
        large_title
      }
      excerpt(pruneLength: 220)
      wordCount {
        words
      }
      timeToRead
      fields {
        taglist
      }
    }
  }
`;
