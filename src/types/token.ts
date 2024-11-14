export type Token = {
    accessToken: string
    refreshToken: string
}

export type JwtPayload = {
    user: string
    iat: number
    exp: number
}
