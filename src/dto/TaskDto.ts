import { z } from 'zod'

export const TaskSchema = z.object({
    taskName: z.string({ required_error: 'Missing field: task name' }),
    description: z.string({
        required_error: 'Missing field: task description',
    }),
    estimate: z
        .string({
            required_error: 'Missing field: task estimate',
            invalid_type_error: 'Estimate must be date',
        })
        .transform((value) => new Date(value)),
    assign: z.number({ required_error: 'Missing field: user id assign' }),
})
export type CreateTaskDto = z.infer<typeof TaskSchema>
