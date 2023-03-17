import { Repository } from 'typeorm'

import { Fuel } from '../../../entities/Fuel.entity'

import { IFuelDto } from '../../../dto/spent/IFuelDto'
import { IFuelRepository } from './IFuel.repository'

import { AppDataSource } from '../../../config/typeorm'

export class FuelRepository implements IFuelRepository {
  private repository: Repository<Fuel>

  constructor() {
    this.repository = AppDataSource.getRepository(Fuel)
  }

  async create(fuel: IFuelDto): Promise<Fuel> {
    const created_fuel = this.repository.create(fuel)

    return await this.repository.save(created_fuel)
  }
}
