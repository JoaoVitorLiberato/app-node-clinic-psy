const express = require("express")
const router = express.Router()

const authUserController = require("../controllers/authUser")
const controller = new authUserController()

router.post("/login", controller.signinUserSystem)

module.exports = router