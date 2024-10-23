import { Router } from 'express'
import { NotiController } from '../controllers/NotiController'

const notiRouter = Router()
const notiController = new NotiController()
notiRouter.get('/', notiController.getAllNoti)
notiRouter.post('/', notiController.addNoti)
notiRouter.patch('/:notifyId', notiController.updateStatus)
export default notiRouter
