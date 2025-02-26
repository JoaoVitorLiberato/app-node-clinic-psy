const bcrypt = require("bcryptjs")
const UUID = require("uuid")

const { PSYCHOLOGISTS, SERVICES } = require("../models")
const DATABASE = require("../database")

class psychologistController {
  constructor () {}

  async list (request, response) {
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
      return response.status(400).json({
        code: "errorlistpsychologists"
      })
    }
  }

  async findById (request, response) {
    const { id } = request.params

    try {
      if (!UUID.validate(String(id))) {
        return response.status(404).json({
          code: "idinvalid",
          message: `This ID: ${id} is invalid`
        })
      }

      const psychologist = await PSYCHOLOGISTS.findByPk(String(id), {
        attributes: {
          exclude: ["password"]
        },
      })

      if (!psychologist) {
        return response.status(404).json({
          code: "psychologistnotfound",
          message: "Psychologist not found"
        })
      }

      const services = await DATABASE.query(
        `
          SELECT * FROM services 
            WHERE services.psychologist_id = "${id}";
        ` 
      )

      return response.status(200).json({
        psychologist,
        services: { data: services[0] || null }.data
      })
    } catch {
      return response.status(400).json({
        code: "errorfindpsichologist",
        message: "Error trying to find specific psychologist"
      })
    }
  }

  async signup (request, response) {
    const PSYCHOLOGIST_DATA = await request.body

    try {
      const PASSWORD_PSYCHOLOGIST_ENCRYPTED = bcrypt.hashSync(PSYCHOLOGIST_DATA.password, 10)

      await PSYCHOLOGISTS.create({
        ...PSYCHOLOGIST_DATA,
        password: PASSWORD_PSYCHOLOGIST_ENCRYPTED
      })

      response.status(201).json({ message: "Psychologist created successfully" })
    } catch {
      const { email } = await PSYCHOLOGISTS.findOne(
        { where: { email: PSYCHOLOGIST_DATA.email } }
      )

      if (email) {
        return response.status(400).json({
          code: "existingemail",
          message: "This email already exists"
        })
      }

      response.status(400).json({
        code: "errorcreatepsychologist",
        message: "Psychologist not created"
      })
    }
  }

  async updatePassword (request, response) {
    const { id } = request.params
    const PSYCHOLOGIST_DATA = request.body

    try {
      if (!UUID.validate(String(id))) {
        return response.status(404).json({
          code: "idinvalid",
          message: `This ID: ${id} is invalid`
        })
      }

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

  async update (request, response) {
    const { id } = request.params
    const PSYCHOLOGIST_DATA = request.body

    try {
      const PSYCHOLOGIST = await PSYCHOLOGISTS.findByPk(id)
      if (!PSYCHOLOGIST) {
        return response.status(404).json({
          code: "psychologistnotfound",
          message: "Psychologist not found"
        })
      }

      await PSYCHOLOGISTS.update(
        PSYCHOLOGIST_DATA,
        { where: { id } }
      )

      return response.status(201).json({
        message: "Psychologist updated successfully"
      })
    } catch {
      return response.status(400).json({
        code: "errorpsychologistupdated",
        message: "Data psychologist not Updated"
      })
    }
  }

  async delele (request, response) {
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
