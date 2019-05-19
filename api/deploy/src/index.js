const {send} = require('micro')
const Raven = require('raven')
const deploy = require('./deploy')
const diffContent = require('./diff-content')
const middleware = require('./middleware')
const validateRequest = require('./validate-request')

module.exports = middleware(async (req, res) => {
  validateRequest(req)

  const hasContentChanged = await diffContent(req)

  if (hasContentChanged) {
    await deploy('bmealhouse', 'hillcitymnag')
  } else {
    Raven.captureMessage('No content changes', {level: 'info'})
  }

  send(res, 204)
})
