import React from 'react';
import PropTypes from 'prop-types';
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

Head.propTypes = {
  data: PropTypes.shape({
    tagdata: PropTypes.shape({
      tag: PropTypes.string.isRequired,
      title: PropTypes.string,
      intro: PropTypes.string,
      tagimage: PropTypes.any,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
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
      <h2 className="list">Topic related {pluralPosts}</h2>

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

Template.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string,
            frontmatter: PropTypes.shape({
              slug: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              listimage: PropTypes.any,
              listimage_position: PropTypes.string,
              date: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.instanceOf(Date),
              ]).isRequired,
              excerpt: PropTypes.string,
              featured: PropTypes.bool,
              featureimage: PropTypes.any,
              imageby: PropTypes.string,
              imagelink: PropTypes.string,
              featureimage_position: PropTypes.string,
            }).isRequired,
            excerpt: PropTypes.string,
            timeToRead: PropTypes.number,
            wordCount: PropTypes.shape({
              words: PropTypes.number,
            }),
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
    tagdata: PropTypes.shape({
      tag: PropTypes.string.isRequired,
      title: PropTypes.string,
      intro: PropTypes.string,
      tagimage: PropTypes.any,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
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
