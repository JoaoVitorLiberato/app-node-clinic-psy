const express = require("express")
const router = express.Router()

const controller = require("../controllers/psychologists")
const psychologistPsychologists = new controller()


router.get("/psychologists", psychologistPsychologists.listAllPsychologists)
router.get("/psychologist/:id", psychologistPsychologists.getPsychologistById)
router.post("/psychologist", psychologistPsychologists.signupNewPsychologist)

module.exports = router
