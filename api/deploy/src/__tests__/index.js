const fetch = require('node-fetch')
const micro = require('micro')
const listen = require('test-listen')
const service = require('..')

const getOptions = ({
  method = 'POST',
  headers = {
    'hcag-deployment-token': 'deploy-token',
  },
} = {}) => ({
  method,
  headers,
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

test('403: forbidden without deployment token', async () => {
  expect.assertions(1)

  process.env.HCAG_DEPLOYMENT_TOKEN = 'deploy-token'

  const options = getOptions({
    headers: null,
  })

  const {server, url} = await getServer()
  const res = await fetch(url, options)
  expect(res.status).toBe(403)

  server.close()
})
