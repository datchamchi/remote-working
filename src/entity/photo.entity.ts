import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('photo')
export class PhotoEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    path: string

    @Column()
    size: number

    @Column()
    filename: string

    @OneToOne(() => UserEntity, (user) => user.photo)
    @JoinColumn()
    user: UserEntity
}