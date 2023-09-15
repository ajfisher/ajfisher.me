import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/list-layout';
import PageHead from '../components/page-head';

import { ListItems, PostListItem } from '../components/list';
import { Paginate } from '../components/pagination.js';

export const Head = ({location, params, data, pageContext}) => {
  const {currentPage} = pageContext;
  const seo = {
    title: `Article archive - page ${currentPage}`,
    description: `Article archive page ${currentPage} from ajfisher.me`
  };

  return (
    <>
      <PageHead
        title={seo.title}
        description={seo.description}
        type="list"
      />
    </>
  );
};

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

  return (
    <Layout slug={slug} featured={featured}>
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
      sort: {frontmatter: {date: DESC}},
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
            listimage {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                )
              }
            }
            listimage_position
            date(formatString: "YYYY-MM-DD")
            excerpt
            featured
            featureimage {
              childImageSharp {
                base: gatsbyImageData(width: 400, quality: 100
                  transformOptions: {duotone: {highlight:"FF5E9A", shadow:"000000"}}
                )
                small: gatsbyImageData(width: 400, quality: 100
                  transformOptions: {duotone: {highlight:"FF5E9A", shadow:"000000"}}
                )
                medium: gatsbyImageData(width: 750, quality: 90
                  transformOptions: {duotone: {highlight:"FF5E9A", shadow:"000000"}}
                )
                large: gatsbyImageData(width: 1050, quality: 100
                  transformOptions: {duotone: {highlight:"FF5E9A", shadow:"000000"}}
                )
                wide: gatsbyImageData(width: 1600, quality: 100
                  transformOptions: {duotone: {highlight:"FF5E9A", shadow:"000000"}}
                )
              }
            }
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

