import { AppDataSource } from '../config/database'
import { UserEntity } from '../entity/user.entity'

export default class UserService {
    private readonly userRepository
    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity)
    }

    getUserByEmail = async (email: string) => {
        const user = await this.userRepository.findOne({ where: { email } })
        return user
    }
}
