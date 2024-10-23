import { z } from 'zod'

export const NotifySchema = z.object({
    content: z.string({ required_error: 'Missing field: content notify' }),
    type: z.enum(['invite', 'inform'], {
        invalid_type_error: 'Notify type is invite or inform',
        required_error: 'Missing field: type notify',
    }),
    from: z.string({ required_error: 'Missing field: from email' }),
    to: z.string({ required_error: 'Missing field: to email' }),
    project: z.optional(z.string()),
})
export type CreateNotifyDto = z.infer<typeof NotifySchema>

export type UpdateNotifyDto = {
    type: 'inform' | 'invite'
}
