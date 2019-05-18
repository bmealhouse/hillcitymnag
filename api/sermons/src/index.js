const {send} = require('micro')
const middleware = require('./middleware')
const parseRssFeed = require('./parse-rss-feed')
const transform = require('./transform')

module.exports = middleware(async (req, res) => {
  const data = await parseRssFeed()
  send(res, 200, transform(data))
})
