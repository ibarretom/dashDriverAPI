import { CarRideInMemoryRepository } from '../../../src/repositories/carRide/CarRideInMemory.repository'
import { MostVisitedByMonthAddressService } from '../../../src/service/address/MostVisitedByMonthAddress.service'

let carRideRepository: CarRideInMemoryRepository
let mostVisitedByMonthAddress: MostVisitedByMonthAddressService

describe('Most visited address by month service', () => {
  beforeAll(() => {
    carRideRepository = new CarRideInMemoryRepository()
    mostVisitedByMonthAddress = new MostVisitedByMonthAddressService(
      carRideRepository
    )
  })

  it('Should be able to list the most visited car rides by month', async () => {
    const most_visited = await mostVisitedByMonthAddress.execute(
      new Date(2022, 5, 3).toISOString()
    )

    expect(most_visited).toHaveLength(2)
  })
})
