import GooglePassPort from 'passport-google-oauth20'
import passport from 'passport'

import { AppDataSource } from './database'
import { UserEntity } from '../entity'
import { generateTokens } from '../utils'

const GoogleStrategy = GooglePassPort.Strategy

const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET

if (!clientID || !clientSecret) {
    throw new Error('Missing clientID or clientSecret')
}
passport.use(
    new GoogleStrategy(
        {
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: '/api/auth/redirect',
            passReqToCallback: true,
        },
        async function (req, accessToken, refreshToken, profile, cb) {
            const {
                _json: { email, name, picture },
            } = profile

            if (!email) return cb(null, false)

            try {
                const userRepo = AppDataSource.getRepository(UserEntity)

                const userExist = await userRepo.findOne({
                    where: { email: email },
                    relations: ['photo'],
                })
                let user: UserEntity

                if (!userExist) {
                    user = await userRepo.save({
                        email,
                        name,
                        photo: { path: picture },
                    })
                } else {
                    user = userExist
                }
                const { accessToken: token } = generateTokens({ email })

                return cb(null, { user, token })
            } catch (error) {
                console.error('Error during Google OAuth callback:', error)
                return cb(error, false)
            }
        }
    )
)
