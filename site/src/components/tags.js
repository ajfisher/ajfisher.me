import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { device } from './devices';
import { kebabCase } from '../lib/utils';

const TagPara = styled.p`
  display: none;

  @media only screen and ${device.large} {
    display: block;

    margin-bottom: var(--gutter);
    & a {
      font-size: 2rem;
      background: var(--dark-grey);
      padding: 0 0.5rem;
      border-radius: 0.2rem;
    }

    & a:hover, a:visited:hover {
      color: var(--light-base);
    }
  }
`;

const Tag = ({children, className, href}) => {
  return <><Link className={className} to={kebabCase(href)}>{children}</Link> </>
};

const Tags = ({children}) => {
  if (children?.length > 0) {
    return (
      <TagPara>Tags:<br/><TagList>{children}</TagList></TagPara>
    );
  }

  return;
};

export const TagList = ({children}) => {
  // provides a raw list of the tags unformatted
  if (children === null) return null;

  const taglist = children.map((tagname) => {
    return <Tag href={`/tagged/${tagname}/`} key={tagname}>{tagname}</Tag>
  });

  return (<>{taglist}</>)
}

export default Tags;
