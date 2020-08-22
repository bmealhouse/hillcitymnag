import {NowRequest, NowResponse} from '@vercel/node'
import got from 'got'

export default async (request: NowRequest, response: NowResponse) => {
  let {body: feed} = await got('https://feeds.buzzsprout.com/140598.rss')

  // IFTTT requires RSS feeds be 100% valid
  // This code ensures every <item> contains a valid <link> tag
  let cursor = 0
  let startIndex = feed.indexOf('<item>', cursor)
  while (startIndex > 0) {
    cursor = feed.indexOf('</item>', startIndex) + 7
    const item = feed.slice(startIndex, cursor)

    if (!item.includes('<link>')) {
      const injectionIndex = startIndex + item.indexOf('</description>') + 14
      feed = `${feed.slice(0, injectionIndex)}
    <link><![CDATA[https://hillcitymnag.church]]></link>${feed.slice(
      injectionIndex,
    )}`
    }

    startIndex = feed.indexOf('<item>', cursor)
  }

  feed = feed
    .replace(
      /<itunes:explicit>false<\/itunes:explicit>/g,
      '<itunes:explicit>no</itunes:explicit>',
    )
    .replace(
      /https:\/\/feeds.buzzsprout.com\/140598.rss/g,
      'https://hillcitymnag.church/api/hillcitymnag.rss',
    )

  response.setHeader('content-type', 'application/rss+xml')
  response.status(200).send(feed)
}
