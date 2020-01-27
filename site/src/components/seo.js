import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, meta, title, type, tweet, image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle
            description
            author
          }
        }
      }
    `
  )

  const lang = 'en';

  const seo = {
    title: title || site.siteMetadata.defaultTitle,
    metaDescription: description || site.siteMetadata.description,
    pageType: type || `website`,
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={seo.title}
      titleTemplate={`%s | ${site.siteMetadata.defaultTitle}`}
      meta={[
        {
          name: `description`,
          content: seo.metaDescription,
        },
        {
          property: `og:title`,
          content: seo.title,
        },
        {
          property: `og:description`,
          content: seo.metaDescription,
        },
        {
          property: `og:type`,
          content: seo.pageType,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: `@ajfisher`,
        },
        {
          name: `twitter.site`,
          content: `@ajfisher`,
        },
        {
          name: `twitter:title`,
          content: seo.title,
        },
        {
          name: `twitter:description`,
          content: tweet || seo.metaDescription,
        },
        {
          name: `twitter:image`,
          content: image.large,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  tweet: ``,
  image: ``
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
