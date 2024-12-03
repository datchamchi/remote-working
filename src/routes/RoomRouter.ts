import { Router } from 'express'
import { RoomController } from '../controllers'
import messageRouter from './MessageRouter'
const roomRouter = Router()
const roomController = new RoomController()
roomRouter.post('/', roomController.createRoom)
roomRouter.get('/', roomController.getListRooms)
roomRouter.get('/:id', roomController.getRoom)

roomRouter.use('/:roomId/messages', messageRouter)
export default roomRouter
