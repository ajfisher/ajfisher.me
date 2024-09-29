import React from 'react';
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
  const url = `/${pathDate(frontmatter.date)}/${frontmatter.slug}/`;

  const {title, date} = frontmatter;
  const featuredImage = frontmatter?.featureimage || null;
  const {imageby} = frontmatter;

  return (
    <>
      <Header featured='true' title={title} date={date}
        excerpt={excerpt} url={url}
        featuredimage={featuredImage} featuredImageBy={imageby}
        smalltitle={frontmatter.small_title} largetitle={frontmatter.large_title}
        readingTime={timeToRead} wordCount={wordCount} />
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
