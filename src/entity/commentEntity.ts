import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { TaskEntity } from './taskEntity'
import { UserEntity } from './userEntity'

@Entity('comment')
export class CommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => TaskEntity, (task) => task.comments, {
        onDelete: 'CASCADE',
    })
    task: TaskEntity

    @ManyToOne(() => UserEntity, (user) => user.comments)
    user: UserEntity
}
