import { CarRideInMemoryRepository } from '../../../src/repositories/carRide/CarRideInMemory.repository'
import { ListByMonthCarRideService } from '../../../src/service/carRide/ListByMonthCarRide.service'

let carRideInMemoryRepository: CarRideInMemoryRepository
let listByMonthCarRideService: ListByMonthCarRideService

describe('List by month car ride', () => {
  beforeAll(() => {
    carRideInMemoryRepository = new CarRideInMemoryRepository()
    listByMonthCarRideService = new ListByMonthCarRideService(
      carRideInMemoryRepository
    )
  })

  it('Should be able to see all register car rides by month', async () => {
    const car_rides = await listByMonthCarRideService.execute({
      date: '2023-03-31T00:00:00Z',
      user_id: 'test-user-1-id',
    })

    expect(car_rides).toHaveLength(3)
  })
})
