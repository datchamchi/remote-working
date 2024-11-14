import { z } from 'zod'

export const LoginUserSchema = z.object({
    email: z
        .string({ required_error: 'Missing field: email' })
        .min(1, 'Please provide your email')
        .refine((email) => {
            const regex = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/
            return email.length === 0 || RegExp(regex).exec(email.toLowerCase())
        }, 'Invalid email'),
    password: z
        .string({ required_error: 'Missing field: password' })
        .min(1, 'Please provide your password'),
})

export type LoginUserDto = z.infer<typeof LoginUserSchema>
