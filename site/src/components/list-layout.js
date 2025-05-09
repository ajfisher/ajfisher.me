import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Nav from './nav';
import Footer from './footer';
import { ListArticle } from './article';
import { Aside, Main } from './layout';
import { pathDate } from '../lib/utils';

const Layout = ({ children, featured={}, slug}) => {

  // determine the featured article and pull it from the list.
  const {
    frontmatter={}, fields={},
    timeToRead, wordCount
  } = featured;
  const excerpt = frontmatter.excerpt || fields.excerpt || featured?.excerpt || '';

  // check if we're building a linkable page or not. If we're getting a featured
  // post then this will evaluate to be true so it can link through. If it's a
  // tag listing page then this won't be needed
  let url;
  if (frontmatter?.date && frontmatter?.slug) {
    url = `/${pathDate(frontmatter.date)}/${frontmatter.slug}/`;
  }

  const {title, date, imageby} = frontmatter;
  const featuredImage = frontmatter?.featureimage || null;
  const featurePost = frontmatter.featured || false;

  // this is used for tag listing pages to set a header image and number of posts
  const tagImage = frontmatter?.tagimage || null;
  const postCount = frontmatter?.postcount || null;

  return (
    <>
      <Header featured={featurePost} title={title} date={date}
        excerpt={excerpt} url={url}
        featuredimage={featuredImage} featuredImageBy={imageby}
        tagimage={tagImage} postcount={postCount}
        smalltitle={frontmatter.small_title} largetitle={frontmatter.large_title}
        readingTime={timeToRead} wordCount={wordCount} />
      <Main>
        <ListArticle>
          <section itemScope="" itemType="https://schema.org/Blog">{children}</section>
        </ListArticle>
        <Aside>
          <Nav/>
        </Aside>
      </Main>
      <Footer slug={slug}/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  featured: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
      ]),
      excerpt: PropTypes.string,
      slug: PropTypes.string,
      featureimage: PropTypes.any,
      featured: PropTypes.bool,
      small_title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ]),
      large_title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ]),
      tagimage: PropTypes.any,
      postcount: PropTypes.number,
    }),
    fields: PropTypes.shape({
      excerpt: PropTypes.string,
    }),
    timeToRead: PropTypes.number,
    wordCount: PropTypes.shape({
      words: PropTypes.number,
    }),
    excerpt: PropTypes.string,
  }),
  slug: PropTypes.string,
};

export default Layout;
