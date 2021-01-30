class SessionController {
  async store(req, res) {
    res.status(200).send('Success!')
  }
}

module.exports = new SessionController()
