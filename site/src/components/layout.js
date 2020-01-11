/** Core site layout **/
import React from 'react'
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Article from './article';
import PostHeader from './header';
import PostData from './postdata';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteURL
          }
        }
      }
    `,
  );
  return site.siteMetadata;
};

const Layout = ({ children, title, date, excerpt,
  featuredImage, featuredImageBy, featuredImageLink, path, readingTime, tags}) => {

  const {siteURL} = useSiteMetadata();
  const urlpath = `${siteURL}${path}`;

  return (
    <>
      <PostHeader title={title} date={date}
        excerpt={excerpt} featuredImage={featuredImage}
        readingTime={readingTime} />
      <main className="wrapper">
        <Article title={title} url={urlpath}
          featuredImageBy={featuredImageBy} featuredImageLink={featuredImageLink}>
            {children}
        </Article>
        <aside>
          <nav>Here is the nav</nav>
          <PostData tags={tags} title={title} publicationDate={date} author="ajfisher"/>
        </aside>
      </main>
      <footer>
        © {new Date().getFullYear()}, Built with
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
