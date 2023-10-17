import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import { device } from './devices';
import Tags from './tags';

const Published = styled.p`
  display: none;

  @media only screen and ${device.large} {
    display: inline;

    font-size: 2rem;
    color: var(--light-text-colour);
    background: var(--dark-grey);
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;

    box-shadow: none;
    padding: 0.5rem;
    border-bottom: 0.4rem solid var(--light-base);
    border-radius: 0.2rem;
  }
`;

const Section = styled.section`
  padding: 0 var(--gutter);

  @media only screen and ${device.large} {
    padding: 0;
  }
`;

const Title = styled.h2`
  display: none;

  @media only screen and ${device.large} {
    display: block;
    font-size: 3rem;
    color: var(--dark-base);
    margin: var(--gutter) 0;
    line-height: 0.9;
  }

  @media only screen and ${device.wide} {
    font-size: 4rem;
  }
`;

const PostData = ({author='ajfisher', title, tags, publicationDate}) => {
  return (
    <Section className="postdata">
      <Title>{title}</Title>
      <Published>
        Published on {moment(publicationDate).format("dddd, MMMM Do YYYY")} by {author}
      </Published>
      <Tags>{tags}</Tags>
    </Section>
  );
};

export default PostData;
