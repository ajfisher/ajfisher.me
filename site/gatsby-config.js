module.exports = {
  siteMetadata: {
    defaultTitle: `ajfisher`,
    description: `The blog and portfolio of AJFisher - technologist`,
    author: `@ajfisher`,
    siteUrl: 'https://ajfisher.me'
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-13280033-1",
        siteSpeedSampleRate: 10
      }
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `image`,
        path: `${__dirname}/src/img`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
        ignore: [`**/.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `related-posts`,
        path: `${__dirname}/utils/embeddings/similarity_data.json`,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 90,
          breakpoints: [400, 500, 750, 1080, 1600]
        },
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-transformer-remark-tags`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              backgroundColor: `none`,
              quality: 90,
              withWebp: { quality: 90 },
              showCaptions: false,
              disableBgImage: true,
            },
          },
          /**
          {
            resolve: `gatsby-remark-responsive-image`,
            options: {
              maxWidth: 1000,
              backgroundColor: `none`,
              quality: 90,
              withWebp: { quality: 90 },
              showCaptions: false,
              disableBgImage: true,
            }
          },
          **/
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: {
                sh: `bash`,
                xsl: `xml`,
              }
            },
          },
          `gatsby-remark-transformer-pullquotes`
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ajfisher website`,
        short_name: `ajfisher`,
        start_url: `/`,
        background_color: `#FF5E9A`,
        theme_color: `#FF5E9A`,
        display: `minimal-ui`,
        icon: `src/img/ajfisher_large.jpg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://ajfisher.me`,
        sitemap: 'https://ajfisher.me/sitemap-0.xml',
        policy: [{userAgent: '*', allow: '/'}],
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://ajfisher.me`,
        stripQueryString: true,
      },
    },
    `gatsby-plugin-sitemap`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`
  ],
}
