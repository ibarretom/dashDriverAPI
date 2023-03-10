import { IUsersDto } from '../../dto/IUsers.dto'
import { User } from '../../entities/User'

export interface IUsersRepository {
  create(user: IUsersDto): Promise<User>
}
