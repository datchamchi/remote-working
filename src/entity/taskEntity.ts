import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { UserEntity } from './userEntity'
import { ProjectEntity } from './projectEntity'
import { SubTaskEntity } from './subTaskEntity'

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

    @OneToMany(() => SubTaskEntity, (subtask) => subtask.task)
    subtasks: SubTaskEntity[]
}
