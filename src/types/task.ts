export type Task = {
    id: number
    taskName: string
    key: string
    description: string
    state: 'todo' | 'ongoing' | 'done'
    estimate: Date
    createdAt: Date
    updatedAt: Date
}
