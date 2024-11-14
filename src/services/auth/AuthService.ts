import { ZodError } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Repository } from 'typeorm'

import IAuthService from './IAuthService'
import { AppDataSource } from '../../config'
import { UserEntity } from '../../entity'
import { CreateUserDto, LoginUserDto } from '../../dto'
import { AppError, generateTokens } from '../../utils'
import { ACCESS_TOKEN_EXPIRE, HttpCode } from '../../../constant'
import { JwtPayload } from '../../types'

export default class AuthService implements IAuthService {
    private readonly userRepository: Repository<UserEntity>
    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity)
    }

    signUp = async (input: CreateUserDto) => {
        // check user exist
        const { email, password: passwordInput } = input
        const existUser = await this.userRepository.findOne({
            where: { email },
        })
        if (existUser) throw new AppError(HttpCode.BAD_REQUEST, 'Email exist')

        try {
            // hash Password
            const hashPassword = await bcrypt.hash(passwordInput, 10)
            // create data
            const { password, passwordConfirm, ...newUser } =
                await this.userRepository.save({
                    ...input,
                    password: hashPassword,
                })
            return newUser
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const error = err.errors.map((error) => error.message)
                throw new AppError(HttpCode.BAD_REQUEST, error)
            }
            if (err instanceof Error) {
                throw new AppError(HttpCode.BAD_REQUEST, err.message)
            }
            throw new AppError(
                HttpCode.INTERNAL_SERVER_ERROR,
                'Unexpect server occured'
            )
        }
    }

    /**
     * @param LoginUserDto email: string ,password: string
     * @returns Promise(user,accessToken ,refreshToken,)
     */
    async login(input: LoginUserDto) {
        const { email, password: passwordInput } = input
        // check email

        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['photo'],
        })
        if (!user) throw new AppError(400, 'User not exist')
        if (!user.password)
            throw new AppError(
                400,
                'This email is linked to a Google account. Please login with Google.'
            )
        const checkPassword = await bcrypt.compare(passwordInput, user.password)
        if (!checkPassword) throw new AppError(400, 'Password incorrect')
        const { password, ...userWithoutPassword } = user
        const { accessToken, refreshToken } = generateTokens({
            email: user.email,
        })
        return { user: userWithoutPassword, accessToken, refreshToken }
    }

    /**
     *
     */
    getNewAccessToken = async (refreshToken: string) => {
        const payload = jwt.verify(
            refreshToken,
            String(process.env.REFRESH_API_KEY)
        )
        if (!payload) throw new AppError(403, 'Forbidden')
        const { user } = payload as JwtPayload
        const newAccessToken = jwt.sign(
            { user },
            String(process.env.ACCESS_API_KEY),
            {
                expiresIn: ACCESS_TOKEN_EXPIRE,
            }
        )
        return newAccessToken
    }
}
