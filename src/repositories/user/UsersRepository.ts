import { Repository } from 'typeorm'
import { AppDataSource } from '../../config/typeorm'

import { User } from '../../entities/User'

import { IUsersDto } from '../../dto/IUsers.dto'
import { IUsersRepository } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create(user: IUsersDto): Promise<User> {
    const created_user = await this.repository.save(user)

    return created_user
  }
}