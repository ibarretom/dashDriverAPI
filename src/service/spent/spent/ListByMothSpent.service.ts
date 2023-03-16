import { Spent } from '../../../entities/Spent.entity'
import { ISpentRepository } from '../../../repositories/spent/spent/ISpent.repository'

type Request = {
  date: string
  user_id: string
}

export class ListByMonthSpentService {
  constructor(private spentRepository: ISpentRepository) {}

  async execute({ date, user_id }: Request): Promise<Spent[]> {
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    const spent = this.spentRepository.findByMonth({ month, year }, user_id)

    return spent
  }
}
