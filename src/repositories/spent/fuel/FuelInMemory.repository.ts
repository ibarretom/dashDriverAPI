import { IFuelDto } from '../../../dto/spent/IFuelDto'
import { Fuel } from '../../../entities/Fuel.entity'
import { AppError } from '../../../errors/AppError'
import { IFuelRepository } from './IFuel.repository'

export class FuelInMemoryRepository implements IFuelRepository {
  private repository: Fuel[]

  constructor() {
    this.repository = []
  }

  async create(fuel: IFuelDto): Promise<Fuel> {
    const created_fuel = new Fuel()

    if (
      fuel.type != 'gasolina' &&
      fuel.type != 'etanol' &&
      fuel.type != 'gas_natural'
    ) {
      throw new AppError('Invalid fuel type', 400)
    }

    Object.assign(created_fuel, {
      id: 'created-id',
      ...fuel,
      created_at: new Date(Date.now()).toISOString(),
    })

    this.repository.push(created_fuel)

    return created_fuel
  }
}
