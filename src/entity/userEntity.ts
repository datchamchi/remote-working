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
import { CommentEntity } from './commentEntity'

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

    @OneToOne(() => PhotoEntity, (photo) => photo.user, { onDelete: 'CASCADE' })
    photo: PhotoEntity

    @Column({ nullable: true })
    password: string

    @ManyToMany(() => ProjectEntity, (project) => project.users)
    projects: ProjectEntity[]

    @OneToMany(() => TaskEntity, (task) => task.user, { onDelete: 'CASCADE' })
    tasks: TaskEntity[]

    @ManyToMany(() => RoomEntity, (room) => room.users)
    rooms: RoomEntity[]

    @OneToMany(() => MessageEntity, (message) => message.user, {
        onDelete: 'CASCADE',
    })
    messages: MessageEntity[]

    @OneToMany(() => NotifyEntity, (notify) => notify.user, {
        onDelete: 'CASCADE',
    })
    informations: NotifyEntity[]

    @OneToMany(() => CommentEntity, (comment) => comment.user, {
        onDelete: 'CASCADE',
    })
    comments: CommentEntity[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
