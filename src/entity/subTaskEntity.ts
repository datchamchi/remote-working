import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TaskEntity } from './taskEntity'

@Entity('subtask')
export class SubTaskEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    state: 'todo' | 'done'

    @ManyToOne(() => TaskEntity, (task) => task.subtasks)
    task: TaskEntity
}
