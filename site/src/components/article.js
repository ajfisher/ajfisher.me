import React from 'react';
import styled from 'styled-components';
import { Location } from '@reach/router';
import { graphql } from 'gatsby';

const Attribute = styled.p`
  font-size: 1.8rem;
`;

const Attribution = ({author, authorurl, featuredImageBy, featuredImageLink, title, pageurl}) => {

  return(
    <>
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
    </>
  );
};

const Article = ({children, featuredImageBy, featuredImageLink, title, url}) => {

  return(
    <article>
      {children}
      <Attribution title={title} author="ajfisher"
        authorurl="https://twitter.com/ajfisher" pageurl={url}
        featuredImageBy={featuredImageBy} featuredImageLink={featuredImageLink}
      />
    </article>
  );
};

export default Article;
