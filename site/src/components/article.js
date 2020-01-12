import React from 'react';
import styled from 'styled-components';
import { Location } from '@reach/router';
import { graphql } from 'gatsby';

import { device } from './devices';

const StyledArticle = styled.article`
  flex-grow: 1;
  align-self: flex-start;
  width: 100%;

  @media only screen and ${device.large} {
    flex-grow: 2;
    max-width: 61%;

    & section {
      padding: 0 3rem;
    }
  }

  & section h2, & section h3 {
    box-shadow: 2rem 0 0 var(--base), -2rem 0 0 var(--base);
    margin: 0;
    margin-left: 2rem;
    padding: 0px 0px 0.5rem;
    box-decoration-break: clone;
  }

  & section p,
  & section pre {
    padding: 0 2rem;
  }

  & section p {
    font-size: 2.2rem;
  }

  & section pre code {
    font-size: 2rem;
  }

  & section blockquote {
    margin: auto 0.2rem;
    margin-right: 0;
    padding: 0 1.6rem;
    padding-right: 2rem;

    & p {
      padding: 0;
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
