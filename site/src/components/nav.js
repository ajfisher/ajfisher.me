import React, { useState } from 'react';
import styled from 'styled-components';

import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { device } from './devices';

const NavButton = styled.button`

  display: inline-block;
  z-index: 103; // place above content
  transform: ${({ isOpen }) => isOpen ? 'rotate(90deg)' : 'none'};

  position: fixed;
  top: calc(0.5 * var(--gutter));
  right: calc(0.5 * var(--gutter));
  padding: calc(0.5 * var(--gutter));
  border: none;

  background-color: transparent;
  font-size: 3rem;
  color: var(--base);
  transition: all 0.8s ease;

  @media only screen and ${device.large} {
    display: none;
  }

  &:hover {
    color: var(--dark-text-colour);
  }
`;

const NavMenuOverlay = styled.div`

  // this puts in the overlay to darken the rest of the page
  // in order to focus the nav drawer
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 101;

  @media only screen and ${device.large} {
    display: none;
  }
`;

const NavDrawer = styled.nav`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 102;

  top: 0;
  right: ${({ isOpen }) => isOpen ? '0' : '-100%'};
  height: 100%;
  width: 75vw;

  padding: var(--gutter);

  background: var(--light-text-colour);
  transition: right 0.5s ease-in-out;

  @media only screen and ${device.medium} {
    width: 60vw;
  }

  @media only screen and ${device.large} {
    display: none;
  }
`;

const MainNavigation = styled.nav`

  display: none;

  @media only screen and ${device.large} {
    display: block;
    padding: 0;
  }

`;

const NavItems = styled.ul`

  margin: 0;
  padding: 0;

  list-style-type: none;

  & li {
    font-size: 3rem;
    line-height: 5rem;
    margin: 0;

    @media only screen and ${device.medium} {
      font-size: 3.5rem;
      line-height: 4.8rem;
    }

    @media only screen and ${device.large} {
      font-size: 2.8rem;
      line-height: 3.5rem;
    }
  }

  & li:first-child {
    margin-top: 0;
  }

  & li.icons {
    font-size: 4.2rem;
    line-height: 6rem;

    @media only screen and ${device.medium} {
      font-size: 5rem;
    }

    @media only screen and ${device.large} {
      font-size: 3.5rem;
    }

    @media only screen and ${device.wide} {
      font-size: 4rem;
    }

    & a {
      padding-right: calc(var(--gutter));

      @media only screen and ${device.large} {
        padding-right: calc(0.5 * var(--gutter));
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

const Navigation = () => {

  return (
    <NavItems>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/blog/">Article archive</Link></li>
      <li><Link to="/who/">Who is @ajfisher</Link></li>
      <li><Link to="/colophon/">Colophon</Link></li>
      <li><Link to="/dis-everything/">Disclaimer & Disclosure</Link></li>
      <li className="icons">
        <OutboundLink title="@ajfisher on Github" href="https://github.com/ajfisher" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub}/>
        </OutboundLink>
        <OutboundLink title="@ajfisher on Instagram" href="https://instagram.com/andrewjfisher" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram}/>
        </OutboundLink>
        <OutboundLink title="Send ajfisher an email" href="mailto:ajfisher.td@gmail.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEnvelope}/>
        </OutboundLink>
        <OutboundLink title="@ajfisher on Twitter" href="https://twitter.com/ajfisher" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter}/>
        </OutboundLink>
        <OutboundLink title="@ajfisher on LinkedIn" href="https://www.linkedin.com/in/andrewfisher/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin}/>
        </OutboundLink>
      </li>
    </NavItems>
  );
}


const Nav = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavButton onClick={toggleMenu} isOpen={isOpen}>
        <FontAwesomeIcon icon={faBars}/>
      </NavButton>
      <NavMenuOverlay isOpen={isOpen} onClick={toggleMenu}/>
      <NavDrawer isOpen={isOpen}>
        <Navigation/>
      </NavDrawer>
      <MainNavigation>
        <Navigation/>
      </MainNavigation>
    </>
  );
}

export default Nav;
