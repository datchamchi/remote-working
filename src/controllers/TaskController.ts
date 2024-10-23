import { Request, Response } from 'express'
import TaskService from '../services/task/TaskService'
import { HttpCode } from '../../constant'
import { CreateTaskDto, TaskSchema } from '../dto/TaskDto'

import { responseError } from '../utils/responseError'
import { validateRequest } from '../utils/validateRequest'

export default class TaskController {
    private readonly taskService
    constructor() {
        this.taskService = new TaskService()
    }
    getAllTask = async (req: Request, res: Response) => {
        const { email } = req
        const { projectId } = req.params

        if (!email) {
            return res.status(HttpCode.FORBIDDEN).json({
                status: 'fail',
                message: 'Forbidden',
            })
        }
        try {
            const tasks = await this.taskService.getAllTasks(projectId)
            return res.status(HttpCode.OK).json({
                status: 'success',
                data: tasks,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    addTask = async (
        req: Request<{ projectId: string }, object, CreateTaskDto>,
        res: Response
    ) => {
        const { user } = req
        try {
            if (!user)
                return res.status(HttpCode.FORBIDDEN).json({
                    status: 'fail',
                    message: 'Forbidden to add task',
                })
            validateRequest(TaskSchema)(req.body)
            const task = await this.taskService.addTask(
                req.params.projectId,
                req.body
            )
            res.status(HttpCode.CREATE_SUCCESS).json({
                status: 'success',
                data: task,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
}
