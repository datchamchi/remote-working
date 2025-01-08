import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TaskEntity } from './taskEntity'

@Entity('subtask')
export class SubTaskEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: 'incomplete' })
    status: 'complete' | 'incomplete'

    @ManyToOne(() => TaskEntity, (task) => task.subtasks, {
        onDelete: 'CASCADE',
    })
    task: TaskEntity
}
