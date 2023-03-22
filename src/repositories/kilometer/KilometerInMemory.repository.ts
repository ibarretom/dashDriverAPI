import { Kilometer } from '../../entities/Kilometer.entity'

import { IDayDateDto } from '../../dto/kilometer/IDayDate.dto'
import { IKilometerDto } from '../../dto/kilometer/IKilometer.dto'
import { IKilometerRepository } from './IKilometer.repository'
import { IMonthDateDto } from '../../dto/kilometer/IMonthDate.dto'

export class KilometerInMemoryRepository implements IKilometerRepository {
  private repository: Kilometer[]

  constructor() {
    this.repository = [
      {
        id: 'test-id-1',
        moment: 'inicio',
        user_id: 'user-3-test-id',
        amount: 15,
        kilometer_date: new Date(2022, 7, 2).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-2',
        moment: 'fim',
        user_id: 'user-3-test-id',
        amount: 30,
        kilometer_date: new Date(2022, 7, 2).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-3',
        moment: 'inicio',
        user_id: 'user-3-test-id',
        amount: 30,
        kilometer_date: new Date(2022, 7, 1).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-4',
        moment: 'fim',
        user_id: 'user-3-test-id',
        amount: 30,
        kilometer_date: new Date(2022, 7, 3).toISOString(),
        created_at: new Date(Date.now()),
      },
    ]
  }

  async create(kilometer: IKilometerDto): Promise<Kilometer> {
    const created_kilometer = new Kilometer()

    Object.assign(created_kilometer, {
      id: 'created-id',
      ...kilometer,
      created_at: new Date().toISOString(),
    })

    this.repository.push(created_kilometer)

    return created_kilometer
  }

  async findByMonth(
    { year, month }: IMonthDateDto,
    user_id: string
  ): Promise<Kilometer[]> {
    const kilometers = this.repository.filter((k) => {
      const m = new Date(k.kilometer_date).getMonth()
      const y = new Date(k.kilometer_date).getFullYear()

      if (month == m && year == y && user_id == k.user_id) {
        return k
      }
    })

    return kilometers
  }

  async findByDay(
    { year, month, day }: IDayDateDto,
    user_id: string
  ): Promise<Kilometer[]> {
    const kilometers = this.repository.filter((k) => {
      const d = new Date(k.kilometer_date).getDate()
      const m = new Date(k.kilometer_date).getMonth()
      const y = new Date(k.kilometer_date).getFullYear()

      if (day == d && month == m && year == y && user_id == k.user_id) {
        return k
      }
    })

    return kilometers
  }
}
