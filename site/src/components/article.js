import React from 'react';
import styled from 'styled-components';
import { Location } from '@reach/router';
import { graphql } from 'gatsby';

import { device } from './devices';

const StyledArticle = styled.article`
  width: 100%;

  @media only screen and ${device.large} {
    /** Article is a flex item when it's bigger **/
    flex-grow: 2;
    align-self: flex-start;
    width: 61vw;

    & section {
      /**padding: 0 3rem;**/
    }
  }

  & section {

    & h2, & h3 {
      box-shadow: var(--gutter) 0 0 var(--base), calc(var(--gutter) * -1) 0 0 var(--base);
      margin: 0;
      margin-left: var(--gutter);
      padding: 0px 0px 0.5rem;
      box-decoration-break: clone;
    }

    h4 {
      margin: 0 var(--gutter);
    }

    & p, & pre {
      padding: 0 var(--gutter);
    }

    & p, & ul > li {
      font-size: 2rem;

      @media only screen and ${device.large} {
        font-size: 2.2rem;
      }
    }

    & ul {
      margin: 0 var(--gutter);
      margin-left: calc(-1 * var(--gutter));
    }

    & p img {
      width: 100%;
    }

    & p iframe {
      margin-left: calc(-1 * var(--gutter));
      width: 100vw;
      max-width: calc(100% + 2 * var(--gutter)) !important;
    }

    & pre {
      overflow-x: scroll;

      & code {
        font-size: 2rem;
      }
    }

    & blockquote {
      margin: auto var(--margin-indent);
      margin-right: 0;
      padding: 0 calc(var(--gutter) - var(--margin-indent) - 2px);
      padding-right: var(--gutter);

      & p {
        padding: 0;
      }
    }
  }

  & section.attribution p {
    font-size: 1.8rem;
  }
`;

const Attribute = styled.p`
  font-size: 1.8rem;
`;

const Attribution = ({author, authorurl, featuredImageBy, featuredImageLink, title, pageurl}) => {

  return(
    <section className="attribution">
      {featuredImageBy && featuredImageLink &&
        <Attribute>
          Title image by <a href={featuredImageLink}>{featuredImageBy}</a>
        </Attribute>
      }
      <Attribute>
        "{title}" by <a href={authorurl}>{author}</a> is licensed under
         a <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
          CC BY-NC-SA 4.0 International License
        </a>.
      </Attribute>
      <Attribute>
        Permanent source for attribution: <a href={pageurl}>{pageurl}</a>.
      </Attribute>
    </section>
  );
};

const Article = ({children, featuredImageBy, featuredImageLink, title, url}) => {

  return(
    <StyledArticle>
      {children}
      <Attribution title={title} author="ajfisher"
        authorurl="https://twitter.com/ajfisher" pageurl={url}
        featuredImageBy={featuredImageBy} featuredImageLink={featuredImageLink}
      />
    </StyledArticle>
  );
};

export default Article;
