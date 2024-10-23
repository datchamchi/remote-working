export type Token = {
    accessToken: string
    refreshToken: string
}

export interface JwtPayload {
    user: string
    iat: number
    exp: number
}
