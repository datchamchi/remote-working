import { z } from 'zod'

export const MessageSchema = z.object({
    content: z.string({ required_error: 'Missing field: content' }),
    type: z.enum(['text', 'img'], {
        required_error: 'Missing field: type message',
    }),
})

export type CreateMessageDto = z.infer<typeof MessageSchema>
