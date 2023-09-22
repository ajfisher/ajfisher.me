import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import humanize from 'humanize-plus';
import moment from 'moment';

import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { device } from './devices';
import { pathDate } from '../lib/utils';

export const ListItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 var(--gutter) !important;

  @media only screen and ${device.large} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-between;
  }
`;

const Item = styled.li`
  width: 100%;
  height: min-content;

  @media only screen and ${device.large} {
    width: 47%;
  }

  @media only screen and ${device.wide} {
    width: 45%;
  }
`;

export const ImageLink = styled.div`
  height: 25rem;

  border-bottom: 0.5rem solid var(--light-base);
  border-radius: 0.2rem;
  margin-bottom: calc(0.5 * var(--gutter));
  transition: all 0.8s ease;

  :hover {
    border-bottom: 0.5rem solid var(--dark-grey);
  }

  @media only screen and ${device.large} {
    height: 17rem;
  }

  & div.gatsby-image-wrapper {
    height: 100%;
  }

  & img {
    object-position: ${props => props.$position} !important;
  }
`;

ImageLink.defaultProps = {
  $position: '50% 50%'
};

const PostDate = styled.p`
  color: var(--lightened-grey);
  font-size: 1.5rem !important;
`;

export const PostListItem = ({title, image, position, excerpt, date,
  slug, readingtime, wordcount}) => {

    image = image || '';

    const url = `/${pathDate(date)}/${slug}/`;

    const listimage = getImage(image);

    const rounded_time = Math.ceil(readingtime);
    const humanised_words = humanize.compactInteger(wordcount, 1);

    return (
      <Item>
        {typeof(listimage) !== 'undefined' &&
          <ImageLink $position={position}>
            <Link to={url}>
              <GatsbyImage image={listimage} alt={title} />
            </Link>
          </ImageLink>
        }
        <h2><Link to={url}>{title}</Link></h2>
        <PostDate>{moment(date).format("dddd, MMMM Do YYYY")}</PostDate>
        { excerpt.length > 0 &&
          <p>{excerpt}</p>
        }
        <p>A {rounded_time} minute read ({humanised_words} words)</p>
      </Item>
    );
};


