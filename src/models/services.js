const DATABASE = require("../database")
const DATA_TYPES = require("sequelize")
const PSYCHOLOGISTS = require("./psychologists")
const PATIENTS = require("./patients")

const SERVICES = DATABASE.define(
  "services",
  {
    id: {
      type: DATA_TYPES.UUID,
      defaultValue: DATA_TYPES.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: DATA_TYPES.DATE,
      allowNull: false
    },
    observation: {
      type: DATA_TYPES.STRING,
      allowNull: false,
    },
    status: {
      type: DATA_TYPES.STRING,
      allowNull: false,
    },
    patient_id: {
      type: DATA_TYPES.UUID,
      allowNull: false,
      references: {
        model: PATIENTS,
        key: "id"
      }
    },
    psychologist_id: {
      type: DATA_TYPES.UUID,
      allowNull: false,
      references: {
        model: PSYCHOLOGISTS,
        key: "id"
      }
    },
    createdAt: {
      type: DATA_TYPES.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DATA_TYPES.DATE,
      allowNull: false
    }
  },

  {
    tableName: "services",
    timestamp: true
  }
)

module.exports = SERVICES
