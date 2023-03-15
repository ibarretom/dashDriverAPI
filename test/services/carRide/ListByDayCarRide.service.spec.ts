import { CarRideInMemoryRepository } from '../../../src/repositories/carRide/CarRideInMemory.repository'
import { ListByDayCarRideService } from '../../../src/service/carRide/ListByDayCarRide.service'

let carRideInMemoryRepository: CarRideInMemoryRepository
let listByDayCarRideService: ListByDayCarRideService

describe('List by day car ride service', () => {
  beforeAll(() => {
    carRideInMemoryRepository = new CarRideInMemoryRepository()
    listByDayCarRideService = new ListByDayCarRideService(
      carRideInMemoryRepository
    )
  })

  it('Should be able to list a car ride by day', async () => {
    const car_rides = await listByDayCarRideService.execute({
      date: '2023-03-14T02:48:07.812',
      user_id: 'test-user-1-id',
    })

    expect(car_rides).toHaveLength(1)
  })
})
