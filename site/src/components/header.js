import { Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import humanize from 'humanize-plus';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faClock, faNewspaper } from '@fortawesome/free-solid-svg-icons';

import { device } from './devices';

const BaseHeader = styled.header`
  background: var(--darkened-grey);
  background: -moz-radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );
  background: -webkit-radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );
  background: radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );

  box-sizing: border-box;
  border-bottom: 2px solid var(--highlight);

  margin: 0;

  -webkit-box-shadow: 0 0.5rem 0.8rem #aaa;
     -moz-box-shadow: 0 0.5rem 0.8rem #aaa;
          box-shadow: 0 0.65rem 0.8rem #aaa;

  .headerimage, .imagefill {
    min-height: 60vh;

    @media only screen and ${device.small} {
      min-height: 60vh;
    }

    @media only screen and ${device.medium} {
      min-height: 65vh;
    }

    @media only screen and ${device.large} {
      min-height: 40vh;
      max-height: 60vh;
    }

    @media only screen and ${device.wide} {
      max-height: 70vh;
    }
  }
`;

const TextHeader = styled(BaseHeader)`
  /**padding: var(--gutter) 0;**/

  /**
  @media only screen and ${device.medium} {
    min-height: 60vh;
    max-height: 90vh;
    padding: var(--gutter) 0;
  }

  @media only screen and ${device.large} {
    min-height: 70vh;
  }
  **/

  .imagefill {
    /** Put the background gradient in**/
    background-color: var(--darkened-grey);
    background: linear-gradient(45deg, var(--dark-base) 30%, var(--highlight) 100%);
  }
`;

const ImageHeader = styled(BaseHeader)`
  /** this is a noop as sizing handled in base **/
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
  min-height: 14rem;
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
    min-width: 67%;
    width: 67%;
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
    min-width: 67%;
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
  gap: calc(0.25 * var(--gutter));
  min-width: 100%;

  @media only screen and ${device.medium} {
    font-size: 2rem;
  }

  @container (min-width: 400px) {
    gap: calc(0.5 * var(--gutter));
  }
`;

const Title = ({
  children,
  url,
  smalltitle = false,
  largetitle = false
}) => {

  let classname;
  if (smalltitle) {
    classname = 'shrink';
  } else if (largetitle) {
    classname = 'enlarge';
  }

  if (typeof(url) === 'undefined' || url ==='' || url === null) {
    return(
      <StyledTitle className={classname}>{children}</StyledTitle>
    );
  } else {
    return(
      <StyledTitle as="h2" className={classname}><Link to={url}>{children}</Link></StyledTitle>
    );
  }
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string,
  smalltitle: PropTypes.bool,
  largetitle: PropTypes.bool,
};

const Featured = styled.p`
  color: var(--highlight);
  margin: calc(0.5 * var(--gutter)) var(--gutter);
  text-transform: uppercase;
  font-size: 1.8rem;
  text-decoration: underline;
`;

const Header = ({
  title,
  date = undefined,
  excerpt = ``,
  url = ``,
  featured=false,
  featuredimage=null, featuredImageBy,
  tagimage=null, postcount=null,
  smalltitle = false,
  largetitle = false,
  readingTime=0, wordCount={} }) => {

    if (!title) {
      throw new Error('Header component requires a title prop');
    }

    let formatted_date;
    if (typeof(date) !== 'undefined') {
      formatted_date = moment(date).format('ddd, MMM Do YYYY');
    }

    const rounded_time = Math.ceil(readingTime) || 0;
    const humanised_words = humanize.compactInteger(wordCount.words, 1) || 0;

    const PostHeader = (featuredimage === null) ? TextHeader : ImageHeader;

    let headerimage;
    if (featuredimage) {
      headerimage = getImage(featuredimage);
    } else if (tagimage) {
      headerimage = getImage(tagimage);
    }

    let pluralArticle = postcount > 1 ? 'articles' : 'article';

    return (
      <PostHeader>
        { featuredimage !== null &&
          <GatsbyImage image={headerimage} alt={featuredImageBy} className="headerimage" />
        }
        {
          tagimage !== null &&
          <GatsbyImage image={headerimage} className="headerimage" />
        }
        { featuredimage === null && tagimage === null &&
          <div className="imagefill" />
        }
        <Container className="wrapper">
          <Title url={url} smalltitle={smalltitle} largetitle={largetitle}>{title}</Title>
          { featured &&
            <Featured>Featured Post</Featured>
          }
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
          { postcount !== null &&
            <PostData>
              <span>
                <FontAwesomeIcon icon={faNewspaper}/>
              </span>
              <span>Read {postcount} {pluralArticle} in this topic.</span>
            </PostData>
          }
        </Container>
      </PostHeader>
    );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  excerpt: PropTypes.string,
  url: PropTypes.string,
  featured: PropTypes.bool,
  featuredimage: PropTypes.any, // use a more specific shape if you know its structure
  featuredImageBy: PropTypes.string,
  tagimage: PropTypes.any,
  postcount: PropTypes.number,
  smalltitle: PropTypes.bool,
  largetitle: PropTypes.bool,
  readingTime: PropTypes.number,
  wordCount: PropTypes.shape({
    words: PropTypes.number
  })
};

export default Header;

export { Header, PostData, Title };
