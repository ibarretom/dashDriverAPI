import { object } from 'zod'
import { IUsersDto } from '../../dto/IUsers.dto'
import { User } from '../../entities/User'
import { IUsersRepository } from './IUsersRepository'

export class UsersRepositoryInMemory implements IUsersRepository {
  private repository: Array<User>
  constructor() {
    this.repository = [
      {
        id: 'test-id',
        name: 'test',
        email: 'test@email.com',
        password: 'password',
        photo_url: 'null',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]
  }
  async create(user: IUsersDto): Promise<User> {
    const userAlreadyRegister = this.repository.find(
      (u) => u.email == user.email
    )

    if (userAlreadyRegister) {
      throw { code: 23505, message: 'Email has been already taken' }
    }

    const createdUser = new User()

    Object.assign(createdUser, {
      id: 'test-id-created',
      ...user,
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.repository.push(createdUser)

    return createdUser
  }
}
