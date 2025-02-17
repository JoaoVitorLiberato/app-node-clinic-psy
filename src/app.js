require("dotenv").config()

const express = require("express")
const path = require("path")
const DATABASE = require("./database");

const psychologistsRouter = require("./routes/psychologistsRouter")

const app = express()

DATABASE.connectDatabase()

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.use(psychologistsRouter)

app.listen(process.env.APPLICATION_PORT, () => {
  console.log(`Running serve at port ${process.env.APPLICATION_PORT}`)
})