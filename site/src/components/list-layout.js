import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { device } from './devices';

import PostHeader from './header';
import Nav from './nav';
import Footer from './footer';
import { Article, Aside, Main } from './layout';

const Layout = ({ children, slug}) => {

  return (
    <>
      <PostHeader/>
      <Main>
        <Article>
          {children}
        </Article>
        <Aside>
          <Nav/>
        </Aside>
      </Main>
      <Footer slug={slug}/>
    </>
  )
}

export default Layout;
