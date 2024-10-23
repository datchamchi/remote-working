export class AppError extends Error {
    statusCode: number
    status: string
    messages: string | string[]
    constructor(statusCode: number, messages: string | string[]) {
        super(Array.isArray(messages) ? messages.join(',') : messages)
        this.statusCode = statusCode
        this.status = ('' + this.statusCode).startsWith('4') ? 'fail' : 'error'
        this.messages = messages
        Error.captureStackTrace(this)
    }
}
