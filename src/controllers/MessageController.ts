import { Request, Response } from 'express'
import MessageService from '../services/MessageService'
import { CreateMessageDto } from '../dto'
import { responseError } from '../utils'

export class MessageController {
    private readonly messageService: MessageService
    constructor() {
        this.messageService = new MessageService()
    }
    createMessage = async (
        req: Request<{ roomId: number }, object, CreateMessageDto>,
        res: Response
    ) => {
        const { email } = req
        const { roomId } = req.params

        try {
            const message = await this.messageService.createMessage(
                email,
                roomId,
                req.body
            )
            res.status(201).json({
                status: 'success',
                data: message,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
}
