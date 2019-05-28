const microCors = require('micro-cors')
const post = require('micro-post')
const microSentry = require('micro-sentry')

module.exports = fn => {
  console.log('--- INCOMING REQUEST ---')

  const cors = microCors({
    allowMethods: ['POST'],
    allowHeaders: ['Access-Control-Allow-Origin', 'Content-Type'],
    // origin: // defaults to '*'
    //   process.env.NODE_ENV === 'test'
    //     ? '*'
    //     : 'https://sandbox.auth0-extend.com',
  })

  if (process.env.NODE_ENV === 'production') {
    console.log('> microSentry()')
    fn = microSentry(process.env.HCAG_SENTRY_DSN)(fn)
  }

  console.log('> cors(post())')
  return cors(post(fn))
}
