import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { UserEntity } from './userEntity'
import { MessageEntity } from './messageEntity'

@Entity('room')
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    name: string

    @Column({ default: false })
    isCalling: boolean

    @ManyToMany(() => UserEntity, (user) => user.rooms, { cascade: true })
    @JoinTable({ name: 'room_user' })
    users: UserEntity[]

    @OneToMany(() => MessageEntity, (message) => message.room)
    messages: MessageEntity[]
}
