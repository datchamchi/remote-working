import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import 'reflect-metadata'
import http from 'http'

import { ServerSocket } from './socket'
import { AppDataSource } from './config'

const server = http.createServer(app)

new ServerSocket(server)

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server starting at port ${port}`)
    AppDataSource.initialize()
        .then(() => {
            console.log('Connect DB successfully')
        })
        .catch()
})
