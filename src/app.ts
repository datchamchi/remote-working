import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParse from 'cookie-parser'

import protectedMiddleware from './middleware/protectedMiddleware'
import {
    authRouter,
    notiRouter,
    projectRouter,
    roomRouter,
    taskRouter,
    userRouter,
} from './routes'
import { responseError } from './utils/responseError'

import './config/passport'
import passport from 'passport'
const app = express()
app.use(cookieParse())
app.use(cors({ origin: process.env.URL_FRONTEND, credentials: true }))
app.use(express.json())

app.use(passport.initialize())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRouter)
app.use(protectedMiddleware)
app.use('/api/users', userRouter)
app.use('/api/projects', projectRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/notify', notiRouter)
app.use('/api/rooms', roomRouter)
app.all('*', (req: Request, res: Response) => {
    res.status(400).json({
        status: 'error',
        message: 'Invalid path',
    })
})
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    responseError(res, error)
})

export default app
