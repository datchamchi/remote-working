import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import taskRouter from './TaskRouter'

const projectRouter = Router()
const projectController = new ProjectController()
projectRouter.post('/', projectController.addProject)
projectRouter.get('/', projectController.getAllProjects)
projectRouter.get('/:projectId', projectController.getProject)

projectRouter.patch('/:projectId/invite', projectController.addUserIntoProject)
projectRouter.use('/:projectId/tasks', taskRouter)
export default projectRouter
