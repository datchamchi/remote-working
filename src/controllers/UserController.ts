import { Request, Response } from 'express'

import UserService from '../services/UserService'
import { responseError } from '../utils'
import { UpdateUserDto } from '../dto/UserDto'

export class UserController {
    private readonly userService: UserService
    constructor() {
        this.userService = new UserService()
    }
    getAllUserRelate = async (
        req: Request<object, object, object, { name: string }>,
        res: Response
    ) => {
        const { email } = req
        const { name } = req.query
        try {
            const users = await this.userService.getUserRelate(email, name)

            res.status(200).json({
                status: 'success',
                data: users,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
    update = async (
        req: Request<{ userId: string }, object, UpdateUserDto>,
        res: Response
    ) => {
        const { userId } = req.params
        const file: Express.Multer.File | undefined = req.file
        try {
            const user = await this.userService.update(userId, req.body, file)
            res.status(200).json({
                status: 'success',
                data: user,
            })
        } catch (err) {
            responseError(res, err)
        }
    }
}
