const {createError} = require('micro')

const TOKEN_KEY = 'hcag-deployment-token'

module.exports = req => {
  if (req.headers[TOKEN_KEY] !== process.env.HCAG_DEPLOYMENT_TOKEN) {
    throw createError(403, 'Forbidden')
  }
}
