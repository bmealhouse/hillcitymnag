module.exports = ({allBuzzsproutPodcastEpisode, allPrismicVideo}) => {
  const messages = []

  for (const {node: message} of allBuzzsproutPodcastEpisode.edges) {
    if (message.tags) {
      const series = messages.find(
        ({type, name}) => type === 'MESSAGE_SERIES' && name === message.tags,
      )

      if (series) {
        series.messages.push(message)
        return messages
      }

      messages.push({
        name: message.tags,
        messages: [message],
        type: 'MESSAGE_SERIES',
      })
    } else {
      messages.push({
        ...message,
        type: 'MESSAGE_STANDALONE',
      })
    }
  }

  for (const {
    node: {data: message},
  } of allPrismicVideo.edges) {
    messages.push({
      ...message.video,
      type: 'MESSAGE_VIDEO',
    })
  }

  return messages.sort((a, b) => new Date(b.date) - new Date(a.date))
}
