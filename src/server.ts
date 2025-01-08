import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import 'reflect-metadata'
import http from 'http'

import { ServerSocket } from './socket'
import { AppDataSource, sendEmail } from './config'
import cron from 'node-cron'
import TaskService from './services/task/TaskService'
import { formatDate } from 'date-fns'

const server = http.createServer(app)

new ServerSocket(server)

cron.schedule('1 7 1 * * *', async (time: Date | 'manual' | 'init') => {
    const tasks = await TaskService.handleTaskDueTo(new Date(time))

    tasks.forEach((task) => {
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
        }
        .content {
            color: #555;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #aaa;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Task Deadline Reminder
        </div>
        <div class="content">
            <p>Dear ${task.user.name},</p>
            <p>This is a gentle reminder that your task, "<strong>${task.taskName}</strong>", is approaching its deadline and will expire today: <strong>${formatDate(task.estimate, 'HH:mm PPP')}</strong>.</p>
            <p>Please ensure that all required actions are completed in time to avoid any inconvenience.</p>
            <p>If you have any questions or need assistance, feel free to reach out to us.</p>
            <p>Best regards,</p>
        </div>
        <div class="footer">
            This is an automated message. Please do not reply to this email.
        </div>
    </div>
</body>
</html>
`
        sendEmail(task.user.email, htmlContent)
    })
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
