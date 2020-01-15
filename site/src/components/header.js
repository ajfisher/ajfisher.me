import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import humanize from 'humanize-plus';
import moment from 'moment';

import { device } from './devices';
const TextHeader = styled.header`
  box-sizing: border-box;
  border-bottom: 2px solid var(--highlight);
  min-height: 63vh;
  margin: 0;
  padding: var(--gutter) 0;

  /** Put the background gradient in**/
  background: var(--darkened-grey);
  background: -moz-radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );
  background: -webkit-radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );
  background: radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );

  -webkit-box-shadow: 0 0.5rem 0.8rem #aaa;
     -moz-box-shadow: 0 0.5rem 0.8rem #aaa;
          box-shadow: 0 0.65rem 0.8rem #aaa;

  @media only screen and ${device.medium} {
    min-height: 70vh;
    max-height: 90vh;
    padding: var(--gutter) 0;
  }

  // put the little shadow along the bottom for big screens.
  @media only screen and ${device.large} {
  }
`;

const ImageHeader = styled(TextHeader)`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.featuredImage});
`;

const Container = styled.div`
  margin:0;
  width: 100vw;
  padding-top: 0rem;

  @media only screen and ${device.medium} {
    /** width: 90vw;
    margin: 0 5vw;**/
  }

  @media only screen and ${device.large} {
    max-width: 687px;
  }
`

const Title = styled.h1`
  background-color: var(--base);
  padding: var(--gutter);
  margin: 0rem var(--gutter);
  color: var(--light-text-colour);
  min-height: 25vh;
  max-height: 35vh;
  width: min-content;
  min-width: 60vw;
  max-width: 70vw;
  border-radius: 0.2rem;

  @media only screen and ${device.medium} {
    padding: var(--gutter);
    /** margin-top: 9rem; **/
  }

  @media only screen and ${device.large} {
    /**min-height: 35rem;**/
    /**margin: 0;**/
    font-size: 6rem;
    line-height: 6rem;
  }
`;

const Para = styled.p`
  color: var(--light-text-colour);
  padding: 0 var(--gutter);
  font-size: 2rem;
  margin: var(--gutter) 0;

  @media only screen and ${device.medium} {
    font-size: 2.2rem;
    padding: 0 var(--gutter);
    margin: calc(0.5 * var(--gutter)) 0;
  }
`;

const PublishedDate = styled(Para)`
  color: var(--base);
`;

const Lede = styled(Para)`
  font-size: 1.8rem;
  font-weight: normal;

  @media only screen and ${device.medium} {
    font-size: 2.2rem;
  }
`;

const PostData = styled(Para)`
  font-size: 1.8rem;
  margin-bottom: 0;

  & span {
    color: var(--highlight);
  }

  @media only screen and ${device.medium} {
    font-size: 2rem;
  }
`;

const PostHeader = ({ title, date, excerpt, featuredImage, readingTime }) => {

  const formatted_date = moment(date).format('dddd, MMMM Do YYYY');
  const rounded_time = Math.ceil(readingTime.minutes);
  const humanised_words = humanize.compactInteger(readingTime.words, 1);

  const Header = (typeof(featuredImage) === 'undefined') ? TextHeader : ImageHeader;

  return (
    <Header featuredImage={featuredImage}>
      <Container className="wrapper">
        <Title className="title">{title}</Title>
        <PublishedDate className="date">Published: {formatted_date}</PublishedDate>
        { excerpt.length > 0 &&
          <Lede>{excerpt}</Lede>
        }
        { rounded_time > 0 &&
          <PostData className="postdata"><span className="worddata">A {rounded_time} minute read</span> {humanised_words} words</PostData>
        }
      </Container>
    </Header>
  );
};

PostHeader.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
};

PostHeader.defaultProps = {
  title: ``,
  excerpt: ``,
};

export default PostHeader;
