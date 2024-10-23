import { Router } from 'express'
import passport from 'passport'

import AuthController from '../controllers/AuthController'
import uploader from '../config/cloudinary'

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
    passport.authenticate('google'),
    (req, res) => {
        console.log('Redirect')
    }
)
export default authRouter
