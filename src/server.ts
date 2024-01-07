import express, { type Application, type Request, type Response } from 'express'
import { createServer, type Server as HTTPServer } from 'node:http'
import { Server as SocketIOServer } from 'socket.io'

import bodyParser from 'body-parser'
import cors from 'cors'

import socketConfig from './config/socket-config'

export class Server {
  private express: Application
  private httpServer: HTTPServer
  private io: SocketIOServer

  constructor() {
    this.express = express()
    this.httpServer = createServer(this.express)
    this.io = new SocketIOServer(this.httpServer, socketConfig)
  }

  private configureMiddleware(): void {
    this.express.use(cors())
    this.express.use(bodyParser.json())
  }

  private checkHealthServer(): void {
    this.express.get('/', (_req: Request, res: Response) => {
      res.status(200).json({
        status: 'OK',
        message: 'Server is running',
      })
    })
  }

  private configureRoutes(): void {
    this.checkHealthServer()
  }

  public start(port: number, callback?: () => void): void {
    this.configureMiddleware()
    this.configureRoutes()

    this.httpServer.listen(port, callback)
  }
}
