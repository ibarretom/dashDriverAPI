import { Fuel } from '../../../entities/Fuel.entity'
import { IFuelRepository } from '../../../repositories/spent/fuel/IFuel.repository'

type Request = {
  user_id: string
  type: string
  liters: number
  amount: number
  fuel_date: string
}

export class CreateFuelService {
  constructor(private fuelRepository: IFuelRepository) {}

  async execute(fuel: Request): Promise<Fuel> {
    const created_fuel = await this.fuelRepository.create(fuel)

    return created_fuel
  }
}
