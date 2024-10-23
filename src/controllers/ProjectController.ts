import { Request, Response } from 'express'
import { ProjectService } from '../services/project/ProjectService'
import { validateRequest } from '../utils/validateRequest'
import { CreateProjectDto, ProjectSchema } from '../dto/ProjectDto'
import { HttpCode } from '../../constant'
import { responseError } from '../utils/responseError'
import { SORT_PARAM } from '../types/index.type'

export class ProjectController {
    private readonly projectService
    constructor() {
        this.projectService = new ProjectService()
    }
    addProject = async (
        req: Request<object, object, CreateProjectDto>,
        res: Response
    ) => {
        try {
            validateRequest(ProjectSchema)(req.body)
            if (!req.email)
                return res.status(HttpCode.FORBIDDEN).json({
                    status: 'fail',
                    message: 'Forbidden',
                })
            const project = await this.projectService.addProject(
                req.email,
                req.body
            )
            return res.status(HttpCode.CREATE_SUCCESS).json({
                status: 'success',
                data: project,
            })
        } catch (err: unknown) {
            responseError(res, err)
        }
    }

    getAllProjects = async (
        req: Request<
            object,
            object,
            object,
            {
                page: string
                createdAt: SORT_PARAM
                name: SORT_PARAM
                leader: SORT_PARAM
            }
        >,
        res: Response
    ) => {
        const email = req.email
        const page = Number(req.query.page) || 1
        const { createdAt, name } = req.query

        if (!email)
            return res.status(HttpCode.FORBIDDEN).json({
                stauts: 'fail',
                message: 'Forbidden GET /projects',
            })
        try {
            const projects = await this.projectService.getAllProjects(
                email,
                page,
                createdAt,
                name
            )

            return res.status(HttpCode.OK).json({
                status: 'success',
                data: projects,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    getProject = async (req: Request<{ projectId: string }>, res: Response) => {
        try {
            const project = await this.projectService.getProject(
                Number(req.params.projectId)
            )
            res.status(200).json({
                status: 'success',
                data: project,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    addUserIntoProject = async (
        req: Request<{ projectId: string }, object, { emails: string[] }>,
        res: Response
    ) => {
        const { emails } = req.body
        const { projectId } = req.params
        try {
            const leader = req.email

            if (!leader)
                return res.status(HttpCode.UNAUTHORIZED).json({
                    status: 'fail',
                    message: 'Unauthorized',
                })
            const projectUpdate = await this.projectService.addUserIntoProject(
                projectId,
                leader,
                emails
            )
            res.status(200).json({
                status: 'success',
                data: projectUpdate,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
}
