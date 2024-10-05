import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { device } from './devices';
import { Article } from './layout';
import { RelatedList, RelatedListItem } from './list';
import { TagList } from './tags';

const StyledListArticle = styled(Article)`

  & h1 {
    color: var(--dark-base);
    font-size: 3.5rem;
    padding: 0 var(--gutter);
    margin-bottom: 0;
  }

  & h1::first-letter {
    text-transform: uppercase;
  }

  & h2.list {
    font-size: 3rem;
  }

  & h2.home, h2.list {
    margin: calc(0.5 * var(--gutter)) var(--gutter);
    display: block;
    background: none;
    color: var(--dark-base);
    box-shadow: none;
    padding: 0;
  }

  & p {
    font-size: 2rem;
  }

  & p.tagintro {
    font-size: 1.8rem;
  }

  & li {
    & h2 {
      background: none;
      color: var(--dark-base);
      box-shadow: none;
      padding: 0;
      font-size: 3rem;
      margin: 0;
    }

    & p {
      font-size: 1.8rem;
      padding: 0;
    }

    & a, & a:visited {
      color: var(--dark-base);
      background: none;
      padding: 0;
    }

    & a:hover, & a:visited:hover {
      color: var(--dark-grey);
    }
  }
`;

const StyledPostArticle = styled(Article)`

  & figure.gatsby-resp-image-figure {
    width: 100%;
    margin-left: 0;
    position: relative;

    & span {
      max-width: 100% !important;
    }
  }

  & figcaption.gatsby-resp-image-figcaption {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    color: var(--light-text-colour);
    background: var(--dark-grey);
    padding: 0 0.5rem;
    font-size: 1.5rem;
  }

  & figure figcaption a {
    padding: 0;
  }

  & p.mediacontainer {
    height: 50vh;
    padding:0;
  }

  & p.mediacontainer.letterbox {
    height: 40vh;
  }

  & p iframe {
    max-width: calc(100% + 2 * var(--gutter)) !important;
    width: 100%;
    height: 100%;
    border: none;
  }

  & pre {
    overflow-x: scroll;

    & code {
      font-size: 1.5rem;
    }
  }

  & blockquote, & p.has-pullquote::before {
    font-style: italic;
    margin: auto var(--margin-indent);
    margin-right: 0;
    padding: 0 calc(var(--gutter) - var(--margin-indent) - 2px);
    padding-right: var(--gutter);
    border-left: 2px solid var(--accent);
  }

  & blockquote > p {
    padding: 0 !important;
  }

  & p.has-pullquote::before {
    content: attr(data-pullquote);
    display: block;
    font-family: var(--quote-font-family);
    font-weight: var(--heading-font-weight);
    font-style: normal;
    font-size: 4rem;
    color: var(--highlight);

    margin: inherit !important;
    margin-left: calc(-1 * var(--gutter) + var(--margin-indent)) !important;
  }
`;

const StyledAttribution = styled.aside`
  padding: calc(0.25 * var(--gutter)) 0;
  background: var(--light-bg-tint);
  border-bottom: 0.4rem solid var(--light-base);

  @media only screen and ${device.large} {
    border-radius: 0.2rem;
    border-bottom: none;
    border-top: 0.4rem solid var(--light-base);
    margin-bottom: var(--gutter);
  }
`;

const Attributes = styled.dl`
  margin: calc(0.5 * var(--gutter)) var(--gutter);
  display: grid;

  grid-template-rows: auto;

  @media only screen and ${device.medium} {
    grid-template-columns: 20% auto;
  }

  & dt {
    font-weight: bold;
    font-size: 1.8rem;

    @media only screen and ${device.medium} {
      font-weight: normal;
    }
  }

  & dd {
    margin: 0;
    margin-bottom: var(--gutter);
    font-size: 1.5rem;
    min-height: 2.4rem;

    @media only screen and ${device.medium} {
      margin-left: var(--gutter);
      margin-bottom: 0;
      font-size: 1.8rem;
    }
  }

  & dt.displaysmall, dd.displaysmall {
    @media only screen and ${device.large} {
      display: none;
    }
  }
`

const StyledRelatedPosts = styled.aside`

  & li p {
    padding: 0;
    font-size: 2.2rem;


    & a, & a:visited {
      color: var(--base);
    }

    & a:hover, & a:visited:hover {
      color: var(--dark-grey);
    }
  }
`;

const Attribute = ({name, showfull = true, children}) => {
  const displayClass = (showfull===true) ? "" : "displaysmall";
  return (
    <>
      <dt className={displayClass}>{name}</dt>
      <dd className={displayClass}>{children}</dd>
    </>
  );
};

export const Attribution = ({author, featuredImageBy,
    featuredImageLink, title, pageurl, date, tags}) => {
  let imageAttribution;
  if (featuredImageBy && featuredImageLink) {
    imageAttribution = ()=> {
      return (<><a href={featuredImageLink}>{featuredImageBy}</a></>);
    };
  } else {
    imageAttribution = ()=> {
      return (<>{featuredImageBy}</>);
    };
  }

  return(
    <StyledAttribution aria-label="Post attribution information">
      <h2>About this post</h2>
      <Attributes>
        <Attribute name="Title">"{title}"</Attribute>
        <Attribute name="Published on"
          showfull="false">{moment(date).format("dddd, MMMM Do YYYY")}</Attribute>
        {tags &&
          <Attribute name="Tags" showfull="false">
            <TagList>{tags}</TagList>
          </Attribute>
        }
        <Attribute name="Author" showfull="false">
          <a href="{authourl}">{author}</a>
        </Attribute>
        {featuredImageBy &&
          <Attribute name="Title image">
            {imageAttribution()}
          </Attribute>
        }
        <Attribute name="License">
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC
            BY-NC-SA 4.0 International License
          </a>
        </Attribute>
        <Attribute name="Permanent source"><a href={pageurl}>{pageurl}</a></Attribute>
      </Attributes>
    </StyledAttribution>
  );
};

export const PostArticle = ({children, featuredImageBy, featuredImageLink,
  title, url, relatedposts=[], date, tags}) => {
  const noPosts = 2;
  // filter any wrong posts first
  relatedposts = relatedposts.filter((item) => {
    return (item.post !== null);
  });
  relatedposts = relatedposts.slice(0,noPosts);

  return(
    <StyledPostArticle>
      {children}
      {relatedposts.length >= 2 &&
        <StyledRelatedPosts aria-label="Related content">
          <h2>Similar posts you might like</h2>
          <RelatedList>
            {relatedposts.map(({post}) => {

              const { slug, title, date,
                listimage, listimage_position } = post.frontmatter;

              return (
                <RelatedListItem key={slug} title={title} date={date}
                  slug={slug} image={listimage} position={listimage_position}
                />
              );
            })}
          </RelatedList>
        </StyledRelatedPosts>
      }
      <Attribution title={title} author="ajfisher" date={date}
        authorurl="https://twitter.com/ajfisher" pageurl={url}
        featuredImageBy={featuredImageBy} featuredImageLink={featuredImageLink}
        tags={tags}
      />
    </StyledPostArticle>
  );
};

export const ListArticle = ({children}) => {
  return(
    <StyledListArticle>
      {children}
    </StyledListArticle>
  );
};

const BaseArticle = ({children}) => {
  return(
    <Article>{children}</Article>
  );
}

export default BaseArticle;
