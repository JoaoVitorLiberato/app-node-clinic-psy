const jwt = require("jsonwebtoken")
const bycripty = require("bcrypt")

const { PSYCHOLOGISTS, SERVICES } = require("../models")

class psychologistController {
  constructor () {}

  async listAllPsychologists (request, response) {
    try {
      const listAllPsychologist = await PSYCHOLOGISTS.findAll({
        limit: 100,
        attributes: {
          exclude: ["password"]
        },
        subQuery: false
      })

      return response.status(200).json(listAllPsychologist)
    } catch (error) {
      return response.status(404).json({
        codigo: "errorlistpsychologists",
        message: error.original.sqlMessage
      })
    }
  }

  async getPsychologistById (request, response) {
    try {
      const { id } = request.params
      const psychologist = await PSYCHOLOGISTS.findByPk(id, {
        attributes: {
          exclude: ["password"]
        },
        include: [{
          model: SERVICES,
          attributes: {
            exclude: ["psychologist_id"]
          }
        }]
      })
  
      return response.status(200).json(psychologist)
    } catch (error) {
      return response.status(404).json({
        codigo: "errorgetpsychologist",
        message: error.original.sqlMessage
      })
    }
  }

  async signupNewPsychologist (request, response) {
    console.log("tetse", request.body)
    try {
      const PSYCHOLOGIST_DATA = request.body
      const PASSWORD_PSYCHOLOGIST_ENCRYPTED = bycripty.hashSync(PSYCHOLOGIST_DATA.password, 10)

      await PSYCHOLOGISTS.create({
        ...PSYCHOLOGIST_DATA,
        password: PASSWORD_PSYCHOLOGIST_ENCRYPTED
      })

      response.status(201).json({ message: "Psychologist created" })
    } catch (error) {
      response.status(404).json({
        codigo: "errorcreatedpsychologist",
        message: "Psychologist not created"
      })
    }
  }
}

module.exports = psychologistController
