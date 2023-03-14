import { IUsersDto } from '../../dto/IUsers.dto'
import { User } from '../../entities/User.entity'

export interface IUsersRepository {
  create(user: IUsersDto): Promise<User>

  findByEmail(email: string): Promise<User | null>
}
