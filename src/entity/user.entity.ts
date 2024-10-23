import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    ManyToMany,
} from 'typeorm'
import { RoomEntity } from './room.entity'
import { MessageEntity } from './message.entity'
import { NotifyEntity } from './notify.entity'
import { PhotoEntity } from './photo.entity'
import { ProjectEntity } from './project.entity'
import { TaskEntity } from './task.entity'

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    phoneNumber: string

    @OneToOne(() => PhotoEntity, (photo) => photo.user, { cascade: true })
    photo: PhotoEntity

    @Column()
    password: string

    @ManyToMany(() => ProjectEntity, (project) => project.users)
    projects: ProjectEntity[]

    @OneToMany(() => TaskEntity, (task) => task.user)
    tasks: TaskEntity[]

    @OneToMany(() => RoomEntity, (room) => room.user)
    rooms: RoomEntity[]

    @OneToMany(() => MessageEntity, (message) => message.user)
    messages: MessageEntity[]

    @OneToMany(() => NotifyEntity, (notify) => notify.user)
    informations: NotifyEntity[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
