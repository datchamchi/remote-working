import { Request, Response } from 'express'
import { SubTaskService } from '../services/SubTaskService'
import {
    CreateSubTaskDto,
    SubTaskSchema,
    UpdateSubTaskDto,
} from '../dto/SubTaskDto'
import { responseError, validateRequest } from '../utils'

export class SubTaskController {
    private readonly subTaskService: SubTaskService
    constructor() {
        this.subTaskService = new SubTaskService()
    }
    createSubTask = async (
        req: Request<{ taskKey: string }, object, CreateSubTaskDto>,
        res: Response
    ) => {
        const { taskKey } = req.params
        const dto = req.body

        try {
            validateRequest(SubTaskSchema)(dto)
            const subtask = await this.subTaskService.createSubTask(
                taskKey,
                req.body
            )
            res.status(200).json({
                status: 'success',
                data: subtask,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    updateSubTask = async (
        req: Request<{ subtaskId: string }, object, UpdateSubTaskDto>,
        res: Response
    ) => {
        try {
            const { subtaskId } = req.params
            const ACCEPT_STATUS = ['complete', 'incomplete']
            if (!ACCEPT_STATUS.includes(req.body.status))
                return res.status(400).json({
                    status: 'fail',
                    message: 'Invalid status',
                })
            const updated = await this.subTaskService.updateSubTask(
                subtaskId,
                req.body
            )

            res.status(200).json({
                status: 'success',
                data: updated,
            })
        } catch (err) {
            console.log(err)
            responseError(res, err)
        }
    }
    deleteSubtask = async (
        req: Request<{ subtaskId: string }>,
        res: Response
    ) => {
        try {
            const { subtaskId } = req.params
            await this.subTaskService.deleteSubTask(subtaskId)
            res.status(204).json({
                status: 'success',
                data: null,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
}
