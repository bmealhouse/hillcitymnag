const {send} = require('micro')
const Raven = require('raven')
const deploy = require('./deploy')
const diffContent = require('./diff-content')
const middleware = require('./middleware')
const validateRequest = require('./validate-request')

module.exports = middleware(async (req, res) => {
  console.log('> validateRequest(req)', req.headers)
  validateRequest(req)

  const hasContentChanged = await diffContent(req)

  if (hasContentChanged) {
    console.log('> deploy()')
    await deploy('bmealhouse', 'hillcitymnag')
  } else {
    console.log('--- NO CONTENT CHANGES ---')
    Raven.captureMessage('No content changes', {level: 'info'})
  }

  send(res, 204)
})
