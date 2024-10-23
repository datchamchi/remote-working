import { Request, Response } from 'express'

import UserService from '../services/UserService'

export class UserController {
    private readonly userService: UserService
    constructor() {
        this.userService = new UserService()
    }
    getAllUser = (req: Request, res: Response) => {
        res.status(200).send('GET list user')
    }
}
