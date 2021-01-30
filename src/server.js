import http from 'http'
import { App } from './app'

const app = new App()
const httpServer = http.createServer(app.express)

httpServer.listen(3000)
