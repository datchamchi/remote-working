import { Column, Entity } from 'typeorm'
import { NotifyEntity } from './notify.entity'

@Entity('invite_notify')
export class InviteNotifyEntity extends NotifyEntity {
    @Column({ default: 'uncheck' })
    state: 'check' | 'uncheck'

    @Column()
    project: string
}
