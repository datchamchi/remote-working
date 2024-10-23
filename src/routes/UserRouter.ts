import { Router } from 'express'
import { UserController } from '../controllers/UserController'

const userRouter = Router()
const userController = new UserController()
userRouter.route('/').get(userController.getAllUser)
export default userRouter
