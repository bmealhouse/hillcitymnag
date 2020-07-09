import {NowRequest, NowResponse} from '@vercel/node'
import got from 'got'

export default async (request: NowRequest, response: NowResponse) => {
  const {body: invalidFeed} = await got(
    'https://feeds.buzzsprout.com/140598.rss',
  )

  const validFeed = invalidFeed
    .replace(/<link><\/link>/g, '<link>https://hillcitymnag.church</link>')
    .replace(
      /<itunes:explicit>false<\/itunes:explicit>/g,
      '<itunes:explicit>no</itunes:explicit>',
    )
    .replace(
      /https:\/\/feeds.buzzsprout.com\/140598.rss/g,
      'https://hillcitymnag.church/api/hillcitymnag.rss',
    )

  response.setHeader('content-type', 'application/rss+xml')
  response.status(200).send(validFeed)
}
