const fetch = require('node-fetch')
const listen = require('test-listen')
const micro = require('micro')
const nock = require('nock')
const service = require('..')

const WEBSITE_HOST = 'https://www.hillcitymnag.church'

const getOptions = () => ({
  method: 'POST',
  headers: {
    'hcag-deployment-token': 'deploy-token',
  },
})

const getServer = async () => {
  const server = micro(service)
  return {server, url: await listen(server)}
}

test('204: no content changes', async () => {
  expect.assertions(1)

  process.env.HCAG_DEPLOYMENT_TOKEN = 'deploy-token'

  nock(WEBSITE_HOST)
    .get('/static/events.json')
    .reply(200, {data: true})

  nock(WEBSITE_HOST)
    .get('/api/events')
    .reply(200, {data: true})

  nock(WEBSITE_HOST)
    .get('/static/sermons.json')
    .reply(200, {data: true})

  nock(WEBSITE_HOST)
    .get('/api/sermons')
    .reply(200, {data: true})

  const {server, url} = await getServer()
  const res = await fetch(url, getOptions())
  expect(res.status).toBe(204)

  server.close()
})
