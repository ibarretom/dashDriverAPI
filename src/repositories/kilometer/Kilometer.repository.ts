import { Between, Repository } from 'typeorm'

import { AppDataSource } from '../../config/typeorm'

import { Kilometer } from '../../entities/Kilometer.entity'

import { IKilometerDto } from '../../dto/kilometer/IKilometer.dto'
import { IKilometerRepository } from './IKilometer.repository'
import { IDayDateDto } from '../../dto/kilometer/IDayDate.dto'

export class KilometerRepository implements IKilometerRepository {
  private repository: Repository<Kilometer>
  constructor() {
    this.repository = AppDataSource.getRepository(Kilometer)
  }

  async create(kilometer: IKilometerDto): Promise<Kilometer> {
    const created_kilometer = this.repository.create(kilometer)

    return await this.repository.save(created_kilometer)
  }

  findByDay(
    { day, month, year }: IDayDateDto,
    user_id: string
  ): Promise<Kilometer[]> {
    const kilometers = this.repository.find({
      where: {
        user_id,
        kilometer_date: Between(
          new Date(year, month, day),
          new Date(year, month, day, 23, 59, 59)
        ),
      },
    })

    return kilometers
  }
}
