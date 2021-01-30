const express = require('express')
const bodyParser = require('body-parser')
const Router = require('./app/routes')

class App {
  constructor() {
    this.express = express()

    // Initialize
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(express.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(bodyParser.json({ limit: '2mb' }))
  }

  routes() {
    this.express.use(Router)
  }
}

// Exports
module.exports = new App().express
