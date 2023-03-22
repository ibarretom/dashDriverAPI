import { KilometerInMemoryRepository } from '../../../src/repositories/kilometer/KilometerInMemory.repository'
import { FuelInMemoryRepository } from '../../../src/repositories/spent/fuel/FuelInMemory.repository'
import { GetCarInfoService } from '../../../src/service/carInfo/GetCarInfo.service'

let fuelRepository: FuelInMemoryRepository
let kilometerRepository: KilometerInMemoryRepository
let carInfoService: GetCarInfoService

describe('Car info service', () => {
  beforeAll(() => {
    fuelRepository = new FuelInMemoryRepository()
    kilometerRepository = new KilometerInMemoryRepository()
    carInfoService = new GetCarInfoService(fuelRepository, kilometerRepository)
  })
  it('Should be able to get a car info given a month', async () => {
    const car_info = await carInfoService.execute({
      date: new Date(2022, 7, 3).toISOString(),
      user_id: 'user-3-test-id',
    })

    expect(car_info.kilometers).toBe(15)
    expect(car_info.fuel.gasoline).toBe(5)
    expect(car_info.fuel.gas).toBe(10)
    expect(car_info.fuel.etanol).toBe(5)
    expect(car_info.total_amount_fuel).toBe(70)
  })
})
