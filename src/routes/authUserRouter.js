const express = require("express")
const router = express.Router()

const authUserController = require("../controllers/authUser")
const controller = new authUserController()

const authUserValidation = require("../validators/authUser")
const validation = new authUserValidation()

router.post("/login", validation.login, controller.signinUserSystem)

module.exports = router