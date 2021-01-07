const path = require('path')
const {paginate} = require('gatsby-awesome-pagination')
const buildMessages = require('./src/build-messages')

exports.createPages = async ({actions: {createPage}, graphql}) => {
  const {
    data: {allBuzzsproutPodcastEpisode, allPrismicVideo},
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
              date: published_at
            }
          }
        }
        allPrismicVideo(
          sort: {fields: [data___video___upload_date], order: DESC}
        ) {
          edges {
            node {
              data {
                video {
                  id: video_id
                  date: upload_date
                }
              }
            }
          }
        }
      }
    `,
  )

  paginate({
    createPage,
    items: buildMessages({allBuzzsproutPodcastEpisode, allPrismicVideo}),
    itemsPerPage: 5,
    pathPrefix: '/messages',
    component: path.resolve('./src/templates/messages.js'),
  })
}
