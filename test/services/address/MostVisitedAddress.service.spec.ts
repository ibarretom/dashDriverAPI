import { CarRideInMemoryRepository } from '../../../src/repositories/carRide/CarRideInMemory.repository'
import { MostVisitedAddressService } from '../../../src/service/address/MostVisitedAddress.service'

let carRideRepository: CarRideInMemoryRepository
let mostVisitedAddress: MostVisitedAddressService

describe('Most visited address service', () => {
  beforeAll(() => {
    carRideRepository = new CarRideInMemoryRepository()
    mostVisitedAddress = new MostVisitedAddressService(carRideRepository)
  })

  it('Should be able to list the most visited locales', async () => {
    const most_visited = await mostVisitedAddress.execute()

    expect(most_visited.all_time).toHaveLength(5)
    expect(most_visited.all_time[0].id).toBe('Estrela do Norte - São Gonçalo')
    expect(most_visited.all_time[0].value).toBe(3)
    expect(most_visited.all_time[1].id).toBe('Centro - Niterói')
    expect(most_visited.all_time[1].value).toBe(2)

    expect(most_visited.dawn).toHaveLength(2)

    expect(most_visited.morning).toHaveLength(1)
    expect(most_visited.morning[0].id).toBe('Barreto - Niterói')
    expect(most_visited.morning[0].value).toBe(1)

    expect(most_visited.afternoon).toHaveLength(1)
    expect(most_visited.afternoon[0].id).toBe('Estrela do Norte - São Gonçalo')
    expect(most_visited.afternoon[0].value).toBe(1)

    expect(most_visited.night).toHaveLength(4)
  })
})
