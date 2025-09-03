import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import PageHead from '../components/page-head';
import Layout from '../components/post-layout';

export const Head = () => {
  return (
    <>
      <PageHead
        title="AI Engineering | ajfisher"
        description="Information for software engineers using AI agents"
        type="article"
      />
    </>
  );
};


const AIEngPage = ({data}) => {
  const { featureimage } = data?.headimage?.nodes[0];

  const featuredImage = featureimage || null;

  const title = 'Resources, materials and links for AI Engineering';
  const slug = '/aieng';
  const date = '2024-06-16 14:00:00+1000';
  const excerpt = `Slides, links and other resources you'll be able to find
    below. Don't forget to sign up if you want to get more information about
    additional content.
  `;
  const tags = ['thinking', 'business', 'innovation'];

  const frontmatter = {
    title,
    date,
    excerpt,
    slug,
    large_title: false,
  };

  return (
    <Layout frontmatter={frontmatter} tags={tags}
      path='/aieng' featuredimage={featuredImage}
    >
      <PageHead title={title}/>
      <section className="content">
        <p>Thanks for attending my recent talk. Below you&apos;ll find some resources
          that I think may be helpful for your AI engineering journey.</p>

        <p>You can view the slides from my talk below, or alternatively <a
          href="https://aieng.ajf.io/">visit the site</a> for the large
          version.</p>

        <p className="mediacontainer"><iframe title="AI Engineering Slides"
          src="https://aieng.ajf.io/?embed"></iframe></p>

        <p>Slides from my recent talk at Web Directions Code Leaders, including
          notes, are <a
            href="https://aieng.ajf.io/static/follow_me_talk.pdf">available here for
          download (PDF 60MB)</a>.</p>

        <h3>Resources</h3>

        <p>These are some resources that I&apos;ve found that have been genuinely
          helpful. If you come across something you think should be on here then
          please reach out to me and let me know</p>

        <h4>Articles and documents</h4>
        <p>These are articles, documents or tools I&apos;ve found helpful:</p>
        <p>
          <ul>
            <li>Practical explanation on <a
                  href="https://www.coachforsuccess.com/3-steps-to-create-relationship-maps-for-professional-success/">
                relationship maps
              </a> and how to use them.
            </li>
            <li>How to pull together a <a
              href="https://www.teamagile.no/vi-deler/teamcontract">team contract</a> /
                social contract
            </li>
            <li>An alternative approach to a <a
              href="https://theteamcanvas.com/learn/">team canvas</a> using a
                web based tool
            </li>
            <li><a href="https://hbr.org/">hbr.org</a> - an outstanding
              resource for management content. Yes, you need to get a subscription
              but you can expense it.
            </li>
            <li>Why capabilities in your people are key - <a
              href="https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/to-lead-in-the-postcrisis-tomorrow-put-leadership-and-capabilities-in-place-today"
              >McKinsey</a>.
            </li>
            <li>How to <a
              href="https://www.linkedin.com/pulse/nurturing-relationships-heart-networking-cath-andrew-duacc"
              >nurture relationships</a> - by Cath Andrew - a great HR leader.
            </li>
          </ul>
        </p>

        <h4>Podcasts and other media</h4>
        <p>If you like to listen, these are some podcasts that I think are worth
          your time:</p>
        <p>
          <ul>
            <li><a
              href="https://amantha.com/podcast/">How I Work</a>
                - by Amantha Imber. Practical tips around productivity but a lot
                of it relates to how you can manage your team too.
            </li>
            <li><a
              href="https://hbr.org/2018/01/podcast-ideacast">HBR Ideacast</a>.
                Different management and leadership topics as well as some
                general business - often linked back to articles or further details.
            </li>
          </ul>
        </p>

        <h3>Where to next?</h3>

        <p>The <Link to="/">home page</Link> will give you featured
          articles and recent posts.</p>
        <p>You can also check out <Link to="/blog">the full
          list of articles</Link> that have ever been published.</p>

      </section>
    </Layout>
  );
};

AIEngPage.propTypes = {
  data: PropTypes.shape({
    headimage: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          featureimage: PropTypes.any,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default AIEngPage;

export const pageQuery = graphql`
  query {
    headimage: allImageSharp(
      filter: {original: {
        src: {regex: "/enterprise_ai_future-/"}
      }}
    ) {
      nodes {
        id
        featureimage: gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;