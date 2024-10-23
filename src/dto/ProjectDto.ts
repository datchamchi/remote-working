import { z } from 'zod'

export const ProjectSchema = z.object({
    projectName: z.string({ required_error: 'Missing field: project name' }),
    description: z.string({
        required_error: 'Missing field: description project',
    }),
    key: z.string({ required_error: 'Missing field: key project' }),
})

export type CreateProjectDto = z.infer<typeof ProjectSchema>
