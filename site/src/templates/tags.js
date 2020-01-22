import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import Layout from '../components/list-layout';
import { ListItems, PostListItem } from '../components/list';

export default function Template({ pageContext, data}) {
  const {tag} = pageContext;
  const {edges} = data.allMarkdownRemark;
  const slug = `/tagged/${tag}`;

  console.log(edges);
  return (
    <Layout slug={slug}>
      <h1>{edges.length} posts tagged {tag}</h1>
      <ListItems>
        {edges.map(({node}) => {
          const { slug, title, date,
            listimage, listimage_position } = node.frontmatter;
          const {readingTime} = node.fields;

          const url = `/${date}/${slug}`;

          const excerpt = node.frontmatter.excerpt || node.excerpt || null;

          return (
            <PostListItem
              title={title}
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
            date(formatString: "YYYY/MM/DD")
            excerpt
            featured
            featureimage
            featureimage_position
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
