import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import PageHead from '../components/page-head';

export const Head = () => {
  return (
    <>
      <PageHead
        title="This page cannot be found"
        description="The page you requested does not exist or has moved."
        type="website"
      />
    </>
  );
};

const NotFoundPage = ({location, data}) => {
  const { featureimage } = data?.headimage?.nodes[0];

  const featuredImage = featureimage || null;

  const title = 'This page cannot be found';
  const slug = '/404';
  const excerpt = `Hmmm, this is awkward. The page you’re looking for vanished into the ether or never existed in the first place. Either way, it’s not here. Let’s find you something better!`;

  return (
    <Layout slug={slug} title={title} excerpt={excerpt}
      largetitle="true" featuredimage={featuredImage}
    >
      <PageHead title={title}/>
      <section className="content">
        <p>You made a request for <strong>{location.pathname}</strong>.</p>
        <p>This page doesn&apos;t exist or has been moved permanently.</p>

        <h2>Where to next?</h2>
        <p>
          1. <Link to="/">Go to the home page</Link>: Check out recent articles
          and featured content.
        </p>
        <p>
          2. <Link to="/who">Learn more about ajfisher</Link>: Find out what I
          do and how I do it.
        </p>
        <p>
          3. <Link to="/blog">Explore all articles</Link>: Peruse the complete
          archive of published content.
        </p>
      </section>
    </Layout>
  );
};

NotFoundPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    headimage: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          featureimage: PropTypes.any, // refine if you know the image shape
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default NotFoundPage

export const pageQuery = graphql`
  query {
    headimage: allImageSharp(
      filter: {original: {
        src: {regex: "/404_page/"}
      }}
    ) {
      nodes {
        id
        featureimage: gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;
