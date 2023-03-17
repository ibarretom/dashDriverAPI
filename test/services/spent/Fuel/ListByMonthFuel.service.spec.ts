import { FuelInMemoryRepository } from '../../../../src/repositories/spent/fuel/FuelInMemory.repository'
import { ListByMonthFuelService } from '../../../../src/service/spent/Fuel/ListByMonthFuel.service'

let fuelInMemoryRepository: FuelInMemoryRepository
let listByMonthFuelService: ListByMonthFuelService

describe('List fuel by month service', () => {
  beforeAll(() => {
    fuelInMemoryRepository = new FuelInMemoryRepository()
    listByMonthFuelService = new ListByMonthFuelService(fuelInMemoryRepository)
  })

  it('Should be able to list all fuels saved by month', async () => {
    const fuels_1 = await listByMonthFuelService.execute({
      date: new Date(2023, 3, 1, 0, 0, 0).toISOString(),
      user_id: 'user-1-test-id',
    })

    expect(fuels_1).toHaveLength(2)

    fuels_1.forEach((f) => {
      const month = new Date(f.fuel_date).getMonth()
      const year = new Date(f.fuel_date).getFullYear()

      expect(month).toBe(3)
      expect(year).toBe(2023)
    })

    const fuels_2 = await listByMonthFuelService.execute({
      date: new Date(2023, 3, 0, 0, 0, 0).toISOString(),
      user_id: 'user-1-test-id',
    })

    expect(fuels_2).toHaveLength(1)

    fuels_2.forEach((f) => {
      const month = new Date(f.fuel_date).getMonth()
      const year = new Date(f.fuel_date).getFullYear()

      expect(month).toBe(2)
      expect(year).toBe(2023)
    })

    const fuels_3 = await listByMonthFuelService.execute({
      date: new Date(2023, 4, 1, 0, 0, 0).toISOString(),
      user_id: 'user-1-test-id',
    })

    expect(fuels_3).toHaveLength(1)

    fuels_3.forEach((f) => {
      const month = new Date(f.fuel_date).getMonth()
      const year = new Date(f.fuel_date).getFullYear()

      expect(month).toBe(4)
      expect(year).toBe(2023)
    })
  })
})
