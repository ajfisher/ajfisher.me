import React from 'react';
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby';

import humanize from 'humanize-plus';

function SEO({ description, meta, title, type, tweet, image, readingTime, words}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle
            description
            author
            siteUrl
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

  if (typeof(image.medium) !== 'undefined') {
    const image_url = `${site.siteMetadata.siteUrl}${image.medium}`;

    meta.push({name: `og:image`, content: image_url });
    meta.push({ name: `twitter:image`, content: image_url});
  }

  if (readingTime > 0) {
    const rounded_time = Math.ceil(readingTime) || 0;

    meta.push({name: `twitter:label1`, content: `Reading Time`});
    meta.push({name: `twitter:data1`, content: `${rounded_time} minutes`});
  }

  if (words > 0) {
    const humanised_words = humanize.compactInteger(words, 1) || 0;

    meta.push({name: `twitter:label2`, content: `Words`});
    meta.push({name: `twitter:data2`, content: `${humanised_words}`});
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
          name: `twitter:site`,
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
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  tweet: ``,
  image: ``,
  readingTime: 0,
  words: 0
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  readingTime: PropTypes.number,
  words: PropTypes.number
}

export default SEO
