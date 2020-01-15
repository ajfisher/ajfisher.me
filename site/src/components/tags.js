import React from 'react';
import styled from 'styled-components';

const TagPara = styled.p`
  margin-bottom: var(--gutter);

  & a {
    font-size: 2rem;
  }
`;

const Tag = ({children, className, href}) => {
  const gap = ` `;
  return <><a className={className} href={href}>{children}</a> </>
};

const Tags = ({children}) => {

  const tags = children.split(',').map(item => {
    return item.trim();
  });

  const taglist = tags.map((tagname) => {
    return <Tag href={`/tags/${tagname}`}>{tagname}</Tag>
  });

  return (
    <TagPara>Tagged: {taglist}</TagPara>
  );
};

export default Tags;
