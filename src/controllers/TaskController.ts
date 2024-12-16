import { Request, Response } from 'express'
import TaskService from '../services/task/TaskService'
import { HttpCode } from '../../constant'
import { CreateTaskDto, TaskSchema, UpdateTaskDto } from '../dto/TaskDto'
import { responseError, validateRequest } from '../utils'

export class TaskController {
    private readonly taskService: TaskService
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
        const { email } = req
        try {
            if (!email)
                return res.status(HttpCode.FORBIDDEN).json({
                    status: 'fail',
                    message: 'Forbidden to add task',
                })
            validateRequest(TaskSchema)(req.body)
            const task = await this.taskService.addTask(
                email,
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
    getAllTaskByUser = async (
        req: Request<
            object,
            object,
            object,
            {
                page: string
                time: 'deadline' | 'recently'
                type: 'todo' | 'ongoing' | 'done' | 'all' | 'overdue'
            }
        >,
        res: Response
    ) => {
        const { email } = req
        const { page = '1', time, type } = req.query
        try {
            const tasks = await this.taskService.getllTasksByUser(
                email,
                page,
                time,
                type
            )
            res.status(200).json({
                status: 'success',
                data: tasks,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    getTotalPage = async (
        req: Request<
            object,
            object,
            object,
            {
                time: 'deadline' | 'recently'
                type: 'todo' | 'ongoing' | 'done' | 'all'
            }
        >,
        res: Response
    ) => {
        const { email } = req
        const { time, type } = req.query
        try {
            const totalPage = await this.taskService.getTotalPage(
                email,
                time,
                type
            )
            res.status(200).json({
                status: 'success',
                data: totalPage,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    updateTask = async (
        req: Request<{ taskId: string }, object, UpdateTaskDto>,
        res: Response
    ) => {
        const { email } = req
        const { taskId } = req.params

        if (!email)
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized',
            })

        try {
            const task = await this.taskService.updateTask(
                email,
                taskId,
                req.body
            )
            res.status(200).json({
                status: 'success',
                data: task,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    deleteTask = async (req: Request<{ taskId: string }>, res: Response) => {
        const { email } = req
        const { taskId } = req.params
        try {
            await this.taskService.deleteTask(email, taskId)
            res.status(201).json({
                status: 'success',
                message: 'Delete Task Successfully',
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    getTask = async (req: Request<{ taskKey: string }>, res: Response) => {
        const { taskKey } = req.params

        try {
            const task = await this.taskService.getTask(taskKey)
            res.status(200).json({
                status: 'success',
                data: task,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
}
