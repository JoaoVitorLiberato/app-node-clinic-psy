const express = require("express")
const router = express.Router()

const middlewareAuthToken = require("../middlewares/authRoutesApplication")
const middleware = new middlewareAuthToken()

const patientsValidation = require("../validators/patients")
const validation = new patientsValidation()

const patientsController = require("../controllers/patients")
const controller = new patientsController()

router.get("/patient-service/:cpf", validation.consult, controller.consult)
router.get("/patients", middleware.auth, controller.list)
router.get("/patient/:id", middleware.auth, validation.paramID, controller.findByID)
router.post("/patient", middleware.auth, validation.data, controller.signup)
router.put("/patient/:id", middleware.auth, validation.update, controller.update)
router.delete("/patient/:id", middleware.auth, validation.paramID, controller.delete)

module.exports = router
