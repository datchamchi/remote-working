import { Repository } from 'typeorm'
import { AppDataSource } from '../config/database'
import { UserEntity } from '../entity/userEntity'

export default class UserService {
    private readonly userRepository: Repository<UserEntity>
    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity)
    }

    getUserByEmail = async (email: string) => {
        const user = await this.userRepository.findOne({ where: { email } })
        return user
    }
    getUserRelate = async (email: string, name: string | undefined) => {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .innerJoin('user.projects', 'project')
            .innerJoin('project.users', 'coUser')
            .where('coUser.email = :email', { email })
            .andWhere('user.email != :email and user.name LIKE :name', {
                email,
                name: `%${name}%`,
            })
            .distinct(true)
            .getMany()
        return user
    }
}
