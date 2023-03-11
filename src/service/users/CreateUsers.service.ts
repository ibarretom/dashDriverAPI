import { IUsersRepository } from '../../repositories/user/IUsersRepository'
import { hash } from 'bcrypt'

import { AppError } from '../../errors/AppError'

type UserRequest = {
  name: string
  email: string
  password: string
}

type UserResponse = {
  id: string
  name: string
  email: string
  photo_url: string
  created_at: Date
  updated_at: Date
}

export class CreateUsersService {
  private usersRepository: IUsersRepository

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(user: UserRequest): Promise<UserResponse> {
    const hashed_password = await this.hashPassword(user.password)

    try {
      const createdUser = await this.usersRepository.create({
        ...user,
        password: hashed_password,
      })

      return {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        photo_url: createdUser.photo_url,
        created_at: createdUser.created_at,
        updated_at: createdUser.updated_at,
      }
    } catch (err: any) {
      if (err.code == '23505') {
        throw new AppError('Email has already been taken')
      }

      throw new AppError('Error creating user', 500)
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
