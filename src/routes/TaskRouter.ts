import { Router } from 'express'
import { TaskController } from '../controllers'
import subTaskRouter from './SubTaskRouter'

const taskRouter = Router({ mergeParams: true })
const taskController = new TaskController()

taskRouter.get('/', taskController.getAllTaskByUser)
taskRouter.get('/pages', taskController.getTotalPage)
taskRouter
    .route('/:taskId')
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask)

taskRouter.route('/:taskKey').get(taskController.getTask)
taskRouter.use('/:taskKey/subtasks', subTaskRouter)
export default taskRouter
