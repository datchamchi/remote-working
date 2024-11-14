import { Repository } from 'typeorm'
import { RoomEntity, UserEntity } from '../entity'
import { AppDataSource } from '../config'
import { CreateRoomDto } from '../dto'
import { AppError } from '../utils'

export class RoomService {
    private readonly roomRepo: Repository<RoomEntity>
    private readonly userRepo: Repository<UserEntity>
    constructor() {
        this.roomRepo = AppDataSource.getRepository(RoomEntity)
        this.userRepo = AppDataSource.getRepository(UserEntity)
    }
    async createRoom(email: string, roomDto: CreateRoomDto) {
        const { users } = roomDto
        const currentUser = await this.userRepo.findOne({ where: { email } })
        if (!currentUser) throw new AppError(403, 'Forbidden')
        const listUser = await Promise.all(
            users.map(async (user) => {
                const userExist = await this.userRepo.findOne({
                    where: { id: user },
                })
                if (!userExist) throw new AppError(400, 'User is not exist')
                return userExist
            })
        )
        const userIds = listUser.map((user) => user.id)
        // const room = await this.roomRepo.findOne({
        //     relations: ['users'],
        //     where: { users: [...listUser] },
        // })
        // if (room) throw new AppError(400, 'Room is already exist')

        const newRoom = await this.roomRepo.save({
            users: [currentUser, ...listUser],
        })
        return newRoom
    }
    async getListRooms(email: string) {
        const user = await this.userRepo.findOne({
            where: { email },
            relations: ['rooms'],
        })
        if (!user) throw new AppError(400, 'User is not exist')
        return user.rooms
    }
}
