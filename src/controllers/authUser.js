const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const { PSYCHOLOGISTS } = require("../models")

class authUserController {
  constructor () {}

  async signinUserSystem (request, response) {
    const DATA_USER = request.body
    try {
      const PSYCHOLOGIST = await PSYCHOLOGISTS.findOne({
        where: { email: DATA_USER.email }
      })

      const PASSWORD_DESCRYPTED = bcrypt.compareSync(DATA_USER.password, PSYCHOLOGIST.password)

      if (!PSYCHOLOGIST.email || !PASSWORD_DESCRYPTED) {
        return response.status(401).json({
          code: "unauthorized",
          message: "Email or password incorrect"
        })
      }

      const NEW_DATA_USER = {
        id: PSYCHOLOGIST.id,
        name: PSYCHOLOGIST.fullName,
        email: PSYCHOLOGIST.email
      }

      const TOKEN_JWT = jwt.sign(NEW_DATA_USER, process.env.APPLICATION_SECRET_KEY, { expiresIn: "8h" })

      response.status(201).json({
        token: TOKEN_JWT,
        user: NEW_DATA_USER
      })

    } catch (error) {
      console.log("err", error)
      response.status(400).json({
        code: "errorsignin",
        message: "Error user signin"
      })
    }
  }
}

module.exports = authUserController
