const format = require('date-fns/format')

module.exports = data =>
  data.map(episode => ({
    guid: episode.guid,
    title: episode.title,
    description: episode.description,
    date: format(episode.date, 'MMMM D, YYYY'),
    enclosure: {
      src: episode.enclosures[0].url,
      type: episode.enclosures[0].type,
      length: episode.enclosures[0].length,
    },
  }))
