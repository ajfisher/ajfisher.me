import React from 'react';
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby';
import { getSrc } from "gatsby-plugin-image"

import humanize from 'humanize-plus';

function PageHead({
  description = ``,
  meta = [],
  title = ``,
  type = 'post',
  tweet = '',
  image,
  readingTime = 0,
  words = 0
}) {
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

  const seo = {
    title: title || site.siteMetadata.defaultTitle,
    metaDescription: description || site.siteMetadata.description,
    pageType: type,
  }

  let pagetitle = seo.title;
  if (pagetitle !== site.siteMetadata.defaultTitle) {
    pagetitle = `${pagetitle} | ${site.siteMetadata.defaultTitle}`;
  }

  const card_meta = [];

  if (image !== undefined) {
    const image_url = `${site.siteMetadata.siteUrl}${getSrc(image)}`;

    card_meta.push({property: `og:image`, content: image_url });
    card_meta.push({ name: `twitter:image`, content: image_url});
  }

  if (readingTime > 0) {
    const rounded_time = Math.ceil(readingTime);

    card_meta.push({name: `twitter:label1`, content: `Reading Time`});
    card_meta.push({name: `twitter:data1`, content: `${rounded_time} minutes`});
  }

  if (words > 0) {
    const humanised_words = humanize.compactInteger(words, 1);

    card_meta.push({name: `twitter:label2`, content: `Words`});
    card_meta.push({name: `twitter:data2`, content: `${humanised_words}`});
  }

  meta=[
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
  ].concat(meta).concat(card_meta);

  return (
    <>
      <html lang="en"/>
      <title>{`${pagetitle}`}</title>
      {
        meta.map(d => (<meta name={d.name} property={d.property} content={d.content} key={d.name || d.property} />) )
      }
    </>
  )
};

PageHead.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  type: PropTypes.string,      // added for "type"
  tweet: PropTypes.string,     // added for "tweet"
  image: PropTypes.any,        // added for "image", adjust to PropTypes.object if needed
  readingTime: PropTypes.number,
  words: PropTypes.number,
};

export default PageHead
