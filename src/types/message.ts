import { Room } from './room'
import { User } from './user'

export type Message = {
    id: number
    content: string
    createdAt: Date
    user: User
    room: Room[]
}
