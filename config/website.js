module.exports = {
  ogLanguage: 'en_US', // Facebook Language
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
  siteLanguage: 'en', // Language Tag on <html> element
  title: 'Hill City Assembly of God Church', // Navigation and Site Title
  titleAlt: 'Hill City Assembly of God Church', // Title for JSONLD
  url: 'https://hillcitymnag.church', // Domain of your site. No trailing slash!
  description: 'Pentecostal church located in Hill City, MN',
  headline:
    'We’re here to partner with you in finding your place, deepening your faith, and equipping you to make a difference.', // Headline for schema.org JSONLD
  // logo: '/logos/logo-1024.png', // Used for SEO

  // JSONLD / Manifest
  favicon: 'src/favicon.png', // Used for manifest favicon generation
  shortName: 'Hill City AG', // shortname for manifest. MUST be shorter than 12 characters
  author: 'Lisa Jordan', // Author for schemaORGJSONLD
  themeColor: '#18371b',
  backgroundColor: '#ffffff',

  // twitter: '', // Twitter username
  // facebook: '', // Facebook site name
  googleAnalyticsID: 'UA-169609897-1',
}
