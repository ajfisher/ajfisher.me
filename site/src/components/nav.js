import React from 'react';
import styled from 'styled-components';

import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import { device } from './devices';

const Navigation = styled.nav`

  padding: 0 var(--gutter);

  @media only screen and ${device.large} {
    padding: 0;
  }

  & ul {
    margin: 0 0 var(--gutter) 0;
    padding: 0;
    list-style-type: none;

    @media only screen and ${device.large} {
      margin: 0;
    }

    & li {
      font-size: 3.5rem;
      line-height: 4rem;
      margin: 0;

      @media only screen and ${device.large} {
        font-size: 2.8rem;
        line-height: inherit;
      }
    }

    & li:first-child {
      margin-top: 0;
    }

    & li.icons {
      font-size: 5rem;

      @media only screen and ${device.large} {
        font-size: 4rem;
      }

      & a {
        padding-right: calc(var(--gutter));

        @media only screen and ${device.large} {
          padding-right: calc(0.5 * var(--gutter));
        }
      }
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
    color: var(--dark-base);
  }
`;

const Nav = ({children}) => {

  return (
    <Navigation>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog/">Article archive</Link></li>
        <li><Link to="/who/">Who is @ajfisher</Link></li>
        <li><Link to="/colophon/">Colophon</Link></li>
        <li><Link to="/dis-everything/">Disclaimer & Disclosure</Link></li>
        <li className="icons">
          <OutboundLink title="@ajfisher on Twitter" href="https://twitter.com/ajfisher" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter}/>
          </OutboundLink>
          <OutboundLink title="@ajfisher on Github" href="https://github.com/ajfisher" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub}/>
          </OutboundLink>
          <OutboundLink title="@ajfisher on Instagram" href="https://instagram.com/andrewjfisher" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram}/>
          </OutboundLink>
          <OutboundLink title="Send ajfisher an email" href="mailto:ajfisher.td@gmail.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelope}/>
          </OutboundLink>
        </li>
      </ul>
    </Navigation>
  );
}

export default Nav;
