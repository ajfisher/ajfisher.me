import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';

import PageHead from '../components/page-head';
import Layout from '../components/list-layout';
import { ListItems, PostListItem } from '../components/list';

const Intro = styled.h1`
  margin: var(--gutter) 0 !important;
  font-size: 2.2rem !important;
  font: var(--main-font-family);
  color: var(--dark-text-colour) !important;
`;

export const Head = () => {
  return (
    <>
      <PageHead
        title="Home | ajfisher"
        description="Explore insights on technology, business and user experience at the intersection of AI, web, media and digital innovation."
        type="list"
      />
    </>
  );
};


const HomePage = ({ data}) => {
  const {featured, posts} = data;

  // filter the main posts so that any featured posts are pulled out as they
  // are going to be displayed separately. Do this just by taking the slugs
  // from the featured posts and then filtering the main post list against them
  const featured_slugs = featured.edges.map((post) => {
    return post.node.frontmatter?.slug;
  });

  const filtered_posts = posts.edges.filter((post) => {
    if (! featured_slugs.includes(post.node.frontmatter?.slug)) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <Layout slug="/" featured={featured.edges[0].node}>
      <Intro>
        Observations, insights, images and code from ajfisher exploring the
        intersection of AI, web, media and digital innovation.
      </Intro>
      <h2 className="home">Featured posts</h2>
      <ListItems>
        {featured.edges.map(({node}, index) => {
          // jump out on first as this will appear up top
          // jump out on last as this will appear in the footer
          // This will force the second and third in the list under the
          // featured posts header
          if (index === 0 || index === 3 ) return null;

          const { slug, title, date,
            listimage, listimage_position } = node.frontmatter;
          const readingTime = {
            minutes: node.timeToRead,
            words: node.wordCount.words
          };

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

      <h2 className="home">Recent posts</h2>
      <ListItems>
        {filtered_posts.map(({node}) => {
          const { slug, title, date,
            listimage, listimage_position } = node.frontmatter;
          const readingTime = {
            minutes: node.timeToRead,
            words: node.wordCount.words
          };

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

      <p><Link to="/blog">See all posts</Link></p>
    </Layout>
  );
};

HomePage.propTypes = {
  data: PropTypes.shape({
    featured: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              slug: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              date: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.instanceOf(Date)
              ]).isRequired,
              excerpt: PropTypes.string,
              featured: PropTypes.bool,
              featureimage: PropTypes.any,
              imageby: PropTypes.string,
              imagelink: PropTypes.string,
              featureimage_position: PropTypes.string,
              smalltitle: PropTypes.bool,
              largetitle: PropTypes.bool,
              listimage_position: PropTypes.string,
              listimage: PropTypes.any,
            }).isRequired,
            timeToRead: PropTypes.number,
            wordCount: PropTypes.shape({
              words: PropTypes.number,
            }),
          }),
        })
      ),
    }),
    posts: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              slug: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              listimage: PropTypes.any,
              listimage_position: PropTypes.string,
              date: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.instanceOf(Date)
              ]).isRequired,
              excerpt: PropTypes.string,
              featured: PropTypes.bool,
              smalltitle: PropTypes.bool,
              largetitle: PropTypes.bool,
            }),
            excerpt: PropTypes.string,
            timeToRead: PropTypes.number,
            wordCount: PropTypes.shape({
              words: PropTypes.number,
            }),
          }),
        })
      ),
    }),
  }).isRequired,
};

export default HomePage;

export const pageQuery = graphql`
  query {
    featured: allMarkdownRemark(
      filter: {frontmatter: {
        layout: {regex: "/^post/"}
        featured: {eq: true}
      }}
      sort: {frontmatter: {date: DESC}}
      limit: 4
    ) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
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
            imageby
            imagelink
            featureimage_position
            smalltitle
            largetitle
            listimage_position
            listimage {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                )
              }
            }
          }
          wordCount {
            words
          }
          timeToRead
        }
      }
    }
    posts: allMarkdownRemark(
      filter: {frontmatter: {
        layout: {regex: "/^post/"}
      }}
      sort: {frontmatter: {date: DESC}}
      limit: 14
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

