const { Joi, validate } = require("express-validation")

class validatePsychologist {
  constructor () {}

  listByID = validate({
    params: Joi.object
    ({
      id: Joi.string.require()
    })
  })
}

module.exports = validatePsychologist