import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/user/IUsersRepository'
import { hash } from 'bcrypt'
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
    const hashed_password = await this.hashPassword(user.password)

    try {
      const createdUser = await this.usersRepository.create({
        ...user,
        password: hashed_password,
      })

      return createdUser
    } catch (err: any) {
      if (err.code == '23505') {
        throw new Error('Email has already been taken')
      }

      throw new Error('Error creating user')
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(
      password,
      Number(process.env.PASSWORD_SALT)
    )

    return hashedPassword
  }
}
