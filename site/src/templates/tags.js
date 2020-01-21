import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import humanize from 'humanize-plus';
import moment from 'moment';

import Layout from '../components/layout'


export default function Template({ pageContext, data}) {
  const {tag} = pageContext;
  const {edges} = data.allMarkdownRemark;

  console.log(edges);
  return (
    <>
      <h1>{edges.length} posts tagged {tag}</h1>
      <div>
        {edges.map(({node}) => {
          const { slug, title, date,
            listimage, listimage_position } = node.frontmatter;
          const {readingTime} = node.fields;

          const url = `/${date}/${slug}`;

          const excerpt = node.frontmatter.excerpt || node.excerpt || null;
          const rounded_time = Math.ceil(readingTime.minutes);
          const humanised_words = humanize.compactInteger(readingTime.words, 1);

          return (
            <>
              <h2><Link to={url}>{title}</Link></h2>
              <p>{moment(date).format("dddd, MMMM Do YYYY")}</p>
              <p>{excerpt}</p>
              <p>A {rounded_time} minute read ({humanised_words} words)</p>
            </>
          );
        })}
      </div>
    </>
  );
};

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      filter: {fields: {taglist: {in: [$tag]}}}
      sort: {order: DESC, fields: frontmatter___date}
    ) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            listimage
            listimage_position
            date(formatString: "YYYY/MM/DD")
            excerpt
            featured
            featureimage
            featureimage_position
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
