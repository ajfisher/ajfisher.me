import React from 'react';
import styled from 'styled-components';

import { device } from './devices';

const Navigation = styled.nav`

  padding: 0 2rem;

  & ul {
    margin: 0 0 3rem 0;
    padding: 0;
    list-style-type: none;

    & li {
      font-size: 4rem;
      margin: 0.6rem 0;
    }

    & li:first-child {
      margin-top: 0;
    }
  }

  & a {
    text-decoration: none;
    color: var(--dark-grey);
    font-family: var(--heading-font-family);
    font-weight: var(--heading-font-weight);
    background: none;
    padding: 0;
  }

  & a:hover, & a:visited:hover {
    background: none;
    color: var(--base);
  }
`;

const Nav = ({children}) => {

  return (
    <Navigation>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/blog">Article archive</a></li>
        <li><a href="/who">Who is @ajfisher</a></li>
        <li><a href="/dis-everything">Disclaimer & Disclosure</a></li>
        <li className="icons">
          <a href="https://twitter.com/ajfisher" target="_blank"><i class="fa fa-tw"></i></a>
          <a href="https://github.com/ajfisher" target="_blank"><i class="fa fa-github"></i></a>
          <a href="https://instagram.com/andrewjfisher" target="_blank"><i class="fa fa-insta"></i></a>
          <a href="mailto:ajfisher.td@gmail.com" target="_blank"><i class="fa fa-envelope-o"></i></a>
        </li>
      </ul>
    </Navigation>
  );
}

export default Nav;
