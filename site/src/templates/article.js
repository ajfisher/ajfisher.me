import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/post-layout';
import PageHead from '../components/page-head';
import { getFeaturedImageSources } from '../lib/utils';

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
  const { fields, frontmatter, html, timeToRead } = markdownRemark;
  let taglist = null;
  if (fields) {
    taglist = fields.taglist || [];
  }

  const featuredImageSrc = getFeaturedImageSources(frontmatter?.featureimage?.childImageSharp);

  return (
    <Layout frontmatter={frontmatter} featuredimage={featuredImageSrc}
      readingTime={timeToRead} path={location.pathname}
      tags={taglist}
    >
      <section
        className="content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $featuredImage: String) {
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
		imageSharp(fixed: {originalName: {eq: $featuredImage}}) {
      base: fixed(width: 400, quality: 70) {
        src
      }
      small: fixed(width: 500, quality: 80) {
        src
      }
      medium: fixed(width: 750, quality: 90) {
        src
      }
      large: fixed(width: 1050, quality: 100) {
        src
      }
      wide: fixed(width: 1600, quality: 100) {
        src
      }
		}
  }
`;
