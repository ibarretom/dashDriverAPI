import { IFuelDto } from '../../../dto/spent/IFuelDto'
import { IMonthDateDto } from '../../../dto/spent/IMonthDto'
import { Fuel } from '../../../entities/Fuel.entity'
import { AppError } from '../../../errors/AppError'
import { IFuelRepository } from './IFuel.repository'

export class FuelInMemoryRepository implements IFuelRepository {
  private repository: Fuel[]

  constructor() {
    this.repository = [
      {
        id: 'test-id-1',
        user_id: 'user-1-test-id',
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2023, 3, 0, 23, 59, 59),
        created_at: new Date(Date.now()).toISOString(),
      },
      {
        id: 'test-id-2',
        user_id: 'user-1-test-id',
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2023, 3, 1, 0, 0, 0).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-3',
        user_id: 'user-1-test-id',
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2023, 4, 0, 23, 59, 59).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-4',
        user_id: 'user-1-test-id',
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2023, 4, 1, 0, 0, 0).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-5',
        user_id: 'user-2-test-id',
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2023, 4, 0, 23, 59, 59).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-6',
        user_id: 'user-3-test-id',
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2022, 5, 2).toISOString(),
        created_at: new Date(Date.now()),
      },
      {
        id: 'test-id-7',
        user_id: 'user-3-test-id',
        type: 'gas_natural',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2022, 5, 2).toISOString(),
        created_at: new Date(Date.now()),
      },
    ]
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

  async findByMonth(
    { year, month }: IMonthDateDto,
    user_id: string
  ): Promise<Fuel[]> {
    const fuels = this.repository.filter((f) => {
      const m = new Date(f.fuel_date).getMonth()
      const y = new Date(f.fuel_date).getFullYear()

      if (m == month && y == year && f.user_id == user_id) {
        return f
      }
    })

    return fuels
  }
}
