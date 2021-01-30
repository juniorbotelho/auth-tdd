import express from 'express'
import bodyParser from 'body-parser'
import Router from './app/routes'

export class App {
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
