const Router = require('express').Router()

const SessionController = require('./controllers/SessionController')

Router.post('/sessions', SessionController.store)

module.exports = Router
