import { Spent } from '../../../entities/Spent.entity'

import { ISpentRepository } from '../../../repositories/spent/spent/ISpent.repository'

type Request = {
  user_id: string
  spent_type: string
  spent_date: string
  description?: string
}

export class CreateSpentService {
  constructor(private spentRepository: ISpentRepository) {}

  async execute(spent: Request): Promise<Spent> {
    const created_spent = await this.spentRepository.create(spent)

    return created_spent
  }
}
