import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/post-layout';
import PageHead from '../components/page-head';

export const Head = ({location, params, data, pageContext}) => {
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
}

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
