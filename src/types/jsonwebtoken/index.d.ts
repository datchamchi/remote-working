import { JwtPayload } from 'jsonwebtoken'

declare module 'jsonwebtoken' {
    export interface UserJwtPayload extends JwtPayload {
        email: string
    }
}
