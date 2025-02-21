const express = require("express")
const router = express.Router()

const middlewareAuthToken = require("../middlewares/authRoutesApplication")
const middleware = new middlewareAuthToken()

const validationPsychologists = require("../validators/psychologists")
const validation = new validationPsychologists()

const controllerPsychologists = require("../controllers/psychologists")
const controller = new controllerPsychologists()

router.get("/psychologists", middleware.auth, controller.list)
router.get("/psychologist/:id", middleware.auth, validation.listByID, controller.findById)
router.post("/psychologist", middleware.auth, validation.signup, controller.signup)
router.put("/psychologist/:id", middleware.auth, validation.update, controller.update)
router.put("/psychologist/password/:id", middleware.auth, validation.updatePassword, controller.updatePassword)
router.delete("/psychologist/:id", middleware.auth, controller.delele)

module.exports = router
