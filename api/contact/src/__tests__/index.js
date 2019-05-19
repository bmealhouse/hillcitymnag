const micro = require('micro')
const nock = require('nock')
const fetch = require('node-fetch')
const listen = require('test-listen')
const service = require('..')

const SENDGRID_HOST = 'https://api.sendgrid.com'

const getOptions = ({
  method = 'POST',
  name = 'Default Name',
  email = 'default.email@domain.com',
  message = 'Simple test message.',
} = {}) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name,
    email,
    message,
  }),
})

const getServer = async () => {
  const server = micro(service)
  return {server, url: await listen(server)}
}

test('405: GET requests are not supported', async () => {
  expect.assertions(1)

  const {server, url} = await getServer()
  const res = await fetch(url)
  expect(res.status).toBe(405)

  server.close()
})

test('405: PUT requests are not supported', async () => {
  expect.assertions(1)

  const options = getOptions({
    method: 'PUT',
  })

  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(405)

  server.close()
})

test('405: DELETE requests are not supported', async () => {
  expect.assertions(1)

  const options = getOptions({
    method: 'DELETE',
  })

  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(405)

  server.close()
})

test('400: `name` is required', async () => {
  expect.assertions(1)

  const options = getOptions({
    name: null,
  })

  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(400)

  server.close()
})

test('400: `name` cannot be empty', async () => {
  expect.assertions(1)

  const options = getOptions({
    name: '',
  })

  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(400)

  server.close()
})

test('400: `email` is required', async () => {
  expect.assertions(1)

  const options = getOptions({
    email: null,
  })

  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(400)

  server.close()
})

test('400: `email` cannot be empty', async () => {
  expect.assertions(1)

  const options = getOptions({
    email: '',
  })

  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(400)

  server.close()
})

test('400: `email` must be valid', async () => {
  expect.assertions(1)

  const options = getOptions({
    email: 'invalid.email',
  })

  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(400)

  server.close()
})

test('400: `message` is required', async () => {
  expect.assertions(1)

  const options = getOptions({
    message: null,
  })

  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(400)

  server.close()
})

test('400: `message` cannot be empty', async () => {
  expect.assertions(1)

  const options = getOptions({
    message: '',
  })

  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(400)

  server.close()
})

test('200: valid POST request', async () => {
  expect.assertions(1)

  nock(SENDGRID_HOST)
    .post('/v3/mail/send')
    .reply(200, {
      statusCode: 200,
      body: 'success',
    })

  const {server, url} = await getServer()
  const res = await fetch(url, getOptions())
  const json = await res.json()

  expect(json).toEqual({
    statusCode: 200,
    body: 'success',
  })

  server.close()
})

test('200: mail to `hillcityagchurch@gmail.com`', async () => {
  expect.assertions(1)

  nock(SENDGRID_HOST)
    .post('/v3/mail/send', body => {
      const to = body.personalizations[0].to[0]
      return to.email === 'hillcityagchurch@gmail.com'
    })
    .reply(200, {
      statusCode: 200,
      body: 'success',
    })

  const {server, url} = await getServer()
  const res = await fetch(url, getOptions())
  const json = await res.json()

  expect(json).toEqual({
    statusCode: 200,
    body: 'success',
  })

  server.close()
})

test('500: handles SendGrid errors', async () => {
  expect.assertions(1)

  nock(SENDGRID_HOST)
    .post('/v3/mail/send')
    .replyWithError('ERROR')

  const {server, url} = await getServer()
  const res = await fetch(url, getOptions())
  expect(res.status).toBe(500)

  server.close()
})
