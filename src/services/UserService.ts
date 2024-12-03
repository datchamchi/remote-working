import { Repository } from 'typeorm'
import { AppError } from '../utils'
import bcrypt from 'bcrypt'
import { PhotoEntity, UserEntity } from '../entity'
import { AppDataSource } from '../config'
import cloudinary from 'cloudinary'
import { UpdateUserDto } from '../dto/UserDto'

export default class UserService {
    private readonly userRepository: Repository<UserEntity>
    private readonly photoRepository: Repository<PhotoEntity>
    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity)
        this.photoRepository = AppDataSource.getRepository(PhotoEntity)
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

    update = async (
        userId: string,
        dto: UpdateUserDto,
        photo: Express.Multer.File | undefined
    ) => {
        const { currentPass, newPass, confirmPass } = dto
        const user = await this.userRepository.findOne({
            where: { id: Number(userId) },
            relations: ['photo'],
        })

        if (!user) throw new AppError(400, 'User not found')
        if (!currentPass && (newPass || confirmPass)) {
            throw new AppError(400, 'Please provide current password')
        } else if (currentPass) {
            if (!newPass) throw new AppError(400, 'Please provide new password')
            if (!confirmPass)
                throw new AppError(400, 'Please provide password confirm')
            const checkPassword = await bcrypt.compare(
                currentPass,
                user.password
            )
            if (!checkPassword) throw new AppError(400, 'Password is incorrect')
            const hashPassword = await bcrypt.hash(newPass, 10)
            user.password = hashPassword
        }

        Object.keys(dto).forEach((key) => {
            if (key !== 'email') user[key] = dto[key]
        })

        if (photo) {
            const { path, size, filename } = photo
            const userPhoto = await this.photoRepository.findOne({
                where: { user: { id: user.id } },
            })
            if (!userPhoto) {
                return await this.photoRepository.save({
                    path,
                    size,
                    filename,
                    user,
                })
            } else {
                if (userPhoto.filename)
                    await cloudinary.v2.uploader.destroy(userPhoto.filename)
                userPhoto.path = photo.path
                userPhoto.size = photo.size
                userPhoto.filename = photo.filename
                user.photo = await this.photoRepository.save(userPhoto)
            }
        }

        return await this.userRepository.save(user)
    }
}
