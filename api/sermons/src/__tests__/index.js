const micro = require('micro')
const nock = require('nock')
const fetch = require('node-fetch')
const listen = require('test-listen')
const service = require('..')

const BUZZSPROUT_HOST = 'https://www.buzzsprout.com'

const getOptions = method => ({method})

const getServer = async () => {
  const server = micro(service)
  return {server, url: await listen(server)}
}

test('405: POST requests are not supported', async () => {
  expect.assertions(1)

  const options = getOptions('POST')
  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(405)

  server.close()
})

test('405: PUT requests are not supported', async () => {
  expect.assertions(1)

  const options = getOptions('PUT')
  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(405)

  server.close()
})

test('405: DELETE requests are not supported', async () => {
  expect.assertions(1)

  const options = getOptions('DELETE')
  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(405)

  server.close()
})

test('400: bad request', async () => {
  expect.assertions(1)

  nock(BUZZSPROUT_HOST)
    .get('/140598.rss')
    .replyWithFile(400, `${__dirname}/broken.rss`)

  const {server, url} = await getServer()
  const res = await fetch(url)
  expect(res.status).toBe(400)

  server.close()
})

test('500: invalid rss feed', async () => {
  expect.assertions(1)

  nock(BUZZSPROUT_HOST)
    .get('/140598.rss')
    .replyWithFile(200, `${__dirname}/broken.rss`)

  const {server, url} = await getServer()
  const res = await fetch(url)
  expect(res.status).toBe(500)

  server.close()
})

test('200: parse rss feed', async () => {
  expect.assertions(1)

  nock(BUZZSPROUT_HOST)
    .get('/140598.rss')
    .replyWithFile(200, `${__dirname}/simple.rss`)

  const {server, url} = await getServer()
  const res = await fetch(url)
  const data = await res.json()

  expect(data).toEqual([
    {
      guid: 'Buzzsprout-471812',
      title: 'Episode Title',
      description: 'Episode description',
      date: 'February 5, 2017',
      enclosure: {
        src: 'http://www.buzzsprout.com/26903/471812-episode-title.mp3',
        type: 'audio/mpeg',
        length: '12619568',
      },
    },
  ])

  server.close()
})
