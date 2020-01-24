import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from '../components/list-layout';
import { ListItems, PostListItem } from '../components/list';

const BlogArchive = ({pageContext, data}) => {
  const {edges} = data.allMarkdownRemark;
  const slug = '/blog';

  const featuredIndex = edges.findIndex(({node}, index) => {
    if (node.frontmatter.featured === true) return index;
  });

  let featured;

  // see if we got a featured post.
  if (featuredIndex >= 0) {
    featured = edges[featuredIndex].node;
  } else {
    // just get the first one
    featured = edges[0].node;
  }

  const items = edges.filter((item, index) => {
    if (index !== featuredIndex) return item;
  });

  return(
    <Layout slug={slug} featured={featured}>
      <SEO
        title="All blog posts"
        description="All blog posts on ajfisher.me"
        type="list"
      />
      <h1>All blog posts</h1>
      <ListItems>
        {items.map(({node}) => {
          const { slug, title, date,
            listimage, listimage_position } = node.frontmatter;
          const {readingTime} = node.fields;

          const url = `/${date}/${slug}`;

          const excerpt = node.frontmatter.excerpt || node.excerpt || null;

          return (
            <PostListItem
              key={url}
              title={title}
              date={date}
              excerpt={excerpt}
              url={url}
              readingtime={readingTime.minutes}
              wordcount={readingTime.words}
              image={listimage}
              position={listimage_position}
            />
          );
        })}
      </ListItems>
    </Layout>
  );
};

export default BlogArchive;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {frontmatter: {layout: {regex: "/^post/"} }}
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
            date(formatString: "YYYY/MM/DD")
            excerpt
            featured
            featureimage
            featureimage_position
            small_title
            large_title
          }
          excerpt(pruneLength: 220)
          fields {
            readingTime {
              minutes
              words
            }
          }
        }
      }
    }
  }
`;
