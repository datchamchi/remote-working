import { Router } from 'express'
import passport from 'passport'

import { uploader } from '../config'
import { AuthController } from '../controllers'
import { User } from '../types'

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/signup', uploader.single('photo'), authController.signUp)
authRouter.post('/login', authController.login)
authRouter.get('/refresh', authController.refreshToken)
authRouter.get(
    '/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)
authRouter.get(
    '/google/redirect',
    passport.authenticate('google', {
        session: false,
    }),
    (req, res) => {
        const data = req.user as { user: User; token: string }
        res.redirect(
            `${process.env.URL_FRONTEND}/your-tasks?accessToken=${data.token}&user=${encodeURIComponent(JSON.stringify(data.user))}&page=1&time=deadline&type=all`
        )
    }
)
export default authRouter
