import { Repository } from 'typeorm'

import { INotifyService } from './INotifyService'
import {
    InformNotifyEntity,
    InviteNotifyEntity,
    NotifyEntity,
    UserEntity,
} from '../../entity'
import { AppError } from '../../utils'
import { AppDataSource } from '../../config'
import { CreateNotifyDto } from '../../dto'

export class NotifyService implements INotifyService {
    private readonly notifRepo: Repository<NotifyEntity>
    private readonly userRepo: Repository<UserEntity>
    private readonly informNotiRepo: Repository<InformNotifyEntity>
    private readonly inviteNotiRepo: Repository<InviteNotifyEntity>
    constructor() {
        this.notifRepo = AppDataSource.getRepository(NotifyEntity)
        this.informNotiRepo = AppDataSource.getRepository(InformNotifyEntity)
        this.inviteNotiRepo = AppDataSource.getRepository(InviteNotifyEntity)

        this.userRepo = AppDataSource.getRepository(UserEntity)
    }
    async addNotify(input: CreateNotifyDto): Promise<NotifyEntity> {
        const { to, type } = input
        const userExist = await this.userRepo.findOne({ where: { email: to } })
        if (!userExist) throw new AppError(400, 'User is not exist')

        const notify =
            type === 'invite'
                ? await this.inviteNotiRepo.save({ ...input, user: userExist })
                : await this.informNotiRepo.save({ ...input, user: userExist })
        return notify
    }
    async getAllNotify(email: string): Promise<NotifyEntity[]> {
        const informNotify = await this.informNotiRepo.find({
            where: { user: { email } },
            order: { createdAt: 'desc' },
            // take: LIMIT_NOTIFY,
        })
        const inviteNotify = await this.inviteNotiRepo.find({
            where: { user: { email } },
            order: { createdAt: 'desc' },
            // take: LIMIT_NOTIFY,
        })

        const result = [...informNotify, ...inviteNotify].sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        )

        return result
    }
    async updateInformNotiStatus(notifyId: string) {
        const notify = await this.informNotiRepo.findOne({
            where: { id: Number(notifyId) },
        })
        if (!notify) throw new AppError(400, 'Inform not found')
        notify.state = 'seen'
        await this.informNotiRepo.save(notify)
    }
    async updateInviteNotiStatus(notifyId: string) {
        const notify = await this.inviteNotiRepo.findOne({
            where: { id: Number(notifyId) },
        })
        if (!notify) throw new AppError(400, 'Inform not found')
        notify.state = 'check'
        await this.inviteNotiRepo.save(notify)
    }
    async updateAllInformNotiStatus(email: string) {
        const notifies = await this.informNotiRepo.find({
            where: { user: { email }, state: 'unseen' },
        })
        const data = notifies.map((notify) =>
            Object.assign(notify, { state: 'seen' })
        )
        return await this.informNotiRepo.save(data)
    }
}
