import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/post-layout';
import PageHead from '../components/page-head';

const buildMarkdownHref = (pathname = '') => {
  if (!pathname) {
    return null;
  }

  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${normalizedPath}index.md`;
};

// need to use object.assign here due to the way arrow functions get hoisted
// with the export. As we need to add the proptypes to the object that gets
// hoisted we need to do this in one step then export it.
export const Head = Object.assign(
  ({data, location}) => {
    const { markdownRemark} = data;
    const { frontmatter, timeToRead, wordCount} = markdownRemark;

    const excerpt = frontmatter.excerpt || markdownRemark.excerpt || '';
    const twitter_excerpt = frontmatter.twitter_excerpt || excerpt;

    const featuredImage = frontmatter?.featureimage || '';
    const markdownHref = buildMarkdownHref(location?.pathname);

    return (
      <>
        <PageHead
          title={frontmatter.title}
          description={excerpt}
          type="article"
          tweet={twitter_excerpt}
          image={featuredImage}
          readingTime={timeToRead}
          words={wordCount.words}
        />
        {markdownHref && (
          <link rel="alternate" type="text/markdown" href={markdownHref} />
        )}
      </>
    );
  },
  {
    propTypes: {
      data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            excerpt: PropTypes.string,
            twitter_excerpt: PropTypes.string,
            featureimage: PropTypes.any,
          }).isRequired,
          excerpt: PropTypes.string,
          timeToRead: PropTypes.number,
          wordCount: PropTypes.shape({
            words: PropTypes.number.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    }
  }
);

export default function Template({ data, location }) {
  const { markdownRemark} = data;
  const { fields, frontmatter, html, related, timeToRead, wordCount} = markdownRemark;
  const { taglist } = fields;

  const featuredImage = frontmatter?.featureimage || null;

  return (
    <Layout frontmatter={frontmatter} featuredimage={featuredImage}
      readingTime={timeToRead} wordCount={wordCount}
      path={location.pathname}
      tags={taglist} relatedposts={related?.post_similarity}
    >
      <section
        className="content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
};

Template.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      timeToRead: PropTypes.number,
      wordCount: PropTypes.shape({
        words: PropTypes.number.isRequired,
      }).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(Date),
        ]).isRequired,
        slug: PropTypes.string.isRequired,
        excerpt: PropTypes.string,
        twitter_excerpt: PropTypes.string,
        smalltitle: PropTypes.bool,
        largetitle: PropTypes.bool,
        featureimage: PropTypes.any,
        imageby: PropTypes.string,
        imagelink: PropTypes.string,
      }).isRequired,
      excerpt: PropTypes.string,
      fields: PropTypes.shape({
        taglist: PropTypes.arrayOf(PropTypes.string),
      }).isRequired,
      related: PropTypes.shape({
        post_similarity: PropTypes.arrayOf(
          PropTypes.shape({
            similarity: PropTypes.any,
            post: PropTypes.shape({
              excerpt: PropTypes.string,
              frontmatter: PropTypes.shape({
                date: PropTypes.oneOfType([
                  PropTypes.string,
                  PropTypes.instanceOf(Date),
                ]).isRequired,
                slug: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                excerpt: PropTypes.string,
                listimage_position: PropTypes.string,
                listimage: PropTypes.any,
              }).isRequired,
            }).isRequired,
          })
        ),
      }),
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        slug
        title
        excerpt
        twitter_excerpt
        smalltitle
        largetitle
        featureimage {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
            )
          }
        }
        imageby
        imagelink
      }
      excerpt(pruneLength: 220)
      wordCount {
        words
      }
      timeToRead
      fields {
        taglist
      }
      related {
        post_similarity {
          similarity
          post {
            excerpt(pruneLength: 220)
            frontmatter {
              date(formatString: "YYYY-MM-DD")
              slug
              title
              excerpt
              listimage_position
              listimage {
                childImageSharp {
                  gatsbyImageData(
                    layout: FULL_WIDTH
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`;
