import { Router } from 'express'
import { TaskController } from '../controllers'

const taskRouter = Router({ mergeParams: true })
const taskController = new TaskController()

taskRouter.get('/', taskController.getAllTaskByUser)
taskRouter.get('/pages', taskController.getTotalPage)
taskRouter
    .route('/:taskId')
    .get(taskController.getTask)
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask)

taskRouter.route('/:taskKey').get(taskController.getTask)

export default taskRouter
