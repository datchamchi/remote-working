import { Router } from 'express'
import TaskController from '../controllers/TaskController'

const taskRouter = Router({ mergeParams: true })
const taskController = new TaskController()

taskRouter.get('/', taskController.getAllTask)
taskRouter.post('/', taskController.addTask)
export default taskRouter
