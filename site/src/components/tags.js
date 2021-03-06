import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { kebabCase } from '../lib/utils';

const TagPara = styled.p`
  margin-bottom: var(--gutter);

  & a {
    font-size: 2rem;
  }
`;

const Tag = ({children, className, href}) => {
  const gap = ` `;
  return <><Link className={className} to={kebabCase(href)}>{children}</Link> </>
};

const Tags = ({children}) => {

  if (children === null) return null;

  const taglist = children.map((tagname) => {
    return <Tag href={`/tagged/${tagname}/`} key={tagname}>{tagname}</Tag>
  });

  return (
    <TagPara>Tagged: {taglist}</TagPara>
  );
};

export default Tags;
