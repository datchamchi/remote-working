import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from '../../constant'
export default function generateTokens(payload: object) {
    const accessToken = jwt.sign(payload, String(process.env.ACCESS_API_KEY), {
        expiresIn: ACCESS_TOKEN_EXPIRE,
    })
    const refreshToken = jwt.sign(
        payload,
        String(process.env.REFRESH_API_KEY),
        {
            expiresIn: REFRESH_TOKEN_EXPIRE,
        }
    )
    return { accessToken, refreshToken }
}
