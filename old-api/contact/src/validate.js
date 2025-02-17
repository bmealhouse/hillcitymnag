const Joi = require('joi')
const {createError} = require('micro')

const schema = {
  name: Joi.string().required(),
  email: Joi.string().email(),
  message: Joi.string().required(),
}

module.exports = data => {
  const {error} = Joi.validate(data, schema)

  if (error) {
    const {message} = error.details[0]
    throw createError(400, message, error)
  }
}
