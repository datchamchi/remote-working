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
import { PhotoEntity } from './photoEntity'
import { ProjectEntity } from './projectEntity'
import { RoomEntity } from './roomEntity'
import { TaskEntity } from './taskEntity'
import { MessageEntity } from './messageEntity'
import { NotifyEntity } from './notifyEntity'

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ nullable: true })
    phone?: string

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
