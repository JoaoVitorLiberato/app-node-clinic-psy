class middlewareAuthToken {
  auth = async (request, response, next) => {
    const APPLICATION_AUTHORIZATION = await request.headers.authorization

    if (!APPLICATION_AUTHORIZATION) {
      return response.status(401).json({
        message: "Unauthorized - No authorization token was found"
      })
    }

    next()
  }
}

module.exports = middlewareAuthToken
