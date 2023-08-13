import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/list-layout';
import SEO from '../components/seo';
import { ListItems, PostListItem } from '../components/list';
import { Paginate } from '../components/pagination.js';

export default function Template({ pageContext, data}) {
  const {numPages, currentPage} = pageContext;
  const {edges} = data.allMarkdownRemark;
  const slug = `/blog/${currentPage}`;

  let featuredIndex = edges.findIndex(({node}, index) => {
    if (node.frontmatter.featured === true) return index;

    return null;
  });

  let featured;

  // see if we got a featured post.
  if (featuredIndex >= 0) {
    featured = edges[featuredIndex].node;
  } else {
    // just get the first one
    featured = edges[0].node;
    // and set the featuredIndex to 0
    featuredIndex = 0;
  }

  const items = edges.filter((item, index) => {
    if (index !== featuredIndex) return item;

    return null;
  });

  const seo = {
    title: `Article archive - page ${currentPage}`,
    description: `Article archive page ${currentPage} from ajfisher.me`
  };

  return (
    <Layout slug={slug} featured={featured}>
      <SEO
        title={seo.title}
        description={seo.description}
        type="list"
      />
      <h1>Article archive - page {currentPage}</h1>
      <ListItems>
        {items.map(({node}) => {
          const { slug, title, date,
            listimage, listimage_position } = node.frontmatter;
          const readingTime = {
            minutes: node.timeToRead,
            words: node.wordCount.words
          }

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
      <Paginate
        basepath="/blog"
        currentpage={currentPage}
        numpages={numPages}
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {order: DESC, fields: frontmatter___date},
      filter: {frontmatter: {layout: {regex: "/^post/"}}},
      limit: $limit,
      skip: $skip
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
          wordCount {
            words
          }
          timeToRead
        }
      }
    }
  }
`;

