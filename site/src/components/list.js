import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import humanize from 'humanize-plus';
import moment from 'moment';

import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

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
    border-radius: 0.2rem;
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

const ListItemPlaceholderImage = () => {
  // return a placeholder image from the set randomly
  const noPlaceholders = 12;

  switch (Math.floor(Math.random() * noPlaceholders)) {
    case 1:
      return(<StaticImage src="../img/posts/listimages/li1.png"
        placeholder="blurred" layout="fullWidth" alt="" />);
    case 2:
      return(<StaticImage src="../img/posts/listimages/li2.png"
        placeholder="blurred" layout="fullWidth" alt=""/>);
    case 3:
      return(<StaticImage src="../img/posts/listimages/li3.png"
        placeholder="blurred" layout="fullWidth" alt=""/>);
    case 4:
      return(<StaticImage src="../img/posts/listimages/li4.png"
        placeholder="blurred" layout="fullWidth" alt=""/>);
    case 5:
      return(<StaticImage src="../img/posts/listimages/li5.png"
        placeholder="blurred" layout="fullWidth" alt=""/>);
    case 6:
      return(<StaticImage src="../img/posts/listimages/li6.png"
        placeholder="blurred" layout="fullWidth" alt=""/>);
    case 7:
      return(<StaticImage src="../img/posts/listimages/li7.png"
        placeholder="blurred" layout="fullWidth" alt=""/>);
    case 8:
      return(<StaticImage src="../img/posts/listimages/li8.png"
        placeholder="blurred" layout="fullWidth" alt=""/>);
    case 9:
      return(<StaticImage src="../img/posts/listimages/li9.png"
        placeholder="blurred" layout="fullWidth" alt=""/>);
    case 10:
      return(<StaticImage src="../img/posts/listimages/li10.png"
        placeholder="blurred" layout="fullWidth" alt=""/>);
    case 11:
      return(<StaticImage src="../img/posts/listimages/li11.png"
        placeholder="blurred" layout="fullWidth" alt=""/>);
    default:
      // this conveniently handles a result of 0 as well.
      return(<StaticImage src="../img/posts/listimages/li0.png"
        placeholder="blurred" layout="fullWidth" alt=""/>);
  }
};

export const PostListItem = ({title, image, position, excerpt, date,
  slug, readingtime, wordcount}) => {

    image = image || '';

    const url = `/${pathDate(date)}/${slug}/`;

    let listimage;
    if (image === '') {
      listimage = ListItemPlaceholderImage();
    } else {
      const PostImage = (image, title) => {
        const postimage = getImage(image);
        return(<GatsbyImage image={postimage} alt={title} />);
      };

      listimage = PostImage(image, title);
    }

    const rounded_time = Math.ceil(readingtime);
    const humanised_words = humanize.compactInteger(wordcount, 1);
    // work out if we should say An 8 minute or A 7 seven minute
    const a_an = ([8,11,18].includes(rounded_time)) ? 'An' : 'A';

    return (
      <Item>
        <ImageLink $position={position}>
          <Link to={url}>
            {listimage}
          </Link>
        </ImageLink>
        <h2><Link to={url}>{title}</Link></h2>
        <PostDate>{moment(date).format("dddd, MMMM Do YYYY")}</PostDate>
        { excerpt.length > 0 &&
          <p>{excerpt}</p>
        }
        <p>{a_an} {rounded_time} minute read ({humanised_words} words)</p>
      </Item>
    );
};


