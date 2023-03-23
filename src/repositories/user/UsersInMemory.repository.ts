import { object } from 'zod'
import { IUsersDto } from '../../dto/IUsers.dto'
import { User } from '../../entities/User.entity'
import { IUsersRepository } from './IUsers.repository'

export class UsersInMemoryRepository implements IUsersRepository {
  private repository: Array<User>
  constructor() {
    this.repository = [
      {
        id: 'test-id',
        name: 'test',
        email: 'test@email.com',
        password:
          '$2b$08$EQt3pOXW0.YNZK.Zthb12eJf6mrx7pnTSvVR.ZbwRfMJtOdJGCefy',
        photo_url: 'url',
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

  async update(user: User): Promise<User> {
    const user_index = this.repository.findIndex((u) => u.id == user.id)

    this.repository[user_index] = user

    return this.repository[user_index]
  }

  async findByID(id: string): Promise<User | null> {
    let user = this.repository.find((u) => u.id == id)

    return user || null
  }

  async findByEmail(email: string): Promise<User | null> {
    let user = this.repository.find((u) => u.email == email)

    if (!user) {
      return null
    }

    return user
  }
}
