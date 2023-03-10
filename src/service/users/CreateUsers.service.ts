import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/user/IUsersRepository'

type UserRequest = {
  name: string
  email: string
  password: string
}

export class CreateUsersService {
  private usersRepository: IUsersRepository

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(user: UserRequest): Promise<User> {
    try {
      const createdUser = await this.usersRepository.create(user)
      return createdUser
    } catch (err: any) {
      if (err.code == '23505') {
        throw new Error('Email has already been taken')
      }

      throw new Error('Error creating user')
    }
  }
}
