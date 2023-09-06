import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import PageHead from '../components/page-head';

export const Head = () => {
  return (
    <>
      <PageHead
        title="This page cannot be found | ajfisher.me"
        description="The page you requested does not exist or has moved."
        type="website"
      />
    </>
  );
};

const NotFoundPage = ({location}) => {
  console.log(location);
  const title = 'This page cannot be found';
  const slug = '/404';
  const excerpt = `Sometimes life is hard and doesn't give us what we want. This is one of those times. The page you have requested does not exist or has moved somewhere else.`;

  return (
    <Layout slug={slug} title={title} excerpt={excerpt} largetitle="true" >
      <PageHead title={title}/>
      <section class="content">
        <p>You made a request for <strong>{location.pathname}</strong>.</p>
        <p>Unfortunately this page doesn't exist or has been permanently moved
        somewhere else without a redirection.</p>
        <h2>Where to next?</h2>
        <p>Going back to the <Link to="/">home page</Link> will show you featured
          articles and recent posts.</p>
        <p>You can also <Link to="/who">learn about ajfisher</Link> if
          you want to find out more about what he does and where he works.</p>
        <p>Finally, if nothing else, you can check out <Link to="/blog">the full
          list of articles</Link> that have ever been published.</p>
      </section>
    </Layout>
  );
};

export default NotFoundPage
