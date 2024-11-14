import { Column, Entity } from 'typeorm'
import { NotifyEntity } from './notifyEntity'

@Entity('invite_notify')
export class InviteNotifyEntity extends NotifyEntity {
    @Column({ default: 'uncheck' })
    state: 'check' | 'uncheck'

    @Column()
    project: string
}
