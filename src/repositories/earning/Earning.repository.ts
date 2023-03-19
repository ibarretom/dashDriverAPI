import { Between, Repository } from 'typeorm'

import { AppDataSource } from '../../config/typeorm'

import { Earning } from '../../entities/Earning.entity'

import { IEarningDto } from '../../dto/earning/IEarning.dto'
import { IEarningRepository } from './IEarning.repository'
import { IMonthDateDto } from '../../dto/earning/IMonthDate.dto'

export class EarningRepository implements IEarningRepository {
  private repository: Repository<Earning>

  constructor() {
    this.repository = AppDataSource.getRepository(Earning)
  }

  async create(earning: IEarningDto): Promise<Earning> {
    const created_earning = this.repository.create(earning)

    return await this.repository.save(created_earning)
  }

  async findByMonth(
    { month, year }: IMonthDateDto,
    user_id: string
  ): Promise<Earning[]> {
    const earnings = await this.repository.find({
      where: {
        user_id,
        earning_date: Between(
          new Date(year, month, 1),
          new Date(year, month + 1, 0, 23, 59, 59)
        ),
      },
    })

    return earnings
  }
}
