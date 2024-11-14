import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { UserEntity } from './userEntity'
import { TaskEntity } from './taskEntity'

@Entity('project')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    projectName: string

    @Column()
    description: string

    @Column()
    leader: string

    @Column({ unique: true })
    key: string

    @ManyToMany(() => UserEntity, (user) => user.projects)
    @JoinTable({ name: 'user_project' })
    users: UserEntity[]

    @OneToMany(() => TaskEntity, (task) => task.project)
    tasks: TaskEntity[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
