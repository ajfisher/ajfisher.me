import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';

import PageHead from '../components/page-head';
import Layout from '../components/list-layout';
import { ListItems, PostListItem } from '../components/list';

const Intro = styled.p`
  margin-top: var(--gutter) !important;
`;

export const Head = () => {
  return (
    <>
      <PageHead
        title="Home | ajfisher.me"
        description="Featured and recent posts from ajfisher"
        type="list"
      />
    </>
  );
};


const HomePage = ({pageContext, data}) => {
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
      <Intro>Observations, images and code from ajfisher</Intro>
      <h2 className="home">Featured posts</h2>
      <ListItems>
        {featured.edges.map(({node}, index) => {
          // jump out on first as this will appear up top
          if (index === 0) return null;

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

export default HomePage;

export const pageQuery = graphql`
  query {
    featured: allMarkdownRemark(
      filter: {frontmatter: {
        layout: {regex: "/^post/"}
        featured: {eq: true}
      }}
      sort: {frontmatter: {date: DESC}}
      limit: 3
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
                base: gatsbyImageData(width: 400, quality: 100
                  transformOptions: {duotone: {highlight:"#FF5E9A", shadow:"#000000"}}
                )
                small: gatsbyImageData(width: 400, quality: 100
                  transformOptions: {duotone: {highlight:"#FF5E9A", shadow:"#000000"}}
                )
                medium: gatsbyImageData(width: 750, quality: 90
                  transformOptions: {duotone: {highlight:"#FF5E9A", shadow:"#000000"}}
                )
                large: gatsbyImageData(width: 1050, quality: 100
                  transformOptions: {duotone: {highlight:"#FF5E9A", shadow:"#000000"}}
                )
                wide: gatsbyImageData(width: 1600, quality: 100
                  transformOptions: {duotone: {highlight:"#FF5E9A", shadow:"#000000"}}
                )
              }
            }
            featureimage_position
            small_title
            large_title
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
      limit: 13
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

