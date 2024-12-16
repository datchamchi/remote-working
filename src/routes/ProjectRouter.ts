import { Router } from 'express'

import projectTaskRouter from './ProjectTaskRouter'
import { ProjectController } from '../controllers'

const projectRouter = Router()
const projectController = new ProjectController()
projectRouter.post('/', projectController.addProject)
projectRouter.get('/', projectController.getAllProjects)
projectRouter.get('/:projectId', projectController.getProject)
projectRouter.use('/:projectId/analys', projectController.analysProject)

projectRouter.patch('/:projectId/invite', projectController.addUserIntoProject)
projectRouter.use('/:projectId/tasks', projectTaskRouter)
export default projectRouter
