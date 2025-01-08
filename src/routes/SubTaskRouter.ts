import { Router } from 'express'
import { SubTaskController } from '../controllers/SubTaskController'

const subTaskRouter = Router({ mergeParams: true })
const subTaskController = new SubTaskController()
subTaskRouter.route('/').post(subTaskController.createSubTask)
subTaskRouter
    .route('/:subtaskId')
    .patch(subTaskController.updateSubTask)
    .delete(subTaskController.deleteSubtask)
export default subTaskRouter
