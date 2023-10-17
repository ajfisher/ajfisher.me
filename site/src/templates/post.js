import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/post-layout';
import PageHead from '../components/page-head';
import { getFeaturedImageSources } from '../lib/utils';

export const Head = ({data}) => {
  const { markdownRemark} = data;
  const { frontmatter, timeToRead, wordCount} = markdownRemark;

  const excerpt = frontmatter.excerpt || markdownRemark.excerpt || '';
  const twitter_excerpt = frontmatter.twitter_excerpt || excerpt;

  const featuredImageSrc = getFeaturedImageSources(frontmatter?.featureimage?.childImageSharp);

  return (
    <>
      <PageHead
        title={frontmatter.title}
        description={excerpt}
        type="article"
        tweet={twitter_excerpt}
        image={featuredImageSrc}
        readingTime={timeToRead}
        words={wordCount.words}
      />
    </>
  );
};

export default function Template({ data, location }) {
  const { markdownRemark} = data;
  const { fields, frontmatter, html, related} = markdownRemark;
  const { taglist } = fields;

  const featuredImageSrc = getFeaturedImageSources(frontmatter?.featureimage?.childImageSharp);

  return (
    <Layout frontmatter={frontmatter} featuredimage={featuredImageSrc}
      readingTime={fields.readingTime} path={location.pathname}
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
            base: gatsbyImageData(width: 400, quality: 100
              transformOptions: {duotone: {highlight:"FF5E9A", shadow:"000000", opacity: 80}}
            )
            small: gatsbyImageData(width: 500, quality: 100
              transformOptions: {duotone: {highlight:"FF5E9A", shadow:"000000", opacity: 80}}
            )
            medium: gatsbyImageData(width: 750, quality: 90
              transformOptions: {duotone: {highlight:"FF5E9A", shadow:"000000", opacity: 80}}
            )
            large: gatsbyImageData(width: 1050, quality: 100
              transformOptions: {duotone: {highlight:"FF5E9A", shadow:"000000", opacity: 80}}
            )
            wide: gatsbyImageData(width: 1600, quality: 100
              transformOptions: {duotone: {highlight:"FF5E9A", shadow:"000000", opacity: 80}}
            )
            share: gatsbyImageData(width: 1200, quality: 90)
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
