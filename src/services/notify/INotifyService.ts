import { CreateNotifyDto } from '../../dto/NotifyDto'
import { NotifyEntity } from '../../entity/notifyEntity'

export interface INotifyService {
    getAllNotify(email: string): Promise<NotifyEntity[]>
    addNotify(input: CreateNotifyDto): Promise<NotifyEntity>
    updateInformNotiStatus(notifyId: string, type: string): void
    updateInviteNotiStatus(notifyId: string): void
}
