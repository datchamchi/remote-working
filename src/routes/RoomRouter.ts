import { Router } from 'express'
import { RoomController } from '../controllers'

const roomRouter = Router()
const roomController = new RoomController()
roomRouter.post('/', roomController.createRoom)
roomRouter.get('/', roomController.getListRooms)
export default roomRouter
