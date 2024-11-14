import {
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { UserEntity } from './user.entity'
import { MessageEntity } from './message.entity'

@Entity('room')
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => UserEntity, (user) => user.rooms, { cascade: true })
    @JoinTable({ name: 'room_user' })
    users: UserEntity[]

    @OneToMany(() => MessageEntity, (message) => message.room)
    messages: MessageEntity[]
}
