import { Between, Repository } from 'typeorm'

import { AppDataSource } from '../../../config/typeorm'
import { IMonthDateDto } from '../../../dto/carRide/IMonthDate.dto'
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

  async findByMonth(
    { month, year }: IMonthDateDto,
    user_id: string
  ): Promise<Spent[]> {
    const spent = await this.repository.find({
      where: {
        user_id,
        spent_date: Between(
          new Date(year, month, 1),
          new Date(year, month + 1, 0, 23, 59, 59) // 0 pega o dia anterior ao primeiro dia do mes month + 1
        ),
      },
    })

    return spent
  }
}
