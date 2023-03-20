import { Kilometer } from '../../entities/Kilometer.entity'

import { IDayDateDto } from '../../dto/kilometer/IDayDate.dto'
import { IKilometerDto } from '../../dto/kilometer/IKilometer.dto'
import { IKilometerRepository } from './IKilometer.repository'

export class KilometerInMemoryRepository implements IKilometerRepository {
  private repository: Kilometer[]

  constructor() {
    this.repository = []
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
