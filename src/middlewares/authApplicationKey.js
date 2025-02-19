const { PSYCHOLOGISTS } = require("../models")

module.exports = async (request, response, next) => {
  const APPLICATION_KEY = request.headers["x-api-key"]
  const APPLICATION_AUTHORIZATION = request.headers.authorization

  if (!APPLICATION_KEY || String(APPLICATION_KEY) !== String(process.env.APPLICATION_KEY)) {
    return response.status(401).json({
      message: "Unauthorized - key not found"
    })
  }

  if (!APPLICATION_AUTHORIZATION) {
    return response.status(401).json({
      message: "Unauthorized - token not found"
    })
  }

  next()
}
