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
  background-image: url(${props => props.featuredImage.base});

  @media only screen and ${device.small} {
    background-image: url(${props => props.featuredImage.small});
  }

  @media only screen and ${device.medium} {
    background-image: url(${props => props.featuredImage.medium});
  }

  @media only screen and ${device.large} {
    background-image: url(${props => props.featuredImage.large});
  }

  @media only screen and ${device.wide} {
    background-image: url(${props => props.featuredImage.wide});
  }
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

  @media only screen and ${device.wide} {
    max-width: 1026px;
    margin: 0 auto;
  }
`

const StyledTitle = styled.h1`
  background-color: var(--base);
  padding: var(--gutter);
  margin: 0rem var(--gutter);
  color: var(--light-text-colour);
  min-height: 25vh;
  max-height: 35vh;
  width: min-content;
  min-width: 60vw;
  max-width: calc(100% - 2 * var(--gutter));
  border-radius: 0.2rem;
  box-sizing: border-box;
  font-size: 4rem;
  line-height: 4rem;

  &.enlarge {
    font-size: 5rem;
    line-height: 5rem;

    @media only screen and ${device.medium} {
      font-size: 6rem;
      line-height: 6rem;
    }

    @media only screen and ${device.large} {
      font-size: 7rem;
      line-height: 7rem;
    }
  }

  &.shrink {

    @media only screen and ${device.medium} {
      font-size: 4.5rem;
      line-height: 4.5rem;
    }

    @media only screen and ${device.large} {
      font-size: 5rem;
      line-height: 5rem;
    }
  }

  & a, & a:visited {
    background: none;
    padding: 0;
    color: inherit;
  }

  & a:hover, & a:visited:hover {
    color: var(--dark-grey);
  }

  @media only screen and ${device.medium} {
    padding: var(--gutter);
    max-width: 70vw;
    font-size: 5rem;
    line-height: 5rem;
  }

  @media only screen and ${device.large} {
    font-size: 6rem;
    line-height: 6rem;
    width: 61vw;
    max-height: 40vh;
  }

  @media only screen and ${device.wide} {
    min-width: unset;
    max-width: unset;
    min-height: 35vh;
    max-height: 45vh;
    margin: 0;
    width: 45%;
  }
`;

const Para = styled.p`
  color: var(--light-text-colour);
  padding: 0 var(--gutter);
  font-size: 1.8rem;
  margin: var(--gutter) 0;
  box-sizing: border-box;

  @media only screen and ${device.medium} {
    font-size: 2rem;
    padding: 0 var(--gutter);
    margin: calc(0.5 * var(--gutter)) 0;
  }

  @media only screen and ${device.large} {
    font-size: 2.2rem;
    max-width: 61vw;
  }

  @media only screen and ${device.wide} {
    max-width: 61%;
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

const Title = ({children, url, smalltitle, largetitle}) => {

  let classname;
  if (smalltitle) {
    classname = 'shrink';
  } else if (largetitle) {
    classname = 'enlarge';
  }

  if (typeof(url) === 'undefined') {
    return(
      <StyledTitle className={classname}>{children}</StyledTitle>
    );
  } else {
    return(
      <StyledTitle as="h2" className={classname}><Link to={url}>{children}</Link></StyledTitle>
    );
  }
};

Title.defaultProps = {
  smalltitle: false,
  largetitle: false
};

const Featured = styled.p`
  color: var(--highlight);
  margin: 0 var(--gutter);
  text-transform: uppercase;
  font-size: 1.8rem;
`;

const Header = ({ title, date, excerpt, url, featured=false, featuredImage,
  smalltitle, largetitle, readingTime={} }) => {

    const formatted_date = moment(date).format('dddd, MMMM Do YYYY');
    const rounded_time = Math.ceil(readingTime.minutes) || 0;
    const humanised_words = humanize.compactInteger(readingTime.words, 1) || 0;

    const PostHeader = (typeof(featuredImage) === 'undefined') ? TextHeader : ImageHeader;

    return (
      <PostHeader featuredImage={featuredImage}>
        <Container className="wrapper">
          { featured &&
            <Featured>Featured Post</Featured>
          }
          <Title url={url} smalltitle={smalltitle} largetitle={largetitle}>{title}</Title>
          { typeof(date) !== 'undefined' &&
            <PublishedDate className="date">Published: {formatted_date}</PublishedDate>
          }
          { excerpt != null && excerpt.length > 0 &&
            <Lede>{excerpt}</Lede>
          }
          { rounded_time > 0 &&
            <PostData className="postdata"><span className="worddata">A {rounded_time} minute read</span> {humanised_words} words</PostData>
          }
        </Container>
      </PostHeader>
    );
};

Header.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
};

Header.defaultProps = {
  title: ``,
  excerpt: ``,
  readingTime: {},
  smalltitle: false,
  largetitle: false,
  featured: false,
  date: undefined
};

export default Header;
