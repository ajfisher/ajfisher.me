import { Link, useStaticQuery, graphql} from 'gatsby';
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
      <Link to={url}>
        <GatsbyImage image={postImage} alt={title} />
      </Link>
    </FooterImageLink>
    <p><Link to={url}>{title}</Link></p>
    { excerpt.length > 0 &&
      <p>{excerpt}</p>
    }
  </>;
};

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
  jsFoo: file(relativePath: {eq: "posts/jsfoo.jpg"}) {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
  art: file(relativePath: {eq: "posts/edge_of_collapse_725914.png"}) {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
  featuredPosts: allMarkdownRemark(
    filter: {frontmatter: {featured: {eq: true}}}
    sort: {frontmatter: {date: DESC}}
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
          featureimage
          featureimage_position
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

  // make sure we don't feature the current post on itself
  if (featured.slug === slug) {
    featured = featuredPosts[1]; // second latest
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
          <Title>Artworks</Title>
          <FooterImageLink>
            <OutboundLink href="https://www.voice.com/ajfisher">
              <GatsbyImage
                image={data.art.childImageSharp.gatsbyImageData}
                alt="Generative artwork - At the Edge of Collapse" />
            </OutboundLink>
          </FooterImageLink>
          <p>
            <OutboundLink href="https://www.voice.com/ajfisher">
              Generative artworks available for purchase as NFTs from Voice
            </OutboundLink>
          </p>
          <p>
            Dive into the world of NFTs using an environmentally sustainable
            platform.
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

export default Footer;
