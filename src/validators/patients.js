const { validate, Joi } = require("express-validation")

class patientsValidation {
  constructor () {}

  paramID = validate({
    params: Joi.object({
      id: Joi.string().required()
    })
  })

  data = validate({
    body: Joi.object({
      fullName: Joi.string().required(),
      phone:Joi.string().min(11).max(11).required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().min(11).max(11).required(),
    })
  })

  update = validate({
    params: Joi.object({
      id: Joi.string().required()
    }),
    body: Joi.object({
      fullName: Joi.string().required(),
      phone:Joi.string().min(11).max(11).required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().min(11).max(11).required(),
    })
  })

  consult = validate({
    params: Joi.object({
      cpf: Joi.string().required()
    })
  })
}

module.exports = patientsValidation