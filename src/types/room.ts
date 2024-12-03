import { Message } from './message'
import { User } from './user'

export type Room = {
    id: number
    name: string
    isCalling: boolean
    users: User[]
    message: Message[]
}
