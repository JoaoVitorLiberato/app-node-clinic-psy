const { expressjwt: expressJWT } = require("express-jwt")

module.exports = expressJWT({
  secret: process.env.APPLICATION_SECRET_KEY,
  algorithms: ["HS256"]
})