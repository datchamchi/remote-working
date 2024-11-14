import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'
import { ProjectEntity } from './project.entity'

@Entity('task')
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    taskName: string

    @Column({ unique: true })
    key: string

    @Column()
    description: string

    @Column({ default: 'todo' })
    state: 'todo' | 'ongoing' | 'done' | 'overdue'

    @Column()
    estimate: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => UserEntity, (user) => user.tasks)
    user: UserEntity

    @ManyToOne(() => ProjectEntity, (project) => project.tasks)
    project: ProjectEntity
}
