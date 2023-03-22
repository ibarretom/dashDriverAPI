import { IEarningDto } from '../../dto/earning/IEarning.dto'
import { IMonthDateDto } from '../../dto/earning/IMonthDate.dto'
import { Earning } from '../../entities/Earning.entity'
import { IEarningRepository } from './IEarning.repository'

export class EarningInMemoryRepository implements IEarningRepository {
  private repository: Earning[]

  constructor() {
    this.repository = [
      {
        id: 'test-id-1',
        user_id: 'user-1-test-id',
        amount: 50,
        earning_date: new Date(2023, 2, 0, 23, 59, 59).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-2',
        user_id: 'user-1-test-id',
        amount: 50,
        earning_date: new Date(2023, 2, 1).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-3',
        user_id: 'user-1-test-id',
        amount: 50,
        earning_date: new Date(2023, 3, 0, 23, 59, 59).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-4',
        user_id: 'user-1-test-id',
        amount: 50,
        earning_date: new Date(2023, 3, 1).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-5',
        user_id: 'user-2-test-id',
        amount: 50,
        earning_date: new Date(2023, 3, 0, 23, 59, 59).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-6',
        user_id: 'user-3-test-id',
        amount: 50,
        earning_date: new Date(2022, 5, 2).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-7',
        user_id: 'user-3-test-id',
        amount: 40,
        earning_date: new Date(2022, 5, 2).toISOString(),
        created_at: new Date(Date.now()),
      },
    ]
  }

  async create(earning: IEarningDto): Promise<Earning> {
    const created_earning = new Earning()

    Object.assign(created_earning, {
      id: 'created-id',
      ...earning,
      created_at: new Date(Date.now()),
    })

    this.repository.push(created_earning)
    return created_earning
  }

  async findByMonth(
    { month, year }: IMonthDateDto,
    user_id: string
  ): Promise<Earning[]> {
    const earnings = this.repository.filter((e) => {
      const m = new Date(e.earning_date).getMonth()
      const y = new Date(e.earning_date).getFullYear()

      if (month == m && year == y && user_id == e.user_id) {
        return e
      }
    })

    return earnings
  }
}
