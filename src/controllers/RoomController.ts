import { Request, Response } from 'express'
import { RoomService } from '../services/RoomService'
import { CreateRoomDto } from '../dto'
import { responseError } from '../utils'

export class RoomController {
    private readonly roomService: RoomService
    constructor() {
        this.roomService = new RoomService()
    }

    createRoom = async (
        req: Request<object, object, CreateRoomDto>,
        res: Response
    ) => {
        const { email } = req
        try {
            const room = await this.roomService.createRoom(email, req.body)
            res.status(201).json({
                status: 'success',
                data: room,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    getListRooms = async (
        req: Request<object, object, object, { type: number }>,
        res: Response
    ) => {
        const { email } = req
        try {
            const rooms = await this.roomService.getListRooms(email)
            res.status(200).json({
                status: 'success',
                data: rooms,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    getRoom = async (req: Request<{ id: number }>, res: Response) => {
        const { email } = req
        const { id } = req.params
        try {
            const room = await this.roomService.getRoom(email, id)
            res.status(200).json({
                status: 'success',
                data: room,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
}
