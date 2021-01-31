const Router = require('express').Router()

const SessionController = require('./controllers/SessionController')
const AuthMiddlware = require('./middleware/Auth')

Router.post('/sessions', SessionController.store)

Router.use(AuthMiddlware)
Router.get('/dashboard', (req, res) => res.status(200).send())

module.exports = Router
