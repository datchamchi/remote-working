import { Project } from './project.type'
import { Task } from './task.type'

export default interface User {
    id: number
    name: string
    email: string
    phoneNumber: string
    password: string
    photo: {
        id: number
        path: string
        size: number
        filename: string
    }

    tasks?: Task[]
    projects?: Project[]
    // rooms: RoomEntity[]
    // messages: MessageEntity[]
    // informations: InformationEntity[]
    createdAt: Date
    updatedAt: Date
}
