import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import { graphql } from 'gatsby';

// import { device } from './devices';

import Header from './header';
import Nav from './nav';
import Footer from './footer';
import { ListArticle } from './article';
import { Aside, Main } from './layout';
import { getPostImages } from './list';
import { pathDate } from '../lib/utils';

const Layout = ({ children, featured={}, slug}) => {

  // determine the featured article and pull it from the list.
  const {frontmatter={}, fields={}} = featured;
  const excerpt = frontmatter.excerpt || fields.excerpt || '';
  const url = `/${pathDate(frontmatter.date)}/${frontmatter.slug}/`;

  let featuredImage;

  if (frontmatter.featured && frontmatter.featureimage !== null) {
    if (frontmatter.featureimage.startsWith('/img/')) {
      frontmatter.featureimage = frontmatter.featureimage.substring(5);
    }
    if (! frontmatter.featureimage.startsWith('posts/')) {
      frontmatter.featureimage = 'posts/' + frontmatter.featureimage;
    }

    const { postItemImages } = getPostImages();
    const featuredImageSet = postItemImages.edges.find(({node}) => {
      if (node.relativePath === frontmatter.featureimage) return node;

      return null;
    });

    if (featuredImageSet) {
      const {childImageSharp: img} = featuredImageSet.node;
      featuredImage = {
        base: img.duo_base.src,
        small: img.duo_small.src,
        medium: img.duo_medium.src,
        large: img.duo_large.src,
        wide: img.duo_wide.src
      };
    }
  }

  return (
    <>
      <Header featured='true' title={frontmatter.title} date={frontmatter.date}
        excerpt={excerpt} featuredimage={featuredImage} url={url}
        smalltitle={frontmatter.small_title} largetitle={frontmatter.large_title}
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
