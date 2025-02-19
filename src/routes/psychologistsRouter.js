const express = require("express")
const router = express.Router()

const middlewareAuthToken = require("../middlewares/authRoutesApplication")
const middleware = new middlewareAuthToken()

const validationPsychologists = require("../validators/psychologists")
const validation = new validationPsychologists()

const controllerPsychologists = require("../controllers/psychologists")
const controller = new controllerPsychologists()

router.get("/psychologists", middleware.auth, controller.listAllPsychologists)
router.get("/psychologist/:id", middleware.auth, validation.listByID, controller.getPsychologistById)
router.post("/psychologist", middleware.auth, validation.signup, controller.signupNewPsychologist)
router.put("/psychologist/:id", middleware.auth, validation.updateData, controller.updateDataPsychologist)
router.put("/psychologist/password/:id", middleware.auth, validation.updatePassword, controller.updatePasswordPsychologist)
router.delete("/psychologist/:id", middleware.auth, controller.delelePyschologistSystem)

module.exports = router
