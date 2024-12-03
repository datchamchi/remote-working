import { Response } from 'express'
import { HttpCode } from '../../constant'
import { AppError } from './AppError'

export function responseError(res: Response, err: unknown) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.messages,
        })
    } else if (err instanceof Error) {
        return res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            message: err.message,
        })
    } else {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Unexpected error occurred',
        })
    }
}
