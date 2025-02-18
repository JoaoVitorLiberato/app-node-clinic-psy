const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const { PSYCHOLOGISTS, SERVICES } = require("../models")

class psychologistController {
  constructor () {}

  async listAllPsychologists (request, response) {
    const auth = request.headers
    try {
      const listAllPsychologist = await PSYCHOLOGISTS.findAll({
        limit: 100,
        attributes: {
          exclude: ["password"]
        },
        subQuery: false
      })

      return response.status(200).json({
        result: listAllPsychologist,
        auth: auth
      })
    } catch (error) {
      return response.status(400).json({
        code: "errorlistpsychologists"
      })
    }
  }

  async getPsychologistById (request, response) {
    const { id } = request.params

    try {
      const psychologist = await PSYCHOLOGISTS.findByPk(String(id), {
        attributes: {
          exclude: ["password"]
        },
        // include: [{ apenas quando tiver o serviço com o id
        //   model: SERVICES,
        //   attributes: {
        //     exclude: ["psychologist_id"]
        //   }
        // }]
      })
  
      return response.status(200).json(psychologist)
    } catch (error) {
      return response.status(404).json({
        code: "psychologistnotfound",
        message: "Psychologist not found"
      })
    }
  }

  async signupNewPsychologist (request, response) {
    try {
      const PSYCHOLOGIST_DATA = await request.body
      const PASSWORD_PSYCHOLOGIST_ENCRYPTED = bcrypt.hashSync(PSYCHOLOGIST_DATA.password, 10)

      await PSYCHOLOGISTS.create({
        ...PSYCHOLOGIST_DATA,
        password: PASSWORD_PSYCHOLOGIST_ENCRYPTED
      })

      response.status(201).json({ message: "Psychologist created successfully" })
    } catch (error) {
      console.log("error", error)
      response.status(404).json({
        code: "errorcreatepsychologist",
        message: "Psychologist not created"
      })
    }
  }

  async updatePasswordPsychologist (request, response) {
    const { id } = request.params
    const PSYCHOLOGIST_DATA = request.body

    try {
      const PSYCHOLOGIST_ENCOUNTRED = await PSYCHOLOGISTS.findByPk(id)

      if (!PSYCHOLOGIST_ENCOUNTRED) {
        return response.status(404).json({
          code: "psychologistnotfound",
          message: "Psychologist not found"
        })
      }

      const PASSWORD_PSYCHOLOGIST_ENCRYPTED = bcrypt.hashSync(PSYCHOLOGIST_DATA.password, 10)

      await PSYCHOLOGISTS.update(
        { password:  PASSWORD_PSYCHOLOGIST_ENCRYPTED },
        { where: { id } }
      )

      return response.status(200).json({
        message: "Password updated successfully"
      })
    } catch (error) {
      return response.status(400).json({
        code: "passwordnotupdate",
        message: "Password not updated"
      })
    }
  }

  async delelePyschologistSystem (request, response) {
    const { id } = request.params

    try {
      const PSYCHOLOGIST_ENCOUNTRED = await PSYCHOLOGISTS.findByPk(id)

      if (!PSYCHOLOGIST_ENCOUNTRED) {
        return response.status(404).json({
          code: "psychologistnotfound",
          message: "Psychologist not found"
        })
      }

      PSYCHOLOGISTS.destroy({ where: { id } })

      return response.status(204).send("")
    } catch (error) {
      return response.status(400).json({
        code: "errorDeletePyschologist",
        message: "Error deleting psychologist"
      })
    }
  }
}

module.exports = psychologistController
