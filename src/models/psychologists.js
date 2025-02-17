const DATABASE = require("../database")
const DATA_TYPES = require("sequelize")

const PSYCHOLOGISTS = DATABASE.define(
  "psychologists",
  {
    id: {
      type: DATA_TYPES.UUID,
      defaultValue: DATA_TYPES.UUIDV4,
      primaryKey: true,
      autoIncrement: true
    },
    fullName: {
      type: DATA_TYPES.STRING,
      allowNull: false
    },
    sigla: {
      type: DATA_TYPES.STRING,
      allowNull: false
    },
    document: {
      type: DATA_TYPES.STRING,
      allowNull: false
    },
    email: {
      type: DATA_TYPES.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DATA_TYPES.STRING,
      allowNull: false
    },
    presentation: {
      type: DATA_TYPES.STRING,
      allowNull: false
    }
  },

  {
    tableName: "psychologists",
    timestamps: true
  }
)

module.exports = PSYCHOLOGISTS
