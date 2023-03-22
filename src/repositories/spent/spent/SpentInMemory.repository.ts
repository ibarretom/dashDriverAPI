import { Spent } from '../../../entities/Spent.entity'

import { ISpentDto } from '../../../dto/spent/ISpentDto'
import { ISpentRepository } from './ISpent.repository'
import { AppError } from '../../../errors/AppError'
import { IMonthDateDto } from '../../../dto/carRide/IMonthDate.dto'

export class SpentInMemoryRepository implements ISpentRepository {
  private repository: Spent[]
  constructor() {
    this.repository = [
      {
        id: 'test-id-1',
        user_id: 'user-1-test-id',
        spent_type: 'aluguel_de_carro',
        amount: 12.74,
        spent_date: '2023-04-01T03:00:00.000Z',
        description: 'description',
        created_at: '2023-03-16T09:15:55.827Z',
      },
      {
        id: 'test-id-2',
        user_id: 'user-1-test-id',
        spent_type: 'aluguel_de_carro',
        amount: 12.74,
        spent_date: '2023-05-01T02:59:59.000Z',
        description: 'description',
        created_at: '2023-03-16T09:15:55.827Z',
      },
      {
        id: 'test-id-3',
        user_id: 'user-1-test-id',
        spent_type: 'aluguel_de_carro',
        amount: 12.74,
        spent_date: '2023-04-01T02:59:59.000Z',
        description: 'description',
        created_at: '2023-03-16T09:15:55.827Z',
      },
      {
        id: 'test-id-4',
        user_id: 'user-1-test-id',
        spent_type: 'aluguel_de_carro',
        amount: 12.74,
        spent_date: '2023-05-01T03:00:00.000Z',
        description: 'description',
        created_at: '2023-03-16T09:15:55.827Z',
      },
      {
        id: 'test-id-5',
        user_id: 'user-2-test-id',
        spent_type: 'aluguel_de_carro',
        amount: 12.74,
        spent_date: '2023-05-01T02:59:59.000Z',
        description: 'description',
        created_at: '2023-03-16T09:15:55.827Z',
      },
      {
        id: 'test-id-6',
        user_id: 'user-3-test-id',
        spent_type: 'aluguel_de_carro',
        amount: 50,
        spent_date: new Date(2022, 5, 2).toISOString(),
        description: 'description',
        created_at: '2023-03-16T09:15:55.827Z',
      },
      {
        id: 'test-id-7',
        user_id: 'user-3-test-id',
        spent_type: 'almoco',
        amount: 20,
        spent_date: new Date(2022, 5, 2).toISOString(),
        description: 'description',
        created_at: '2023-03-16T09:15:55.827Z',
      },
      {
        id: 'test-id-8',
        user_id: 'user-3-test-id',
        spent_type: 'manutencao',
        amount: 10,
        spent_date: new Date(2022, 5, 2).toISOString(),
        description: 'description',
        created_at: '2023-03-16T09:15:55.827Z',
      },
      {
        id: 'test-id-9',
        user_id: 'user-3-test-id',
        spent_type: 'outros',
        amount: 10,
        spent_date: new Date(2022, 5, 2).toISOString(),
        description: 'description',
        created_at: '2023-03-16T09:15:55.827Z',
      },
    ]
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

  async findByMonth(
    { month, year }: IMonthDateDto,
    user_id: string
  ): Promise<Spent[]> {
    const spent = this.repository.filter((s) => {
      const m = new Date(s.spent_date).getMonth()
      const y = new Date(s.spent_date).getFullYear()

      if (m == month && y == year && s.user_id == user_id) {
        return s
      }
    })

    return spent
  }
}
