import { LoginUserDto } from '../../dto/LoginUserDto'
import { CreateUserDto } from '../../dto/UserDto'
import { Token } from '../../types/token'

export default interface IAuthService {
    signUp(input: CreateUserDto)
    login(input: LoginUserDto): Promise<Token>
}