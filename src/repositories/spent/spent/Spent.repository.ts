import { Repository } from 'typeorm'

import { AppDataSource } from '../../../config/typeorm'
import { ISpentDto } from '../../../dto/spent/ISpentDto'

import { Spent } from '../../../entities/Spent.entity'
import { ISpentRepository } from './ISpent.repository'

export class SpentRepository implements ISpentRepository {
  private repository: Repository<Spent>
  constructor() {
    this.repository = AppDataSource.getRepository(Spent)
  }

  async create(spent: ISpentDto): Promise<Spent> {
    const created_spent = this.repository.create(spent)

    return await this.repository.save(created_spent)
  }
}
