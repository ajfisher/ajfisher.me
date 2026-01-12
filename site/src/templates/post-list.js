import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/list-layout';
import PageHead from '../components/page-head';

import { ListItems, PostListItem } from '../components/list';
import { Paginate } from '../components/pagination.js';

// need to use object.assign here due to the way arrow functions get hoisted
// with the export. As we need to add the proptypes to the object that gets
// hoisted we need to do this in one step then export it.
export const Head = Object.assign(
  ({_location, _params, _data, pageContext}) => {
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
  },
  {
    propTypes: {
      _location: PropTypes.object,
      _params: PropTypes.object,
      _data: PropTypes.object,
      pageContext: PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
      }).isRequired,
    }
  }
);

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

          const excerpt = node.frontmatter.excerpt || node.excerpt;

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

Template.propTypes = {
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              slug: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              date: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.instanceOf(Date),
              ]).isRequired,
              excerpt: PropTypes.string,
              featured: PropTypes.bool,
              featureimage: PropTypes.any,
              featureimage_position: PropTypes.string,
              smalltitle: PropTypes.bool,
              largetitle: PropTypes.bool,
              listimage: PropTypes.any,
              listimage_position: PropTypes.string,
            }).isRequired,
            timeToRead: PropTypes.number,
            wordCount: PropTypes.shape({
              words: PropTypes.number,
            }),
            excerpt: PropTypes.string,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
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
                gatsbyImageData(
                  layout: FULL_WIDTH
                )
              }
            }
            featureimage_position
            smalltitle
            largetitle
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

