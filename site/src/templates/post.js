import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/post-layout';
import PageHead from '../components/page-head';

export const Head = ({data}) => {
  const { markdownRemark} = data;
  const { frontmatter, timeToRead, wordCount} = markdownRemark;

  const excerpt = frontmatter.excerpt || markdownRemark.excerpt || '';
  const twitter_excerpt = frontmatter.twitter_excerpt || excerpt;

  const featuredImage = frontmatter?.featureimage || '';

  return (
    <>
      <PageHead
        title={frontmatter.title}
        description={excerpt}
        type="article"
        tweet={twitter_excerpt}
        image={featuredImage}
        readingTime={timeToRead}
        words={wordCount.words}
      />
    </>
  );
};

export default function Template({ data, location }) {
  const { markdownRemark} = data;
  const { fields, frontmatter, html, related, timeToRead, wordCount} = markdownRemark;
  const { taglist } = fields;

  const featuredImage = frontmatter?.featureimage;

  return (
    <Layout frontmatter={frontmatter} featuredimage={featuredImage}
      readingTime={timeToRead} wordCount={wordCount}
      path={location.pathname}
      tags={taglist} relatedposts={related?.post_similarity}
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
        small_title
        large_title
        featureimage {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
            )
          }
        }
        imageby
        imagelink
      }
      excerpt(pruneLength: 220)
      wordCount {
        words
      }
      timeToRead
      fields {
        taglist
      }
      related {
        post_similarity {
          similarity
          post {
            excerpt(pruneLength: 220)
            frontmatter {
              date(formatString: "YYYY-MM-DD")
              slug
              title
              excerpt
              listimage_position
              listimage {
                childImageSharp {
                  gatsbyImageData(
                    layout: FULL_WIDTH
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`;
