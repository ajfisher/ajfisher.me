import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"

export default function Template({ data, location }) {
  const { markdownRemark, imageSharp } = data // data.markdownRemark holds your post data
  const { fields, frontmatter, html } = markdownRemark

  let featuredImageSrc;
  try {
    const { sizes: featuredImageSizes = {} } = imageSharp;
    const { src } = featuredImageSizes;
    featuredImageSrc = src;
  } catch (e) {
    // just pass on it
    featuredImageSrc = undefined;
  }

  // console.log('image', data);

  return (
    <Layout title={frontmatter.title} date={frontmatter.date}
      excerpt={frontmatter.excerpt} featuredImage={featuredImageSrc}
      featuredImageBy={frontmatter.imageby} featuredImageLink={frontmatter.imagelink}
      readingTime={fields.readingTime} path={location.pathname}
      tags={frontmatter.tags}
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
        featureimage
        imageby
        imagelink
        tags
      }
      fields {
        readingTime {
          minutes
          words
        }
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
