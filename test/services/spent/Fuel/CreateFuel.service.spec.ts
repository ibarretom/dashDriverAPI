import { FuelInMemoryRepository } from '../../../../src/repositories/spent/fuel/FuelInMemory.repository'
import { CreateFuelService } from '../../../../src/service/spent/Fuel/CreateFuel.service'

let fuelInMemoryRepository: FuelInMemoryRepository
let createFuelService: CreateFuelService

describe('Create fuel service', () => {
  beforeAll(() => {
    fuelInMemoryRepository = new FuelInMemoryRepository()
    createFuelService = new CreateFuelService(fuelInMemoryRepository)
  })

  it('Should be able to create a new fuel spent with a valid type', async () => {
    const fuel = await createFuelService.execute({
      user_id: 'test-user-id',
      type: 'gasolina',
      liters: 4.5,
      amount: 20.32,
      fuel_date: '2023-03-17T01:03:42.598Z',
    })

    expect(fuel.id).toBe('created-id')

    const fuel_2 = await createFuelService.execute({
      user_id: 'test-user-id',
      type: 'etanol',
      liters: 4.5,
      amount: 20.32,
      fuel_date: '2023-03-17T01:03:42.598Z',
    })

    expect(fuel_2.id).toBe('created-id')

    const fuel_3 = await createFuelService.execute({
      user_id: 'test-user-id',
      type: 'gas_natural',
      liters: 4.5,
      amount: 20.32,
      fuel_date: '2023-03-17T01:03:42.598Z',
    })

    expect(fuel_3.id).toBe('created-id')
  })

  it('Should not be able to register a fuel spent with an invalid type', async () => {
    try {
      await createFuelService.execute({
        user_id: 'test-user-id',
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: '2023-03-17T01:03:42.598Z',
      })
    } catch (err: any) {
      expect(err.message).toBe('Invalid fuel type')
    }
  })
})
