import { Router } from 'express'
import { TaskController } from '../controllers'

const projectTaskRouter = Router({ mergeParams: true })
const taskController = new TaskController()

projectTaskRouter.get('/', taskController.getAllTask)
projectTaskRouter.post('/', taskController.addTask)

export default projectTaskRouter
