import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { HttpCode } from '../../constant'
import { AppDataSource } from '../config/database'
import { UserEntity } from '../entity/user.entity'

const protectedMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = req.headers.authorization?.split(' ')[1]

    if (!accessToken) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'fail',
            message: 'Unauthorized',
        })
    }
    try {
        // console.log(accessToken)
        const { email } = <jwt.UserJwtPayload>(
            jwt.verify(accessToken, String(process.env.ACCESS_API_KEY))
        )
        // check email valid
        const userRepo = AppDataSource.getRepository(UserEntity)
        const user = await userRepo.findOne({ where: { email } })

        if (!user)
            return res.status(403).json({
                status: 'fail',
                message: 'User Invalid',
            })
        req.email = email

        next()
    } catch {
        res.status(HttpCode.FORBIDDEN).json({
            status: 'fail',
            message: 'Forbidden',
        })
    }
}

export default protectedMiddleware
