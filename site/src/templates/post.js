import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from '../components/post-layout';
import SEO from '../components/seo';


export default function Template({ data, location }) {
  const { markdownRemark, imageSharp, featuredPosts } = data;
  const { fields, frontmatter, html } = markdownRemark;
  const { taglist } = fields;

  let featuredImageSrc;
  try {
    const { sizes: featuredImageSizes = {} } = imageSharp;
    const { src } = featuredImageSizes;
    featuredImageSrc = src;
  } catch (e) {
    // just pass on it
    featuredImageSrc = undefined;
  }

  const excerpt = frontmatter.excerpt || markdownRemark.excerpt || '';

  return (
    <Layout frontmatter={frontmatter} featuredImage={featuredImageSrc}
      readingTime={fields.readingTime} path={location.pathname}
      tags={taglist}
    >
      <SEO
        title={frontmatter.title}
        description={excerpt}
        type="article"
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
        featureimage
        imageby
        imagelink
        small_title
        large_title
      }
      excerpt(pruneLength: 220)
      fields {
        readingTime {
          minutes
          words
        }
        taglist
      }
    }
		imageSharp(resolutions: {originalName: {eq: $featuredImage}}) {
			resolutions {
				src
				srcSet
				width
				height
			}
			sizes {
				src
				srcSet
				sizes
			}
		}
  }
`;
