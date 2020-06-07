module.exports = ({edges}) => {
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
