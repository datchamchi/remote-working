import { Request, Response } from 'express'

import UserService from '../services/UserService'
import { responseError } from '../utils'

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
}
