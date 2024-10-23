import { LIMIT_NOTIFY } from '../../../constant'
import { AppDataSource } from '../../config/database'
import { CreateNotifyDto } from '../../dto/NotifyDto'
import { InformNotifyEntity } from '../../entity/informNoti.entity'
import { InviteNotifyEntity } from '../../entity/inviteNoti.entity'
import { NotifyEntity } from '../../entity/notify.entity'
import { UserEntity } from '../../entity/user.entity'
import { AppError } from '../../utils/AppError'
import { INotifyService } from './INotifyService'

export class NotifyService implements INotifyService {
    private readonly notifRepo
    private readonly userRepo
    private readonly informNotiRepo
    private readonly inviteNotiRepo
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
}
