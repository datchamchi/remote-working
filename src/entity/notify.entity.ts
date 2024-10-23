import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('notify')
export abstract class NotifyEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    type: 'invite' | 'inform'

    @Column()
    from: string

    @ManyToOne(() => UserEntity, (user) => user.informations)
    user: UserEntity

    @CreateDateColumn()
    createdAt: Date
}
