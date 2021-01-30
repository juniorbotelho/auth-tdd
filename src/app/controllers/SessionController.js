const { User } = require('../models')

class SessionController {
  async store(request, response) {
    const { email, password } = request.body

    const user = await User.findOne({ where: { email } })
    const check = await user.check(password)

    if (!user) {
      return response.status(401).json({
        message: 'User not found!'
      })
    }

    if (!check) {
      return response.status(401).json({
        message: 'Incorrect password!'
      })
    }

    // Success
    response.status(200).json({ user })
  }
}

module.exports = new SessionController()
