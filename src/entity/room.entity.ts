import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ProjectEntity } from './project.entity'
import { UserEntity } from './user.entity'
import { MessageEntity } from './message.entity'

@Entity('room')
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    roomName: string

    @Column()
    numberMember: number

    @ManyToOne(() => ProjectEntity, (project) => project.rooms)
    project: ProjectEntity

    @ManyToOne(() => UserEntity, (user) => user.rooms)
    user: UserEntity

    @OneToMany(() => MessageEntity, (message) => message.room)
    messages: MessageEntity[]
}
