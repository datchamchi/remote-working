import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import 'reflect-metadata'
import http from 'http'

import { ServerSocket } from './socket'
import { AppDataSource } from './config'
import cron from 'node-cron'
import TaskService from './services/task/TaskService'

const server = http.createServer(app)

new ServerSocket(server)

cron.schedule('1 22 11 * * *', async (time: Date | 'manual' | 'init') => {
    const tasks = await TaskService.handleTaskDueTo(new Date(time))
    console.log(tasks)
})
cron.schedule('* * * * *', async (time: Date | 'manual' | 'init') => {
    await TaskService.updateStateOverdueTask(new Date(time))
})
const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server starting at port ${port}`)
    AppDataSource.initialize()
        .then(() => {
            console.log('Connect DB successfully')
        })
        .catch()
})
