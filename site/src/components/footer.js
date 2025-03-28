import { Link, useStaticQuery, graphql} from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { device } from './devices';
import { ImageLink } from './list';
import { pathDate } from '../lib/utils';

const StyledFooter = styled.footer`
  box-sizing: border-box;
  border-top: 2px solid var(--highlight);
  margin: 0;
  padding-bottom: var(--gutter);

  /** Put the background gradient in**/
  background: var(--darkened-grey);
  background: -moz-radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );
  background: -webkit-radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );
  background: radial-gradient(circle, var(--dark-grey) 0%, var(--darkened-grey) 100% );

  & ::selection {
    background: var(--light-base);
  }
`;

export const FooterImageLink = styled(ImageLink)`
  border-bottom: 0.5rem solid var(--highlight);
  border-radius: 0.2rem;

  :hover {
    border-bottom: 0.5rem solid var(--light-base);
    border-radius: 0.2rem;
  }
`;

const FooterContainer = styled.div`
  margin:0;
  width: 100vw;
  padding-top: 0rem;

  color: var(--light-text-colour);

  @media only screen and ${device.medium} {
  }

  @media only screen and ${device.large} {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: space-between;

  }

  @media only screen and ${device.wide} {
    max-width: 1020px;
  }

  & section {
    padding: 0 var(--gutter);

    @media only screen and ${device.large} {
      align-self: flex-start;
      width: 30%;
    }

    & p {
      font-size: 2rem;
      margin: var(--gutter) 0;

      @media only screen and ${device.large} {
        margin: calc(0.5 * var(--gutter)) 0;
      }

      & a, & a:visited {
        background: none;
        padding: 0;
      }
    }

    & div {

      & a, & a:visited {
        background: none;
        padding: 0;
      }
    }

  }
`;

const Title = styled.h2`
  color: var(--highlight);
  font-size: 3rem;
  margin: var(--gutter) 0;

  @media only screen and ${device.large} {
    margin: calc(0.5 * var(--gutter)) 0;
  }
`;

const PostItem = ({title, image, url, excerpt}) => {

  const postImage = getImage(image);

  return <>
    <FooterImageLink>
      <Link to={url || '/'}>
        <GatsbyImage image={postImage} alt={title} />
      </Link>
    </FooterImageLink>
    <p><Link to={url || '/'}>{title}</Link></p>
    { excerpt.length > 0 &&
      <p>{excerpt}</p>
    }
  </>;
};

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  url: PropTypes.string,
  excerpt: PropTypes.string.isRequired,
}

const Footer = ({slug}) => {

  const data = useStaticQuery(graphql`query footerImageQuery {
  responsiveDesign: file(relativePath: {eq: "posts/responsive_design.jpg"}) {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
  jsRobotics: file(relativePath: {eq: "posts/make_js_robots.jpg"}) {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
  podcast: file(relativePath: {eq: "posts/enterprise_ai.jpg"}) {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
  featuredPosts: allMarkdownRemark(
    filter: {frontmatter: {featured: {eq: true}}}
    sort: {frontmatter: {date: DESC}}
    limit: 4
  ) {
    edges {
      node {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          listimage {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
              )
            }
          }
          listimage_position
          excerpt
          slug
        }
      }
    }
  }
}`);

  // get the featured article
  const featuredPosts = data.featuredPosts.edges.map((edge) => {
    return edge.node.frontmatter;
  });

  let featured = featuredPosts[0]; // latest

  // there's some logic to this:
  // If we're on the URL of the post that is most recent, then we should
  // choose the second post in the list instead.
  // Similarly if we're on the home page then the most recent featured post
  // will be at the top so we should get the 4th one from the list as it will
  // be dropped off the top list
  // Additionally, do a check to see if the post happens to be something we're
  // also prioritising in the footer.
  // make sure we don't feature the current post on itself
  if (slug === '/') {
    // home page - take the 4th item from the featured list
    featured = featuredPosts[3];
  } else if (featured.slug === slug) {
    // we're on the same page so choose the next one
    featured = featuredPosts[1]; // second latest
  }
  // specifically test if we've landed on the same as the other post
  if (featured.slug === 'podcast-enterprise-ai') {
    featured = featuredPosts[2]; // take t
  }

  featured.url = `/${pathDate(featured.date)}/${featured.slug}/`;

  return (
    <StyledFooter>
      <FooterContainer>
        <section>
          <Title>Featured Post</Title>
          <PostItem url={featured.url} title={featured.title}
            excerpt={featured.excerpt} image={featured.listimage}
            imagePosition={featured.listimage_position} />
        </section>
        <section>
          <Title>Recent Media</Title>
          <FooterImageLink>
            <Link to="/2023/02/12/podcast-enterprise-ai/">
              <GatsbyImage
                image={data.podcast.childImageSharp.gatsbyImageData}
                alt="Generative AI in the enterprise" />
            </Link>
          </FooterImageLink>
          <p>
            <Link to="/2023/02/12/podcast-enterprise-ai/">
              ChatGPT and Generative AI in the enterprise
            </Link>
          </p>
          <p>
            Sitting down with other technology leaders, we discuss what risks
            and rewards may exist as AI enters the workplace at scale.
          </p>
        </section>
        <section>
          <Title>My Books</Title>
          <FooterImageLink $position="50% 100%">
            <OutboundLink href="https://www.amazon.com/JavaScript-Robotics-Johnny-Five-Raspberry-BeagleBone/dp/1457186950/">
              <GatsbyImage
                image={data.jsRobotics.childImageSharp.gatsbyImageData}
                alt="Make JavaScript Robotics Book Cover" />
            </OutboundLink>
          </FooterImageLink>
          <p>
            <OutboundLink href="https://www.amazon.com/JavaScript-Robotics-Johnny-Five-Raspberry-BeagleBone/dp/1457186950/">
              Make: JavaScript Robotics
            </OutboundLink>
          </p>
          <FooterImageLink $position="50% 85%">
            <OutboundLink href="https://www.amazon.com/Jump-Start-Responsive-Web-Design/dp/0987332163/">
              <GatsbyImage
                image={data.responsiveDesign.childImageSharp.gatsbyImageData}
                alt="Jump Start Responsive Design Book Cover" />
            </OutboundLink>
          </FooterImageLink>
          <p>
            <OutboundLink href="https://www.amazon.com/Jump-Start-Responsive-Web-Design/dp/0987332163/">
              Jump Start Responsive Web Design
            </OutboundLink>
          </p>
        </section>
      </FooterContainer>
    </StyledFooter>
  );
};

Footer.propTypes = {
  slug: PropTypes.string.isRequired,
}

export default Footer;
export { PostItem };
