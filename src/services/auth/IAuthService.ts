import { LoginUserDto } from '../../dto/LoginUserDto'
import { CreateUserDto } from '../../dto/UserDto'
import { Token } from '../../types/token.type'
import User from '../../types/user.type'

export default interface IAuthService {
    signUp(input: CreateUserDto): Promise<Omit<User, 'password'>>
    login(input: LoginUserDto): Promise<Token>
}
