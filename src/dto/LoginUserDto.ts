import { z } from 'zod'

export const LoginUserSchema = z.object({
    email: z
        .string({ required_error: 'Missing field: email' })
        .refine((email) => {
            const regex = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/
            return RegExp(regex).exec(email.toLowerCase())
        }, 'Invalid email'),
    password: z
        .string({ required_error: 'Missing field: password' })
        .min(6, 'Minimum password has 6 characters'),
})

export type LoginUserDto = z.infer<typeof LoginUserSchema>
