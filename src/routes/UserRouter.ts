import { Router } from 'express'
import { UserController } from '../controllers'

const userRouter = Router()
const userController = new UserController()
userRouter.route('/user-relate').get(userController.getAllUserRelate)

export default userRouter
