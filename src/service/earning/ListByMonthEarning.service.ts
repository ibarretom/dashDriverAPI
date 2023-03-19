import { Earning } from '../../entities/Earning.entity'
import { IEarningRepository } from '../../repositories/earning/IEarning.repository'

type Request = {
  date: string
  user_id: string
}
export class ListByMonthEarningService {
  constructor(private earningRepository: IEarningRepository) {}

  async execute({ date, user_id }: Request): Promise<Earning[]> {
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    const earnings = await this.earningRepository.findByMonth(
      { month, year },
      user_id
    )

    return earnings
  }
}
