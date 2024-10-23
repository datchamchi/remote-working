import { Server } from 'socket.io'
import { Server as HttpServer } from 'http'
import { AppError } from './utils/AppError'
import jwt from 'jsonwebtoken'

import SocketController from './controllers/SocketController'

export class ServerSocket {
    // public static instance: ServerSocket
    public io: Server
    private readonly socketController
    // private readonly userService
    constructor(httpServer: HttpServer) {
        // ServerSocket.instance = this

        // start Server
        this.io = new Server(httpServer, {
            cors: {
                origin: '*',
            },
        })

        // middleware to authen token
        this.io.use(async (socket, next) => {
            const token = socket.handshake.headers.authorization
            if (!token) return next(new AppError(401, 'Unauthorize'))
            try {
                const { email } = <jwt.UserJwtPayload>(
                    jwt.verify(token, String(process.env.ACCESS_API_KEY))
                )
                socket.email = email
                next()
            } catch (err) {
                console.log(err)
                next(new Error('Authentication error'))
            }
        })

        this.socketController = new SocketController(this.io)
        this.io.on('connection', this.socketController.connection)
    }
}
