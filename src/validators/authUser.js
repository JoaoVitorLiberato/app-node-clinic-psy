const { validate, Joi } = require("express-validation")

class authUserValidation {
  constructor () {}

  login = validate({
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required()
    })
  })
}

module.exports = authUserValidation
