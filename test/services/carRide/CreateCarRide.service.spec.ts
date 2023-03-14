import { AddressInMemoryRepository } from '../../../src/repositories/address/AddressInMemory.repository'
import { CarRideInMemoryRepository } from '../../../src/repositories/carRide/CarRideInMemory.repository'
import { CreateCarRideService } from '../../../src/service/carRide/CreateCarRide.service'

let addressRepository: AddressInMemoryRepository
let carRideRepository: CarRideInMemoryRepository

let createCarRideService: CreateCarRideService

describe('Create Car ride service', () => {
  beforeAll(() => {
    addressRepository = new AddressInMemoryRepository()
    carRideRepository = new CarRideInMemoryRepository()

    createCarRideService = new CreateCarRideService(
      carRideRepository,
      addressRepository
    )
  })
  it('Should be able to register a new car ride', async () => {
    const car_ride = await createCarRideService.execute({
      user_id: 'user-id',
      address: {
        zip_code: 23432435,
        federated_unit: 'TD',
        city: 'Test city',
        neighborhood: 'Test neighborhood',
        street: 'Test Street',
      },
      amount: 12.75,
      date: new Date().toISOString(),
    })

    expect(car_ride.id).toBeDefined()
    expect(car_ride.id).toBe('test-id')

    expect(car_ride.address_id).toBe('created_id')
  })

  it('Should not create a new Address when is given one that already exists', async () => {
    const car_ride = await createCarRideService.execute({
      user_id: 'user-id',
      address: {
        zip_code: 24445570,
        federated_unit: 'TD',
        city: 'Test city',
        neighborhood: 'Test neighborhood',
        street: 'Test Street',
      },
      amount: 12.75,
      date: new Date().toISOString(),
    })

    expect(car_ride.id).toBeDefined()
    expect(car_ride.id).toBe('test-id')

    expect(car_ride.address_id).toBe('in-memory')
  })
})
