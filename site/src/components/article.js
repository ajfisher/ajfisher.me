import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { device } from './devices';

import { Article } from './layout';

const StyledListArticle = styled(Article)`

  & h1 {
    color: var(--base);
    font-size: 3rem;
    background: none;
    box-shadow: none;
    padding: 0 var(--gutter);
  }

  & h2 {
    background: none;
    color: var(--base);
    box-shadow: none;
    padding: 0;
    font-size: 3rem;

  }

  & a, & a:visited {
    color: var(--base);
    background: none;
    padding: 0;
  }

  & a:hover, & a:visited:hover {
    color: var(--dark-grey);
  }

  & p {
    font-size: 2rem;
    padding: 0;
  }

  & li p {
    font-size: 1.8rem;
  }
`;

const StyledPostArticle = styled(Article)`

  & h2, & h3 {
    box-shadow: var(--gutter) 0 0 var(--base), calc(var(--gutter) * -1) 0 0 var(--base);
    margin: 0;
    margin-left: var(--gutter);
    padding: 0px 0px 0.5rem;
    box-decoration-break: clone;
  }

  & h4 {
    margin: 0 var(--gutter);
  }

  & p.mediacontainer {
    height: 50vh;
  }

  & p iframe {
    margin-left: calc(-1 * var(--gutter));
    width: 100vw;
    max-width: calc(100% + 2 * var(--gutter)) !important;
    height: 100%;
  }

  & pre {
    overflow-x: scroll;

    & code {
      font-size: 1.5rem;
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
`;

const Attribute = styled.p`
  font-size: 1.8rem !important;
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

export const PostArticle = ({children, featuredImageBy, featuredImageLink, title, url}) => {

  return(
    <StyledPostArticle>
      {children}
      <Attribution title={title} author="ajfisher"
        authorurl="https://twitter.com/ajfisher" pageurl={url}
        featuredImageBy={featuredImageBy} featuredImageLink={featuredImageLink}
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
