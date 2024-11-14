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
import { PhotoEntity } from './photo.entity'
import { ProjectEntity } from './project.entity'
import { RoomEntity } from './room.entity'
import { TaskEntity } from './task.entity'
import { MessageEntity } from './message.entity'
import { NotifyEntity } from './notify.entity'

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ nullable: true })
    phoneNumber?: string

    @OneToOne(() => PhotoEntity, (photo) => photo.user, { cascade: true })
    photo: PhotoEntity

    @Column({ nullable: true })
    password: string

    @ManyToMany(() => ProjectEntity, (project) => project.users)
    projects: ProjectEntity[]

    @OneToMany(() => TaskEntity, (task) => task.user)
    tasks: TaskEntity[]

    @ManyToMany(() => RoomEntity, (room) => room.users)
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
