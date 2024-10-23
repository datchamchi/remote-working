import * as GooglePassPort from 'passport-google-oauth2'
import passport from 'passport'
import User from '../types/user.type'
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
            callbackURL: '/api/auth/google/redirect',
            passReqToCallback: true,
        },
        function (accessToken: string, refreshToken: string, profile, done) {
            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //     return done(err, user)
            // })
            console.log(profile)
        }
    )
)
