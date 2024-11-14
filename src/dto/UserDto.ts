import { z } from 'zod'

export const UserSchema = z
    .object({
        name: z
            .string({ required_error: 'Missing field: last name' })
            .min(1, 'Invalid last name'),
        email: z
            .string({ required_error: 'Missing field: email' })
            .min(1, 'Please provide your email')
            .refine((email) => {
                const regex = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/
                return RegExp(regex).exec(email.toLowerCase())
            }, 'Invalid email'),
        phoneNumber: z.optional(z.string()),
        photo: z.optional(
            z.object({
                path: z.string(),
                size: z.number(),
                filename: z.string(),
            })
        ),
        password: z
            .string({ required_error: 'Missing field: password' })
            .min(1, 'Please provide your password'),
        passwordConfirm: z
            .string({
                required_error: 'Missing field: password confirm',
            })
            .min(1, 'Please provide password confirm'),
    })
    .refine(
        (data) =>
            data.passwordConfirm.length === 0 ||
            data.password === data.passwordConfirm,
        {
            message: 'Password and password confirm are not same',
            path: ['passwordConfirm'],
        }
    )
export type CreateUserDto = z.infer<typeof UserSchema>
