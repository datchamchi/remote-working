import { Column, Entity } from 'typeorm'
import { NotifyEntity } from './notifyEntity'

@Entity('inform_noti')
export class InformNotifyEntity extends NotifyEntity {
    @Column({ default: 'unseen' })
    state: 'seen' | 'unseen'
}
