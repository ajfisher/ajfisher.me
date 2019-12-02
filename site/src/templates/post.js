import React from "react"
import { graphql } from "gatsby"
export default function Template({ data }) {
  console.log(data)
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post">
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <p>{frontmatter.excerpt}</p>
      <p>{frontmatter.featureimage}</p>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        excerpt
        featureimage
      }
    }
  }
`

const imageQuery = graphql`
{
  file(relativePath: {eq: "posts/planes.jpg"}) {
    id
    childImageSharp {
      fixed(width: 1000) {
        srcSet
        src
      }
    }
  }
}
`
