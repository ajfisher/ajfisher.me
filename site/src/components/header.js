import { Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import humanize from 'humanize-plus';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faClock } from '@fortawesome/free-solid-svg-icons';

import { device } from './devices';

const BaseHeader = styled.header`
  box-sizing: border-box;
  border-bottom: 2px solid var(--highlight);

  -webkit-box-shadow: 0 0.5rem 0.8rem #aaa;
     -moz-box-shadow: 0 0.5rem 0.8rem #aaa;
          box-shadow: 0 0.65rem 0.8rem #aaa;
`;

const TextHeader = styled(BaseHeader)`
  min-height: 50vh;
  margin: 0;
  padding: var(--gutter) 0;

  /** Put the background gradient in**/
  background-color: var(--darkened-grey);
  background: linear-gradient(45deg, var(--dark-base) 30%, var(--highlight) 100%);


  @media only screen and ${device.medium} {
    min-height: 60vh;
    max-height: 90vh;
    padding: var(--gutter) 0;
  }

  // put the little shadow along the bottom for big screens.
  @media only screen and ${device.large} {
    min-height: 70vh;
  }
`;

const ImageHeader = styled(BaseHeader)`
  background: var(--darkened-grey);

  .headerimage {
    min-height: 60vh;

    @media only screen and ${device.small} {
      min-height: 60vh;
    }

    @media only screen and ${device.medium} {
      min-height: 65vh;
    }

    @media only screen and ${device.large} {
      min-height: 40vh;
      max-height: 55vh;
    }

    @media only screen and ${device.wide} {
      max-height: 60vh;
    }
  }
`;

const OldImageHeader = styled(BaseHeader)`
  background-color: var(--darkened-grey);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  background-image: url(${props => props.$featuredimage.base});

  @media only screen and ${device.small} {
    background-image: url(${props => props.$featuredimage.small});
  }

  @media only screen and ${device.medium} {
    background-image: url(${props => props.$featuredimage.medium});
  }

  @media only screen and ${device.large} {
    background-image: url(${props => props.$featuredimage.large});
  }

  @media only screen and ${device.wide} {
    background-image: url(${props => props.$featuredimage.wide});
  }
`;

const Container = styled.div`
  margin:0;
  width: 100vw;
  margin-top: -10rem;
  padding-top: 0rem;
  padding-bottom: var(--gutter);
  position: relative;
  z-index: 2;

  @media only screen and ${device.small} {
    margin-top: -12rem;
    padding-bottom: calc(0.5 * var(--gutter));
  }
  @media only screen and ${device.medium} {
  }

  @media only screen and ${device.large} {
  }

  @media only screen and ${device.wide} {
    max-width: 1020px;
    margin: 0 auto;
    margin-top: -15rem;
  }
`

const StyledTitle = styled.h1`
  background-color: var(--light-base);
  padding: var(--gutter);
  color: var(--dark-base);
  width: min-content;
  min-width: 90vw;
  min-height: 12rem;
  box-sizing: border-box;
  font-size: 4rem;
  line-height: 4rem;
  margin: 0;

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

  @media only screen and ${device.small} {
    min-width: 80vw;
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
    min-width: 70vw;
  }

  @media only screen and ${device.wide} {
    min-width: 60vw;
  }
`;

const Para = styled.p`
  color: var(--light-text-colour);
  padding: 0 var(--gutter);
  font-size: 1.8rem;
  margin: var(--gutter) 0;
  margin-block-end: 0;
  box-sizing: border-box;
  width: min-content;
  min-width: 70vw;

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
    /**max-width: 61%;**/
    min-width: 60vw;
  }
`;

const PublishedDate = styled(Para)`
  color: var(--light-base);
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
  color: var(--lightened-grey);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: calc(0.5 * var(--gutter));
  min-width: 90vw;

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

const Header = ({
  title, date, excerpt, url,
  featured=false,
  featuredimage, featuredImageBy,
  smalltitle, largetitle,
  readingTime=0, wordCount={} }) => {

    let formatted_date;
    if (typeof(date) !== 'undefined') {
      formatted_date = moment(date).format('ddd, MMM Do YYYY');
    }

    const rounded_time = Math.ceil(readingTime) || 0;
    const humanised_words = humanize.compactInteger(wordCount.words, 1) || 0;

    const PostHeader = (typeof(featuredimage) === 'undefined') ? TextHeader : ImageHeader;
    const postimage = getImage(featuredimage);

    return (
      <PostHeader>
        <GatsbyImage image={postimage} alt="test" class="headerimage" />;
        <Container className="wrapper">
          { featured &&
            <Featured>Featured Post</Featured>
          }
          <Title url={url} smalltitle={smalltitle} largetitle={largetitle}>{title}</Title>
          { excerpt != null && excerpt.length > 0 &&
            <Lede>{excerpt}</Lede>
          }
          { typeof(date) !== 'undefined' &&
            <PublishedDate className="date">Published: {formatted_date}</PublishedDate>
          }
          { rounded_time > 0 &&
            <PostData className="postdata">
                <span>
                  <FontAwesomeIcon icon={faClock}/>
                </span>
                <span>
                {rounded_time} min
                ({humanised_words} words)
                </span>
            </PostData>
          }
          { typeof(featuredimage) !== 'undefined' &&
            featuredImageBy &&
            <PostData>
              <span>
                <FontAwesomeIcon icon={faCamera}/>
              </span>
              <span>{featuredImageBy}</span>
            </PostData>
          }
        </Container>
      </PostHeader>
    );
};

const OldHeader = ({ title, date, excerpt, url, featured=false, featuredimage,
  smalltitle, largetitle, readingTime={} }) => {

    let formatted_date;
    if (typeof(date) !== 'undefined') {
      formatted_date = moment(date).format('dddd, MMMM Do YYYY');
    }

    const rounded_time = Math.ceil(readingTime.minutes) || 0;
    const humanised_words = humanize.compactInteger(readingTime.words, 1) || 0;

    const PostHeader = (typeof(featuredimage) === 'undefined') ? TextHeader : OldImageHeader;

    return (
      <PostHeader $featuredimage={featuredimage}>
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

export { OldHeader, Header };
