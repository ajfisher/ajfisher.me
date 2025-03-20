import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/list-layout';
import PageHead from '../components/page-head';
import { ListItems, PostListItem } from '../components/list';

export const Head = ({data, pageContext}) => {
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

export default function Template({ data }) {
  const { posts, tagdata } = data;
  const { tag } = tagdata
  const slug = `/tagged/${tag}`;

  const title = tagdata?.title || null;
  const intro = tagdata?.intro || null;
  const tagimage = tagdata?.tagimage || null;

  const filteredPosts = posts?.edges;

  const pluralPosts = (filteredPosts?.length > 1) ? 'posts' : 'post';

  const tagFeature = {
    frontmatter: {
      excerpt: intro,
      title: title || tag,
      tagimage: tagimage,
      postcount: filteredPosts.length,
      large_title: true,
    },
    id: tag,
    tagFeature: true,
  };

  return (
    <Layout slug={slug} featured={tagFeature}>
      <h2 class="list">Topic related {pluralPosts}</h2>

      <ListItems>
        {filteredPosts.map(({node}) => {
          const { slug, title, date,
            listimage, listimage_position } = node.frontmatter;
          const readingTime = {
            minutes: node.timeToRead,
            words: node.wordCount.words
          };

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
    </Layout>
  );
};

export const pageQuery = graphql`
  query($tag: String!) {
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
      tagimage {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
          )
        }
      }
    }
  }
`;
