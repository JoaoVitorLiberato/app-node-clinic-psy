const { validate, Joi } = require("express-validation")

class servicesValidation {
  constructor () {}

  paramID = validate({
    params: Joi.object({
      id: Joi.string().required()
    })
  })
}

module.exports = servicesValidation
