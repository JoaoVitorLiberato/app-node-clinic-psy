const { Sequelize } = require("sequelize")

let DATABASE;

try {
  DATABASE = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: process.env.DATABASE_DIALECT,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT
    }
  )
} catch {/* EMPTY */}

const connectDatabase = async () => {
  try {
    await DATABASE.authenticate()
  } catch (error) {
    console.error("Database error:", error.message)
  }
}

Object.assign(DATABASE, { connectDatabase })

module.exports = DATABASE
