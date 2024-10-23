import { Request, Response } from 'express'
import cloudinary from 'cloudinary'
import { ZodError } from 'zod'

import { AppError } from '../utils/AppError'
import { COOKIE_REFRESH_EXPIRE, HttpCode } from '../../constant'
import AuthService from '../services/auth/AuthService'
import { CreateUserDto, UserSchema } from '../dto/UserDto'
import { LoginUserDto, LoginUserSchema } from '../dto/LoginUserDto'
import { validateRequest } from '../utils/validateRequest'

export default class AuthController {
    private readonly authService
    constructor() {
        this.authService = new AuthService()
    }

    /**
     * * sign-up user
     * @param req
     * @param res
     * @throws 400 Bad Request
     */
    signUp = async (
        req: Request<object, object, CreateUserDto>,
        res: Response
    ) => {
        try {
            // validate request
            UserSchema.parse(req.body)

            const file: Express.Multer.File | undefined = req.file

            // service
            const user = file
                ? await this.authService.signUp({
                      ...req.body,
                      photo: {
                          path: file.path,
                          size: file.size,
                          filename: file.filename,
                      },
                  })
                : await this.authService.signUp({ ...req.body })
            return res.status(HttpCode.CREATE_SUCCESS).json({
                status: 'success',
                data: user,
            })
        } catch (err: unknown) {
            if (req.file) {
                cloudinary.v2.uploader.destroy(req.file.filename)
            }
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({
                    status: err.status,
                    message: err.messages,
                })
            }
            if (err instanceof ZodError) {
                const message = err.errors.map((err) => err.message)
                return res.status(HttpCode.BAD_REQUEST).json({
                    status: 'error',
                    message,
                })
            }
            res.status(500).json({
                status: 'error',
                message: 'Unexpected error occured',
            })
        }
    }
    /**
     * * login user
     */
    login = async (
        req: Request<object, object, LoginUserDto>,
        res: Response
    ) => {
        try {
            validateRequest(LoginUserSchema)(req.body)
            const { user, accessToken, refreshToken } =
                await this.authService.login(req.body)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: COOKIE_REFRESH_EXPIRE,
            })
            res.cookie('accessToken', refreshToken, {
                httpOnly: true,
                maxAge: COOKIE_REFRESH_EXPIRE,
            })
            res.status(HttpCode.OK).json({
                status: 'success',
                user,
                accessToken,
            })
        } catch (err: unknown) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({
                    status: err.status,
                    message: err.messages,
                })
            }
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: 'Unexpected error occurred',
            })
        }
    }
    /**
     * * GET NEW ACCESS TOKEN
     */
    refreshToken = async (req: Request, res: Response) => {
        const { refreshToken } = req.cookies
        if (!refreshToken)
            res.status(HttpCode.FORBIDDEN).json({
                status: 'fail',
                message: 'Forbidden',
            })
        try {
            const newAccessToken =
                await this.authService.getNewAccessToken(refreshToken)
            res.status(200).json({
                status: 'success',
                accessToken: newAccessToken,
            })
        } catch (err) {
            res.status(HttpCode.FORBIDDEN).json({
                status: 'fail',
                message: 'Forbidden',
            })
        }
    }
}
