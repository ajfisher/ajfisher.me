import { useStaticQuery, graphql} from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Img from 'gatsby-image';

import { device } from './devices';

const ImageLink = styled.div`
  height: 25rem;

  border-bottom: 0.5rem solid var(--highlight);
  border-radius: 0.2rem;
  margin-bottom: calc(0.5 * var(--gutter));
  transition: all 0.8s ease;

  @media only screen and ${device.large} {
    height: 17rem;
  }

  & div.gatsby-image-wrapper {
    height: 100%;
  }

  & img {
    object-position: ${props => props.position} !important;
  }
`;

ImageLink.defaultProps = {
  position: '50% 50%'
};

export const PostItem = ({title, image, url, excerpt}) => {

  const {postItemImages} = useStaticQuery(graphql`
    query postItemImageQuery {
      postItemImages: allFile {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);


  let i = 0;
  const postImage = postItemImages.edges.find(({node}) => {
    if (node.relativePath == image) return node;
  });

  console.log(postImage);

  return (
    <>
      <ImageLink>
        <a href={url}>
          <Img
            fluid={postImage.node.childImageSharp.fluid}
            alt={title}
          />
        </a>
      </ImageLink>
      <p><a href={url}>{title}</a></p>
      { excerpt.length > 0 &&
        <p>{excerpt}</p>
      }
    </>
  );
};

