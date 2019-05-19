const fetch = require('node-fetch')
const micro = require('micro')
const nock = require('nock')
const listen = require('test-listen')
const mockNowUrl = require('../__mocks__/mock-now-url')
const service = require('..')

jest.mock('child_process')
jest.mock('download')
jest.mock('rimraf')

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

test('204: detected event changes', async () => {
  expect.assertions(1)

  process.env.HCAG_DEPLOYMENT_TOKEN = 'deploy-token'
  process.env.HCAG_ZEIT_TOKEN = 'zeit-token'

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
    .reply(200, {data: 'updated'})

  nock(mockNowUrl)
    .get('/')
    .times(11)
    .reply(200, '<html/>')

  const {server, url} = await getServer()
  const res = await fetch(url, getOptions())
  expect(res.status).toBe(500)

  server.close()
})
