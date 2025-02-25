const { SERVICES, PATIENTS, PSYCHOLOGISTS } = require("../models")
const DATABASE = require("../database")
const { dateDBQuery } = require("../helpers/dateFormated")

class servicesController {
  constructor () {}

  async list (request, response) {
    try {
      const SERVICES_ALL = await DATABASE.query(
        `SELECT * FROM services`
      )

      return response.status(200).json({ data: SERVICES_ALL[0] || null }.data)
    } catch (err) {
      return response.status(400).json({
        code: "errorlistservices",
        message: "Error list services"
      })
    }
  }

  async listDay (request, response) {
    try {
      const SERVICES_BY_DATE = await DATABASE.query(
        `
          SELECT * FROM services
          WHERE createdAt BETWEEN "${dateDBQuery}, 00:00:00" AND "${dateDBQuery}, 23:59:59";
        `
      )

      return response.status(200).json(SERVICES_BY_DATE[0])
    } catch {
      return response.status(400).json(err)
    }
  }

  async listById (request, response) {
    const { id } = request.params

    try {
      const QUERY = await DATABASE.query(`
        SELECT * FROM services WHERE id ="${id}"`
      )
      const PSYCHOLOGIST = await PSYCHOLOGISTS.findByPk(QUERY[0][0].psychologist_id, {
        attributes: { exclude: ["password"] }
      })
      const PATIENT = await PATIENTS.findByPk(QUERY[0][0].patient_id)

      return response.status(200).json({
        ...QUERY[0][0],
        patient: PATIENT,
        psychologist: PSYCHOLOGIST
      })
    } catch {
      return response.status(400).json({
        code: "errorlistybyid",
        message: "Error find service especify"
      })
    }
  }

  async signup (request, response) {
    const SERVICE_DATA = request.body

    try {
      await SERVICES.create(SERVICE_DATA)
      return response.status(201).json({
        message: "Service created successfully!"
      })
    } catch {
      return response.status(400).json({
        code: "errorcreateservice",
        message: "Error create"
      })
    }
  }

  async update (request, response) {
    const { id } = request.params
    const SERVICE_DATA = response.body

    try {
      await SERVICES.update(
        SERVICE_DATA,
        { where: { id } }
      )

      return response.status(201).json({
        message: "Service updated successfully"
      })
    } catch {
      return response.status(400).json({
        code: "errorupdateservice",
        message: "Update failed"
      })
    }
  }

  async delete (request, response) {
    const { id } = request.params

    try {
      await SERVICES.destroy({ where: { id } })
      return response.status(204).json({})
    } catch {
      return response.status(400).json({
        code: "errordeleteservice",
        message: "Error delete service"
      })
    }
  }
}

module.exports = servicesController