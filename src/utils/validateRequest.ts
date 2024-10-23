import { AnyZodObject, ZodError } from 'zod'
import { AppError } from './AppError'

export const validateRequest = (schema: AnyZodObject) => (input: any) => {
    try {
        schema.parse(input)
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            const message = err.errors.map((err) => err.message)
            throw new AppError(400, message)
        }
    }
}
