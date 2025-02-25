const { validate, Joi } = require("express-validation")

class servicesValidation {
  constructor () {}

  paramID = validate({
    params: Joi.object({
      id: Joi.string().required()
    })
  })

  signup = validate({
    body: Joi.object({
      date: Joi.date().required(),
      observation: Joi.string().required(),
      status: Joi.string().required(),
      patient_id: Joi.string().required(),
      psychologist_id: Joi.string().required(),
    })
  })
}

module.exports = servicesValidation
