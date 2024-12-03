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

        const otherMembers = await Promise.all(
            users.map(async (userId) => {
                const userExist = await this.userRepo.findOne({
                    where: { id: userId },
                })
                if (!userExist) throw new AppError(400, 'User is not exist')
                return userExist
            })
        )
        const listUser = [currentUser, ...otherMembers]

        const listRooms = await this.roomRepo.find({ relations: ['users'] })

        const existRoom = listRooms.find((room) => {
            const roomUserIds = room.users.map((user) => user.id)
            const newUserIds = listUser.map((user) => user.id)
            return roomUserIds.sort().join() === newUserIds.sort().join()
        })

        if (existRoom) throw new AppError(400, 'Room is already exist')

        const newRoom = await this.roomRepo.save({ users: listUser })

        return newRoom
    }

    async getListRooms(email: string) {
        const rooms = await this.roomRepo
            .createQueryBuilder('room')
            .where('room.name IS NOT NULL')
            .leftJoinAndSelect('room.users', 'user')
            .andWhere('user.email =:email', { email })
            .leftJoinAndSelect('room.messages', 'message')

            .getMany()

        // const listRoomJoined = rooms.filter((room) => {
        //     return room.users.find((user) => user.email === email)
        // })
        // const listRoom = listRoomJoined.map((room) => {
        //     return {
        //         ...room,
        //         users: room.users.filter((user) => user.email !== email),
        //     }
        // })
        return rooms
    }
    async getRoom(email: string, id: number) {
        const room = await this.roomRepo.findOne({
            where: { id },
            relations: [
                'users',
                'messages',
                'messages.user',
                'messages.user.photo',
            ],
            order: { messages: { createdAt: 'asc' } },
        })
        if (!room) throw new AppError(400, 'Room not found')
        if (room.name) return room
        return {
            ...room,
            users: room.users.filter((user) => user.email !== email),
        }
    }

    async updateCallStatus(id: number, status: boolean) {
        const room = await this.getRoom2(id)
        room.isCalling = status
        return await this.roomRepo.save(room)
    }
    async getRoom2(id: number) {
        const room = await this.roomRepo.findOne({
            where: { id },
            relations: ['users'],
        })
        if (!room) throw new AppError(400, 'Room not found')
        return room
    }
}
