import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { device } from './devices';

import Header from './header';
import Nav from './nav';
import Footer from './footer';
import { ListArticle } from './article';
import { Aside, Main } from './layout';
import { getPostImages } from './list';

const Layout = ({ children, featured={}, slug}) => {

  // todo determine the featured article and pull it from the list.
  const {frontmatter={}, fields={}} = featured;
  const excerpt = frontmatter.excerpt || fields.excerpt || '';

  console.log(frontmatter);
  const url = `/${frontmatter.date}/${frontmatter.slug}`;

  let featuredImage;

  if (frontmatter.featured && frontmatter.featureimage !== null) {
    if (frontmatter.featureimage.startsWith('/img/')) {
      frontmatter.featureimage = frontmatter.featureimage.substring(5);
    }

    const { postItemImages } = getPostImages();
    const featuredFluid = postItemImages.edges.find(({node}) => {
      if (node.relativePath == frontmatter.featureimage) return node;
    });

    featuredImage = featuredFluid.node.childImageSharp.fluid.src;
  }

  console.log(featuredImage);

  return (
    <>
      <Header featured='true' title={frontmatter.title} date={frontmatter.date}
        excerpt={excerpt} featuredImage={featuredImage} url={url}
        readingTime={fields.readingTime} />
      <Main>
        <ListArticle>
          <section>{children}</section>
        </ListArticle>
        <Aside>
          <Nav/>
        </Aside>
      </Main>
      <Footer slug={slug}/>
    </>
  )
}

export default Layout;
