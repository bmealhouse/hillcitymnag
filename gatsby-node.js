const path = require('path')
const {paginate} = require('gatsby-awesome-pagination')

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

exports.buildMessages = buildMessages
function buildMessages({edges}) {
  return edges.reduce((messages, {node: message}) => {
    if (message.tags) {
      const series = messages.find(
        ({type, name}) => type === 'MESSAGE_SERIES' && name === message.tags,
      )

      if (series) {
        series.messages.push(message)
        return messages
      }

      return [
        ...messages,
        {
          type: 'MESSAGE_SERIES',
          name: message.tags,
          messages: [message],
        },
      ]
    }

    return [
      ...messages,
      {
        ...message,
        type: 'MESSAGE_STANDALONE',
      },
    ]
  }, [])
}
