const { Sequelize } = require("sequelize")

let database = {}

const connectDatabase = async () => {
  try {
    database = new Sequelize(
      process.env.DATABASE_NAME,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      {
        dialect: process.env.DATABASE_DIALECT,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
      }
    )

    await database.authenticate()
  } catch (error) {
    console.error("Database error:", error.message)
  }
}

Object.assign(database, { connectDatabase })

module.exports = database
