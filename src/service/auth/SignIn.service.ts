import { IUsersRepository } from '../../repositories/user/IUsersRepository'

import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { AppError } from '../../errors/AppError'
import { auth } from '../../config/auth'

type UserRequest = {
  email: string
  password: string
}

type UserResponse = {
  name: string
  photo_url: string
  token: string
}

export class SignInService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: UserRequest): Promise<UserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid email or password', 401)
    }

    const password_matches = await compare(password, user.password)

    if (!password_matches) {
      throw new AppError('Invalid email or password', 401)
    }

    const token = sign({}, auth.token_secret, {
      subject: user.id,
      expiresIn: auth.token_expires,
    })

    return {
      name: user.name,
      photo_url: user.photo_url,
      token,
    }
  }
}
