import { Column, Entity } from 'typeorm'
import { NotifyEntity } from './notify.entity'

@Entity('inform_noti')
export class InformNotifyEntity extends NotifyEntity {
    @Column({ default: 'unseen' })
    state: 'seen' | 'unseen'
}
