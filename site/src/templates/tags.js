import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/list-layout';
import PageHead from '../components/page-head';
import { ListItems, PostListItem } from '../components/list';

export const Head = ({location, params, data, pageContext}) => {
  const {tag} = pageContext;
  const {tagdata} = data;

  const title = tagdata?.title || null;

  const seo = {
    title: `${title || tag} tagged posts`,
    description: `Posts that are tagged ${tag} on ajfisher.me`
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
  const {tag} = pageContext;
  const { featured, posts, tagdata } = data;
  const slug = `/tagged/${tag}`;

  const title = tagdata?.title || null;
  const intro = tagdata?.intro || null;

  let featuredPost;
  let filteredPosts = [];

  if (featured?.edges.length > 0) {
    featuredPost = featured.edges[0].node;
    // filter the main posts so that the featured post is pulled out as it
    // is going to be displayed separately. Do this just by taking the slug
    // from the featured posts and then filtering the main post list against it
    const featuredSlug = featuredPost.frontmatter?.slug;

    filteredPosts = posts.edges.filter((post) => {
      if (post.node.frontmatter?.slug !== featuredSlug) return true;
      return false;
    });
  } else if (posts?.edges.length > 0) {
    // get the first one from the list instead and shift it off the front of the
    // main post list.
    [featuredPost, ...filteredPosts] = posts?.edges;
    featuredPost = featuredPost.node;
  }

  const pluralPosts = (filteredPosts?.length > 1) ? 'posts' : 'post';

  return (
    <Layout slug={slug} featured={featuredPost}>
      <h1>{title || tag}</h1>
      {intro &&
        <p class="tagintro">{intro}</p>
      }
      {filteredPosts.length > 0 ? (
        <p class="tagintro">
          If you enjoy this topic, here are {filteredPosts?.length || ''} more {pluralPosts} related to "{tag}" you might like to read.
        </p>
      ) : (
        <p>There are no other posts tagged <strong>"{tag}"</strong>. Enjoy the one above or
        some of those items linked below.</p>
      )}
      <ListItems>
        {filteredPosts.map(({node}) => {
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
    </Layout>
  );
};

export const pageQuery = graphql`
  query($tag: String) {
    featured: allMarkdownRemark(
      filter: {
        fields:
          {taglist: {in: [$tag]}},
          frontmatter: {featured: {eq: true}}
      }
      sort: {frontmatter: {date: DESC}}
      limit: 1
    ) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            date(formatString: "YYYY-MM-DD")
            excerpt
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
            small_title
            large_title
          }
          wordCount {
            words
          }
          timeToRead
        }
      }
    }
    posts: allMarkdownRemark(
      filter: {fields: {taglist: {in: [$tag]}}}
      sort: {frontmatter: {date: DESC}}
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
            imageby
            imagelink
            featureimage_position
          }
          excerpt(pruneLength: 220)
          wordCount {
            words
          }
          timeToRead
        }
      }
    }
    tagdata: tagDataJson(tag: {eq: $tag}) {
      tag
      title
      intro
    }
  }
`;
