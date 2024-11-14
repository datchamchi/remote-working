import { User } from './user'

export type Project = {
    id: number
    projectName: string
    leader: string
    createdAt: Date
    users: User[]
}
