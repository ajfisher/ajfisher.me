import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/list-layout';
import { ListItems, PostListItem } from '../components/list';

const Intro = styled.p`
  margin-top: var(--gutter) !important;
`;

const HomePage = ({pageContext, data}) => {
  const {featured, posts} = data;

  return (
    <Layout slug="/" featured={featured.edges[0].node}>
      <SEO
        title="Home"
        description="Featured and recent posts from ajfisher"
        type="list"
      />

      <Intro>Observations, images and code from ajfisher</Intro>
      <h2 className="home">Featured posts</h2>
      <ListItems>
        {featured.edges.map(({node}, index) => {
          // jump out on first as this will appear up top
          if (index === 0) return;

          const { slug, title, date,
            listimage, listimage_position } = node.frontmatter;
          const {readingTime} = node.fields;

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
        {posts.edges.map(({node}) => {
          const { slug, title, date,
            listimage, listimage_position } = node.frontmatter;
          const {readingTime} = node.fields;

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
      sort: {order: DESC, fields: frontmatter___date}
      limit: 3
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
          fields {
            readingTime {
              minutes
              words
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      filter: {frontmatter: {
        layout: {regex: "/^post/"}
        featured: {in: [null, false]}
      }}
      sort: {order: DESC, fields: frontmatter___date}
      limit: 10
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

