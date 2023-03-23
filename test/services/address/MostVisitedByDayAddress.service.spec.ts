import { CarRideInMemoryRepository } from '../../../src/repositories/carRide/CarRideInMemory.repository'
import { MostVisitedByDayAddressService } from '../../../src/service/address/MostVisitedByDayAddress.service'

let carRideRepository: CarRideInMemoryRepository
let mostVisitedByDayAddress: MostVisitedByDayAddressService

describe('Most visited address by day service', () => {
  beforeAll(() => {
    carRideRepository = new CarRideInMemoryRepository()
    mostVisitedByDayAddress = new MostVisitedByDayAddressService(
      carRideRepository
    )
  })

  it('Should be able to list the most visited car rides by day', async () => {
    const most_visited = await mostVisitedByDayAddress.execute(
      new Date(2022, 8, 2).toISOString()
    )

    expect(most_visited).toHaveLength(2)
  })
})
