import { Between, Repository } from 'typeorm'

import { Fuel } from '../../../entities/Fuel.entity'

import { IFuelDto } from '../../../dto/spent/IFuelDto'
import { IFuelRepository } from './IFuel.repository'

import { AppDataSource } from '../../../config/typeorm'
import { IMonthDateDto } from '../../../dto/spent/IMonthDto'

export class FuelRepository implements IFuelRepository {
  private repository: Repository<Fuel>

  constructor() {
    this.repository = AppDataSource.getRepository(Fuel)
  }

  async create(fuel: IFuelDto): Promise<Fuel> {
    const created_fuel = this.repository.create(fuel)

    return await this.repository.save(created_fuel)
  }

  async findByMonth(
    { year, month }: IMonthDateDto,
    user_id: string
  ): Promise<Fuel[]> {
    const fuels = await this.repository.find({
      where: {
        user_id,
        fuel_date: Between(
          new Date(year, month, 1),
          new Date(year, month + 1, 0, 23, 59, 59)
        ),
      },
    })

    return fuels
  }
}
