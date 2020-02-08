import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import Layout from '../components/list-layout';
import SEO from '../components/seo';
import { ListItems, PostListItem } from '../components/list';

export default function Template({ pageContext, data}) {
  const {tag} = pageContext;
  const {edges} = data.allMarkdownRemark;
  const slug = `/tagged/${tag}`;

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

  const seo = {
    title: `Posts tagged ${tag}`,
    description: `Posts that are tagged ${tag} on ajfisher.me`
  };

  return (
    <Layout slug={slug} featured={featured}>
      <SEO
        title={seo.title}
        description={seo.description}
        type="list"
      />
      <h1>{items.length} posts tagged {tag}</h1>
      <ListItems>
        {items.map(({node}) => {
          const { slug, title, date,
            listimage, listimage_position } = node.frontmatter;
          const {readingTime} = node.fields;

          // const url = `/${date}/${slug}`;

          const excerpt = node.frontmatter.excerpt || node.excerpt || null;

          return (
            <PostListItem
              key={slug}
              title={title}
              date={date}
              excerpt={excerpt}
              slug={slug}
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
            date(formatString: "YYYY-MM-DD")
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
