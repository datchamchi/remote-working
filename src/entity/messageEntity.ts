import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { RoomEntity } from './roomEntity'
import { UserEntity } from './userEntity'

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    type: 'text' | 'img'

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => RoomEntity, (room) => room.messages)
    room: RoomEntity

    @ManyToOne(() => UserEntity, (user) => user.messages)
    user: UserEntity
}