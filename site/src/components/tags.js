import React from 'react';
import styled from 'styled-components';

const LinkedTag = ({children, className, href}) => {
  return <a className={className} href={href}>{children}</a>
};

const Tag = styled(LinkedTag)`
  font-size: 2rem;
  white-space: nowrap;
  margin-right: 0.5rem;
`;

const Tags = ({children}) => {

  const tags = children.split(',').map(item => {
    return item.trim();
  });

  const taglist = tags.map((tagname) => {
    return <Tag href={`/tags/${tagname}`}>{tagname}</Tag>
  });

  return (
    <p>Tagged: {taglist}</p>
  );
};

export default Tags;
