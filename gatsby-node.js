const path = require('path')
const {paginate} = require('gatsby-awesome-pagination')
const buildMessages = require('./src/build-messages')

exports.createPages = async ({actions: {createPage}, graphql}) => {
  const {
    data: {allBuzzsproutPodcastEpisode},
  } = await graphql(
    `
      {
        allBuzzsproutPodcastEpisode(
          filter: {duration: {ne: null}}
          sort: {fields: [published_at], order: DESC}
        ) {
          edges {
            node {
              id
              tags
            }
          }
        }
      }
    `,
  )

  paginate({
    createPage,
    items: buildMessages(allBuzzsproutPodcastEpisode),
    itemsPerPage: 5,
    pathPrefix: '/messages',
    component: path.resolve('./src/templates/messages.js'),
  })
}
