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
import { RoomEntity } from './room.entity'
import { UserEntity } from './user.entity'
import { TaskEntity } from './task.entity'

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

    @OneToMany(() => RoomEntity, (room) => room.project)
    rooms: RoomEntity

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
