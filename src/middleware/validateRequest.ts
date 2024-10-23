import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validateMiddleware =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                ...req.body,
            })
            next()
        } catch (err) {
            return next(err)
        }
    }
export default validateMiddleware
