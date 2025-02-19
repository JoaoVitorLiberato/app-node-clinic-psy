const express = require("express")
const router = express.Router()

const controllerPsychologists = require("../controllers/psychologists")
const controller = new controllerPsychologists()


const validationPsychologists = require("../validators/psychologists")
const validation = new validationPsychologists()

router.get("/psychologists", controller.listAllPsychologists)
router.get("/psychologist/:id", validation.listByID, controller.getPsychologistById)
router.post("/psychologist", validation.signup, controller.signupNewPsychologist)
router.put("/psychologist/:id", validation.updateData, controller.updateDataPsychologist)
router.put("/psychologist/password/:id", validation.updatePassword, controller.updatePasswordPsychologist)
router.delete("/psychologist/:id", controller.delelePyschologistSystem)

module.exports = router
