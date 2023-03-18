import { Repository } from 'typeorm'

import { AppDataSource } from '../../config/typeorm'

import { Earning } from '../../entities/Earning.entity'

import { IEarningDto } from '../../dto/earning/IEarning.dto'
import { IEarningRepository } from './IEarning.repository'

export class EarningRepository implements IEarningRepository {
  private repository: Repository<Earning>

  constructor() {
    this.repository = AppDataSource.getRepository(Earning)
  }

  async create(earning: IEarningDto): Promise<Earning> {
    const created_earning = this.repository.create(earning)

    return await this.repository.save(created_earning)
  }
}
