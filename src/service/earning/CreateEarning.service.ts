import { Earning } from '../../entities/Earning.entity'
import { IEarningRepository } from '../../repositories/earning/IEarning.repository'

type Request = {
  user_id: string
  amount: number
  earning_date: string | Date
}

export class CreateEarningService {
  constructor(private earningRepository: IEarningRepository) {}

  async execute(earning: Request): Promise<Earning> {
    const created_earning = await this.earningRepository.create(earning)

    return created_earning
  }
}
