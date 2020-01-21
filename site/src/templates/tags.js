import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"

export default function Template({ pageContext, data}) {
  const {tag} = pageContext;
  const {edges} = data.allMarkdownRemark;

  return (
    <>
      <h1>These are tags</h1>
    </>
  );
};

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      filter: {fields: {taglist: {in: [$tag]}}}
      sort: {order: DESC, fields: frontmatter___date}
    ) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            listimage
            listimage_position
            date(formatString: "YYYY-MM-DD")
            excerpt
            featured
            featureimage
            featureimage_position
          }
        }
      }
    }
  }
`;
