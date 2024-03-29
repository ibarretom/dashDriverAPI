import { Repository } from 'typeorm'
import { AppDataSource } from '../../config/typeorm'

import { User } from '../../entities/User.entity'

import { IUsersDto } from '../../dto/IUsers.dto'
import { IUsersRepository } from './IUsers.repository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create(user: IUsersDto): Promise<User> {
    const created_user = await this.repository.save(user)

    return created_user
  }

  async update(user: User): Promise<User> {
    const uploaded_user = await this.repository.save(user)

    return uploaded_user
  }

  async findByID(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } })

    return user
  }
}
