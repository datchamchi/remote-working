import { Router } from 'express'
import { TaskController } from '../controllers'
import commentRouter from './CommentRouter'

const projectTaskRouter = Router({ mergeParams: true })
const taskController = new TaskController()

projectTaskRouter.get('/', taskController.getAllTask)
projectTaskRouter.post('/', taskController.addTask)
projectTaskRouter.use('/:taskId/comments', commentRouter)
export default projectTaskRouter
