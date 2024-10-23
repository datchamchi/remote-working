export enum HttpCode {
    OK = 200,
    CREATE_SUCCESS = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}
export const ALLOW_FORMAT = ['jpeg', 'png']

export const ACCESS_TOKEN_EXPIRE = '1d'
export const REFRESH_TOKEN_EXPIRE = '30d'
export const COOKIE_ACCESS_EXPIRE = 15 * 60 * 1000
export const COOKIE_REFRESH_EXPIRE = 30 * 24 * 60 * 60 * 1000

export const LIMIT_PROJECT_PAGE = 2
export const LIMIT_NOTIFY = 3

export enum SocketEvent {
    INVITE_OTHER = 'invitation',
    ACCPEPT_INVITE = 'accept',
    REFUSE_INVITE = 'refuse',
    USER_NOT_FOUND = 'not_found',
    NOTIFY_USER = 'notify',
    ERROR = 'error',
}
const SENDER_EMAIL = 'remote_working@gmail.io'

export const sender = { name: 'Mailtrap Test', email: SENDER_EMAIL }
