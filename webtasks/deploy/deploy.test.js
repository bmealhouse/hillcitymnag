const nock = require('nock')
const deploy = require('./deploy')

const HCAG_DEPLOY_HOST = 'https://www.hillcitymnag.church/api/deploy'

const getContext = () => ({
  secrets: {
    HCAG_DEPLOYMENT_TOKEN: 'secret',
  },
})

test('500: internal server error', done => {
  nock(HCAG_DEPLOY_HOST)
    .post('/')
    .replyWithError('ERROR')

  const context = getContext()
  deploy(context, done)
})

test('400: bad request', done => {
  nock(HCAG_DEPLOY_HOST)
    .post('/')
    .reply(400)

  const context = getContext()
  deploy(context, done)
})

test('200: success', done => {
  nock(HCAG_DEPLOY_HOST)
    .post('/')
    .reply(200)

  const context = getContext()
  deploy(context, done)
})
