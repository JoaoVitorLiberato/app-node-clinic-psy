const { validate, Joi } = require("express-validation")

class validatePsychologist {
  constructor () {}

  listByID = validate({
    params: Joi.object({
      id: Joi.string().required()
    })
  })

  signup = validate({
    body: Joi.object({
      fullName: Joi.string().required(),
      sigla: Joi.string().required(),
      document: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      presentation: Joi.string()
    })
  })

  updateData = validate({
    params: Joi.object({
      id: Joi.string().required()
    }),
    body: Joi.object({
      fullName: Joi.string().required(),
      sigla: Joi.string().required(),
      document: Joi.string().required(),
      email: Joi.string().email().required(),
      presentation: Joi.string()
    })
  })

  updatePassword = validate({
    params: Joi.object({
      id: Joi.string().required()
    }),
    body: Joi.object({
      password: Joi.string().min(8).required()
    })
  })
}

module.exports = validatePsychologist