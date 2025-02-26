const { PATIENTS, PSYCHOLOGISTS } = require("../models")
const DATABASE = require("../database")
const UUID = require("uuid")

class patientsController {
  constructor () {}

  async list (request, response) {
    try {
      const LIST_ALL_PATIENTS = await PATIENTS.findAll({
        subQuery: false
      })

      return response.status(200).json(LIST_ALL_PATIENTS)
    } catch {
      return response.status(400).json({})
    }
  }

  async findByID (request, response) {
    const { id } = request.params

    if (!UUID.validate(id)) {
      return response.status(400).json({
        code: "idinvalid",
        message: "ID invalid"
      })
    }

    try {
      const FOUND_PATIENT = await PATIENTS.findByPk(id)

      if (!FOUND_PATIENT) {
        return response.status(404).json({
          code: "patientnotfound",
          message: "Patient not found"
        })
      }

      return response.status(200).json(FOUND_PATIENT)
    } catch {
      return response.status(400).json({
        code: "errorfindpatient",
        message: "Error find patient by ID"
      })
    }
  }

  async signup (request, response) {
    const PATIENT_DATA = request.body

    try {
      const PATIENT_FOUND = await PATIENTS.findOne(
        { where: { email: PATIENT_DATA.email } }
      )

      if (PATIENT_FOUND) {
        if (String(PATIENT_FOUND.email) === String(PATIENT_DATA.email)) {
          return response.status(400).json({
            code: "emailexisnting",
            message: "Email already exists"
          })
        }

        if (String(PATIENT_FOUND.cpf) === String(PATIENT_DATA.cpf)) {
          return response.status(400).json({
            code: "cpfexisnting",
            message: "CPF already exists"
          })
        }
      }

      await PATIENTS.create({
        ...PATIENT_DATA
      })

      return response.status(201).json({
        message: "Patient registered successfully"
      })
    } catch (error) {
      console.error("error", error)
      return response.status(400).json({
        code: "patientnotsignup",
        message: "Patient not registred"
      })
    }
  }

  async update (request, response) {
    const { id } = request.params
    const PATIENT_DATA = request.body

    if (!UUID.validate(id)) {
      return response.status(400).json({
        code: "idinvalid",
        message: "ID invalid"
      })
    }

    try {
      const PATIENT_FOUND = await PATIENTS.findByPk(id)

      if (String(PATIENT_FOUND.email) === String(PATIENT_DATA.email)) {
        return response.status(400).json({
          code: "emailexisnting",
          message: "Email already exists"
        })
      }

      await PATIENTS.update(
        PATIENT_DATA,
        { where: { id } }
      )

      return response.status(201).json({
        message: "Updated successfully"
      })
    } catch (error) {
      return response.status(400).json({
        code: "patientnotupdated",
        message: "Patient not updated"
      })
    }
  }

  async delete (request, response) {
    const { id } = request.params

    if (!UUID.validate(id)) {
      return response.status(400).json({
        code: "idinvalid",
        message: "ID invalid"
      })
    }

    try {
      const PATIENT_FOUND = await PATIENTS.findByPk(id)

      if (!PATIENT_FOUND) {
        return response.status(404).json({
          code: "patientnotfound",
          message: "Patient not found"
        })
      }

      await PATIENTS.destroy({ where: { id } })

      return response.status(204).json("")
    } catch {
      response.status(400).json({
        code: "patientnotdeleted",
        message: "Patient not deleted"
      })
    }
  }

  async consult (request, response) {
    const { cpf } = request.params

    try {
      const PATIENT = await PATIENTS.findOne(
        { where: { cpf } },
      )

      const SERVICE = await DATABASE.query(
        `SELECT * FROM services WHERE patient_id="${PATIENT.id}"`
      )

      const PSYCHOLOGIST = await PSYCHOLOGISTS.findByPk(SERVICE[0][0].psychologist_id)


      return response.status(200).json({
        ...PATIENT.dataValues,
        service: SERVICE[0][0],
        psychologist: {
          id: PSYCHOLOGIST.id,
          name: PSYCHOLOGIST.fullName,
          sigla: PSYCHOLOGIST.sigla,
          email: PSYCHOLOGIST.email,
          presentation: PSYCHOLOGIST.presentation,
        }
      })
    } catch {
      return response.status(400).json("error")
    }
  }
}

module.exports = patientsController