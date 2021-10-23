import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/post-layout';
import SEO from '../components/seo';

export default function Template({ data, location }) {
  const { markdownRemark, imageSharp} = data;
  const { fields, frontmatter, html, timeToRead, wordCount } = markdownRemark;
  const { taglist } = fields;

  let featuredImageSrc;
  try {
    featuredImageSrc = {
      base: imageSharp.base.src,
      small: imageSharp.small.src,
      medium: imageSharp.medium.src,
      large: imageSharp.large.src,
      wide: imageSharp.wide.src
    };
  } catch (e) {
    // just pass on it
    featuredImageSrc = undefined;
  }

  const excerpt = frontmatter.excerpt || markdownRemark.excerpt || '';
  const twitter_excerpt = frontmatter.twitter_excerpt || excerpt;

  return (
    <Layout frontmatter={frontmatter} featuredImage={featuredImageSrc}
      readingTime={fields.readingTime} path={location.pathname}
      tags={taglist}
    >
      <SEO
        title={frontmatter.title}
        description={excerpt}
        type="article"
        tweet={twitter_excerpt}
        image={featuredImageSrc}
        readingTime={timeToRead}
        words={wordCount.words}
      />
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
        featureimage
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
      base: fixed(width: 400, quality: 100, duotone: {highlight:"#FF5E9A", shadow:"#000000"}) {
        src
      }
      small: fixed(width: 500, quality: 100, duotone: {highlight:"#FF5E9A", shadow:"#000000"}) {
        src
      }
      medium: fixed(width: 750, quality: 90, duotone: {highlight:"#FF5E9A", shadow:"#000000"}) {
        src
      }
      large: fixed(width: 1050, quality: 100, duotone: {highlight:"#FF5E9A", shadow:"#000000"}) {
        src
      }
      wide: fixed(width: 1600, quality: 100, duotone: {highlight:"#FF5E9A", shadow:"#000000"}) {
        src
      }
		}
  }
`;
