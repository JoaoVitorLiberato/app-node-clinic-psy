const PATIENTS = require("./patients")
const PSYCHOLOGISTS = require("./psychologists")
const SERVICES = require("./services")

PSYCHOLOGISTS.hasMany(SERVICES),
SERVICES.belongsTo(PSYCHOLOGISTS, {
  foreignKey: "psychologist_id"
})

PATIENTS.hasMany(SERVICES)
SERVICES.belongsTo(PATIENTS, {
  foreignKey: "patient_id"
})

module.exports = {
  PATIENTS,
  PSYCHOLOGISTS,
  SERVICES
}
