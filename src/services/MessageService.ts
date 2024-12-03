import { Repository } from 'typeorm'
import { MessageEntity, RoomEntity, UserEntity } from '../entity'
import { AppDataSource } from '../config'
import { CreateMessageDto } from '../dto'
import { AppError } from '../utils'

class MessageService {
    private readonly messageRepo: Repository<MessageEntity>
    private readonly userRepo: Repository<UserEntity>
    private readonly roomRepo: Repository<RoomEntity>

    constructor() {
        this.messageRepo = AppDataSource.getRepository(MessageEntity)
        this.userRepo = AppDataSource.getRepository(UserEntity)
        this.roomRepo = AppDataSource.getRepository(RoomEntity)
    }
    async createMessage(
        email: string,
        roomId: number,
        input: CreateMessageDto
    ) {
        const { content, type } = input
        const user = await this.userRepo.findOne({ where: { email } })
        if (!user) throw new AppError(400, 'User not found')

        const room = await this.roomRepo.findOne({ where: { id: roomId } })
        if (!room) throw new AppError(400, 'Room not found')
        const message = await this.messageRepo.save({
            user,
            room,
            content,
            type,
        })
        return message
    }
}
export default MessageService
