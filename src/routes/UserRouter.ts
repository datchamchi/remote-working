import { Router } from 'express'
import { UserController } from '../controllers'
import { uploader } from '../config'

const userRouter = Router()
const userController = new UserController()
userRouter.route('/user-relate').get(userController.getAllUserRelate)
userRouter.patch('/:userId', uploader.single('photo'), userController.update)
export default userRouter
