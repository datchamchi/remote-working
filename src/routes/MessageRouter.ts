import { Router } from 'express'
import { MessageController } from '../controllers/MessageController'

const messageRouter = Router({ mergeParams: true })
const messageController = new MessageController()

messageRouter.route('/').post(messageController.createMessage)
export default messageRouter
