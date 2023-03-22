import { CarRideInMemoryRepository } from '../../../src/repositories/carRide/CarRideInMemory.repository'
import { EarningInMemoryRepository } from '../../../src/repositories/earning/EarningInMemory.repository'
import { FuelInMemoryRepository } from '../../../src/repositories/spent/fuel/FuelInMemory.repository'
import { SpentInMemoryRepository } from '../../../src/repositories/spent/spent/SpentInMemory.repository'
import { GetRevenueService } from '../../../src/service/revenue/GetRevenue.service'

let carRidesRepository: CarRideInMemoryRepository
let earningsRepository: EarningInMemoryRepository
let spentRepository: SpentInMemoryRepository
let fuelRepository: FuelInMemoryRepository
let getRevenueService: GetRevenueService
describe('Get Revenue service', () => {
  beforeAll(() => {
    carRidesRepository = new CarRideInMemoryRepository()
    earningsRepository = new EarningInMemoryRepository()
    spentRepository = new SpentInMemoryRepository()
    fuelRepository = new FuelInMemoryRepository()

    getRevenueService = new GetRevenueService(
      carRidesRepository,
      earningsRepository,
      spentRepository,
      fuelRepository
    )
  })

  it('Should be able to get the monthly revenue', async () => {
    const revenue = await getRevenueService.execute({
      date: new Date(2022, 5, 2).toISOString(),
      user_id: 'user-3-test-id',
    })

    const earnings = revenue.earnings
    const spent = revenue.spent
    const total = revenue.total

    earnings.forEach((e) => {
      if (e.label == 'Corridas') {
        expect(e.value).toBe(26.5)
      }
      if (e.label == 'Outros') {
        expect(e.value).toBe(90)
      }
    })

    spent.forEach((s) => {
      if (s.label == 'Aluguel de carro') {
        expect(s.value).toBe(50)
      } else if (s.label == 'Manutenção') {
        expect(s.value).toBe(10)
      } else if (s.label == 'Almoco') {
        expect(s.value).toBe(20)
      } else if (s.label == 'Outros') {
        expect(s.value).toBe(10)
      } else if (s.label == 'Combustível') {
        expect(s.value).toBe(40.64)
      }
    })

    expect(total[0].value).toBe(-14.14)
  })
})
