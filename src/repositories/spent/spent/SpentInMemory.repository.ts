import { Spent } from '../../../entities/Spent.entity'

import { ISpentDto } from '../../../dto/spent/ISpentDto'
import { ISpentRepository } from './ISpent.repository'
import { AppError } from '../../../errors/AppError'

export class SpentInMemoryRepository implements ISpentRepository {
  private repository: Spent[]
  constructor() {
    this.repository = []
  }

  async create(spent: ISpentDto): Promise<Spent> {
    const created_spent = new Spent()

    if (
      spent.spent_type != 'aluguel_de_carro' &&
      spent.spent_type != 'manutencao' &&
      spent.spent_type != 'almoco' &&
      spent.spent_type != 'outros'
    ) {
      throw new AppError('Spent type is not valid', 400)
    }

    Object.assign(created_spent, {
      id: 'created-test-id',
      ...spent,
      created_at: new Date().toISOString(),
    })

    this.repository.push(created_spent)

    return created_spent
  }
}
