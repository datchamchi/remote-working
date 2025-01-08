import { z } from 'zod'

export const SubTaskSchema = z.object({
    name: z.string({ required_error: 'Missing field: subtask name' }),
    // status: z.enum(['complete', 'incomplete'], {
    //     invalid_type_error: 'Invalid status',
    //     required_error: 'Missing field: status',
    // }),
})
export type CreateSubTaskDto = z.infer<typeof SubTaskSchema>
export type UpdateSubTaskDto = {
    name: string
    status: 'complete' | 'incomplete'
}
