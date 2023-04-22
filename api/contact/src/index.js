const {STATUS_CODES} = require('http')
const {createError, json, send} = require('micro')
const email = require('./email')
const middleware = require('./middleware')
const validate = require('./validate')

module.exports = middleware(async (req, res) => {
  const data = await json(req)
  validate(data)

  try {
    await email(data)
    send(res, 200, {})
  } catch (error) {
    // Error is an instance of SendGridError
    // The full response is attached to error.response
    if (error.response) {
      console.error(error.response.body)
      throw createError(500, STATUS_CODES[500], error)
    }

    console.error(error)
  }
})
