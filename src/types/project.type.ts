import User from './user.type'

export type Project = {
    id: number
    projectName: string
    leader: string
    createdAt: Date
    users: User[]
}
