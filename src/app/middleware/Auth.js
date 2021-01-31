const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (request, response, next) => {
  const authHeader = request.headers['authorization']
  const token = authHeader?.replace('Bearer ', '')
  const verify = promisify(jwt.verify)

  if (!authHeader) {
    return response.status(401).json({
      message: 'token not provided!'
    })
  }

  try {
    const decoded = await verify(token, process.env.APP_SECRET_TOKEN)

    // passes to the request a new attribute that will be used for validation
    request.userId = decoded.id
    return next()
  } catch (error) {
    // TODO: Middlware::Auth::Error
    return response.status(401).json({
      message: 'invalid token!'
    })
  }
}
