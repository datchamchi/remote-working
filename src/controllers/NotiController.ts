import { Request, Response } from 'express'
import { NotifyService } from '../services/notify/NotifyService'

import { HttpCode } from '../../constant'
import { CreateNotifyDto, NotifySchema, UpdateNotifyDto } from '../dto'
import { responseError, validateRequest } from '../utils'

export class NotiController {
    private readonly notiService: NotifyService
    constructor() {
        this.notiService = new NotifyService()
    }

    getAllNoti = async (req: Request, res: Response) => {
        try {
            const email = req.email

            const noti = await this.notiService.getAllNotify(email)
            res.status(HttpCode.OK).json({
                status: 'succcess',
                data: noti,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    addNoti = async (
        req: Request<object, object, CreateNotifyDto>,
        res: Response
    ) => {
        try {
            validateRequest(NotifySchema)(req.body)
            const noti = await this.notiService.addNotify(req.body)
            res.status(HttpCode.CREATE_SUCCESS).json({
                status: 'success',
                data: noti,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    updateStatus = async (
        req: Request<{ notifyId: string }, object, UpdateNotifyDto>,
        res: Response
    ) => {
        try {
            const { type } = req.body
            const { notifyId } = req.params
            if (type === 'inform')
                await this.notiService.updateInformNotiStatus(notifyId)
            else if (type === 'invite')
                await this.notiService.updateInviteNotiStatus(notifyId)
            res.status(200).json({
                status: 'success',
                message: 'Update inform success',
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    updateAllStatus = async (req: Request, res: Response) => {
        try {
            const { email } = req
            await this.notiService.updateAllInformNotiStatus(email)
            res.status(200).json({
                status: 'success',
                message: 'All messages are read',
            })
        } catch (err) {
            responseError(res, err)
        }
    }
}
