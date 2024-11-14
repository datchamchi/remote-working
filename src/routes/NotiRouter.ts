import { Router } from 'express'
import { NotiController } from '../controllers'

const notiRouter = Router()
const notiController = new NotiController()
notiRouter.get('/', notiController.getAllNoti)
notiRouter.post('/', notiController.addNoti)
notiRouter.patch('/readall', notiController.updateAllStatus)
notiRouter.patch('/:notifyId', notiController.updateStatus)
export default notiRouter
