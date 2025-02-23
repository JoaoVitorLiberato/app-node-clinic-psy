const express = require("express")
const router = express.Router()

const middlewareAuthToken = require("../middlewares/authRoutesApplication")
const middleware = new middlewareAuthToken()

const servicesValidation = require("../validators/services")
const validation = new servicesValidation()

const servicesController = require("../controllers/services")
const controller = new servicesController()

router.get("/services", middleware.auth, controller.list)
router.get("/services-day", middleware.auth, controller.listDay)
router.get("service/:id", middleware.auth, validation.paramID, controller.listById)

module.exports = router
