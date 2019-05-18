const get = require('micro-get')
const microCors = require('micro-cors')
const microSentry = require('micro-sentry')

module.exports = fn => {
  const cors = microCors({
    allowMethods: ['GET'],
    allowHeaders: ['Access-Control-Allow-Origin', 'Content-Type'],
    origin: '*',
  })

  if (process.env.NODE_ENV === 'production') {
    fn = microSentry(process.env.HCAG_SENTRY_DSN)(fn)
  }

  return cors(get(fn))
}
