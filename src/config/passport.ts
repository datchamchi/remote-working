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
            const userRepo = AppDataSource.getRepository(UserEntity)

            if (!email) return
            const { accessToken: token } = generateTokens({ email })
            const userExist = await userRepo.findOne({
                where: { email: email },
                relations: ['photo'],
            })
            console.log(userExist)
            if (!userExist) {
                const user = await userRepo.save({
                    email,
                    name,
                    photo: {
                        path: picture,
                    },
                })
                return cb(null, { user, token })
            }

            return cb(null, { user: userExist, token })
        }
    )
)
