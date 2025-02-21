require("dotenv").config()

const express = require("express")
const path = require("path")
const DATABASE = require("./database");
const jwtMiddleware = require("./middlewares/jwtApplication")

const app = express()

const authUserRouter = require("./routes/authUserRouter")
const psychologistsRouter = require("./routes/psychologistsRouter")
const patientsRouter = require("./routes/patientsRouter")
const servicesRouter = require("./routes/servicesRouter")

const AUTH_APPLICATION = require("./middlewares/authApplicationKey")

app.use(AUTH_APPLICATION)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(jwtMiddleware.unless({ path: ["/", "/v1/login"] }))

DATABASE.connectDatabase()

app.use(express.static("public"))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.use("/v1", authUserRouter)
app.use("/v1", psychologistsRouter)
app.use("/v1", patientsRouter)
app.use("/v1", servicesRouter)

app.listen(process.env.APPLICATION_PORT, () => {
  console.log(`Running serve at port ${process.env.APPLICATION_PORT}`)
})