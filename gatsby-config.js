require('dotenv').config({
  path: '.env.build',
})

const path = require('path')

// const prismicHtmlSerializer = require('./src/gatsby/htmlSerializer')

const website = require('./config/website')

const pathPrefix = website.pathPrefix === '/' ? '' : website.pathPrefix

module.exports = {
  /* General Information */
  pathPrefix: website.pathPrefix,
  siteMetadata: {
    siteUrl: website.url + pathPrefix, // For gatsby-plugin-sitemap
    pathPrefix,
    title: website.title,
    titleAlt: website.titleAlt,
    description: website.description,
    banner: website.logo,
    headline: website.headline,
    siteLanguage: website.siteLanguage,
    ogLanguage: website.ogLanguage,
    author: website.author,
    twitter: website.twitter,
    facebook: website.facebook,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        config: path.join(__dirname, 'config'),
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'hillcitymnag',
        accessToken: `${process.env.HCAG_PRISMIC_API_KEY}`,
        // Get the correct URLs in blog posts
        // Set a link resolver function used to process links in your content.
        // Fields with rich text formatting or links to internal content use this
        // function to generate the correct link URL.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different link resolver logic for each field if necessary.
        // See: https://prismic.io/docs/javascript/query-the-api/link-resolving
        linkResolver: () => post => `/${post.uid}`,
        // PrismJS highlighting for labels and slices
        // Set an HTML serializer function used to process formatted content.
        // Fields with rich text formatting use this function to generate the
        // correct HTML.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different HTML serializer logic for each field if necessary.
        // See: https://prismic.io/docs/nodejs/beyond-the-api/html-serializer
        // htmlSerializer: () => prismicHtmlSerializer,
      },
    },
    {
      resolve: 'gatsby-source-buzzsprout',
      options: {
        token: process.env.HCAG_BUZZSPROUT_API_KEY,
        podcastId: process.env.HCAG_BUZZSPROUT_PODCAST_ID,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: website.googleAnalyticsID,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: website.title,
        short_name: website.titleAlt,
        description: website.description,
        start_url: pathPrefix,
        background_color: website.backgroundColor,
        theme_color: website.themeColor,
        display: 'standalone',
        icon: website.favicon,
      },
    },
    // Must be placed at the end
    'gatsby-plugin-offline',
  ],
}
