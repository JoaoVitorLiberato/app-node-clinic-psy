const DATABASE = require("../database")
const DATA_TYPES = require("sequelize")

const PATIENTS = DATABASE.define(
  "patients",
  {
    id: {
      type: DATA_TYPES.UUID,
      defaultValue: DATA_TYPES.UUIDV4,
      alowNull: false,
      primaryKey: true
    },
    fullName: {
      type: DATA_TYPES.STRING,
      allowNull: false
    },
    phone: {
      type: DATA_TYPES.STRING,
      allowNull: false,
    },
    email: {
      type: DATA_TYPES.STRING,
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: DATA_TYPES.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: "patients",
    timestamp: true
  }
)

module.exports = PATIENTS
