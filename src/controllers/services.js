const { SERVICES } = require("../models")
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
}

module.exports = servicesController