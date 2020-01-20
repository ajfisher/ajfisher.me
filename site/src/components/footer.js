import { useStaticQuery, graphql} from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Img from 'gatsby-image';

import { device } from './devices';
import { PostItem, ImageLink } from './list';

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
    background: var(--base);
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
    max-width: 1026px;
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
`;

const Footer = ({slug}) => {

  const data = useStaticQuery(graphql`
    query footerImageQuery {
      responsiveDesign: file(relativePath: { eq: "posts/responsive_design.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      jsRobotics: file(relativePath: { eq: "posts/make_js_robots.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      jsFoo: file(relativePath: { eq: "posts/jsfoo.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      featuredPosts: allMarkdownRemark(filter: {frontmatter: {featured: {eq: true}}},
        sort: {fields: frontmatter___date, order: DESC})
        {
          edges {
            node {
              frontmatter {
                title
                date(formatString: "YYYY/MM/DD")
                listimage
                listimage_position
                excerpt
                featureimage
                featureimage_position
                slug
              }
            }
          }
        }
    }
  `);

  // get the featured article
  const featuredPosts = data.featuredPosts.edges.map((edge) => {
    return edge.node.frontmatter;
  });

  let featured = featuredPosts[0]; // latest

  // make sure we don't feature the current post on itself
  if (featured.slug === slug) {
    featured = featuredPosts[1]; // second latest
  }

  featured.url = `/${featured.date}/${featured.slug}`;
  if (featured.listimage.startsWith('/img/')) {
    featured.listimage = featured.listimage.substring(5);
  }

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
          <Title>Latest talk</Title>
          <ImageLink>
            <a href="https://www.youtube.com/watch?v=3C3lHuRToQs">
              <Img
                fluid={data.jsFoo.childImageSharp.fluid}
                alt="YouTube - JSFoo, India"
              />
            </a>
          </ImageLink>
          <p>
            <a href="https://www.youtube.com/watch?v=3C3lHuRToQs">
              Droids, JavaScript and Web Connected Hardware, JSFoo, India
            </a>
          </p>
          <p>
            Dive into the world of JS hardware and see the sorts of things
            people are doing with it with some demos along the way.
          </p>
        </section>
        <section>
          <Title>My books</Title>
          <ImageLink position="50% 100%">
            <a href="http://www.amazon.com/JavaScript-Robotics-Johnny-Five-Raspberry-BeagleBone/dp/1457186950/">
              <Img
                fluid={data.jsRobotics.childImageSharp.fluid}
                alt="Make JavaScript Robotics Book Cover"
              />
            </a>
          </ImageLink>
          <p>
            <a href="http://www.amazon.com/JavaScript-Robotics-Johnny-Five-Raspberry-BeagleBone/dp/1457186950/">
              Make: JavaScript Robotics
            </a>
          </p>
          <ImageLink position="50% 85%">
            <a href="http://www.amazon.com/Jump-Start-Responsive-Web-Design-ebook/dp/B00TJ6UY9S/">
              <Img
                fluid={data.responsiveDesign.childImageSharp.fluid}
                alt="Jump Start Responsive Design Book Cover"
              />
            </a>
          </ImageLink>
          <p>
            <a href="http://www.amazon.com/Jump-Start-Responsive-Web-Design-ebook/dp/B00TJ6UY9S/">
              Jump Start Responsive Web Design
            </a>
          </p>
        </section>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
