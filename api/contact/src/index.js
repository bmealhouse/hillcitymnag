const {createError, json, send} = require('micro')
const email = require('./email')
const middleware = require('./middleware')
const validate = require('./validate')

module.exports = middleware(async (req, res) => {
  const data = await json(req)
  validate(data)

  try {
    const {body, statusCode} = await email(data)
    send(res, statusCode, body)
  } catch (error) {
    // Error is an instance of SendGridError
    // The full response is attached to error.response
    const {body, statusCode} = error.response
    throw createError(statusCode, body, error)
  }
})
