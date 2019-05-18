const concat = require('concat-stream')
const FeedParser = require('feedparser')
const request = require('request')

const FEED_URL = 'https://www.buzzsprout.com/140598.rss'

module.exports = () =>
  new Promise((resolve, reject) => {
    const feedRequest = request(FEED_URL)
    const feedParser = new FeedParser({addmeta: false})
    const concatStream = concat(resolve)

    feedParser.on('error', reject)
    feedRequest.on('error', reject)

    feedRequest.on('response', function(res) {
      const stream = this

      if (res.statusCode !== 200) {
        const err = new Error('Bad Status Code')
        err.statusCode = res.statusCode
        stream.emit('error', err)
      }

      stream.pipe(feedParser).pipe(concatStream)
    })
  })
