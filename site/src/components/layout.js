/** Core site layout **/
import React from 'react'
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import PostHeader from './header';
import Article from './article';

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
  featuredImage, featuredImageBy, featuredImageLink, path, readingTime}) => {

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
          <postdata>Here is the post data</postdata>
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
