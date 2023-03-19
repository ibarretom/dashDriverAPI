import { EarningInMemoryRepository } from '../../../src/repositories/earning/EarningInMemory.repository'
import { ListByMonthEarningService } from '../../../src/service/earning/ListByMonthEarning.service'

let earningsRepository: EarningInMemoryRepository
let listByMonthEarningService: ListByMonthEarningService

describe('List earnings by month controller', () => {
  beforeAll(() => {
    earningsRepository = new EarningInMemoryRepository()
    listByMonthEarningService = new ListByMonthEarningService(
      earningsRepository
    )
  })

  it('Should be able to list all earnings saved by month', async () => {
    const earnings = await listByMonthEarningService.execute({
      date: new Date(2023, 2).toISOString(),
      user_id: 'user-1-test-id',
    })

    expect(earnings).toHaveLength(2)

    earnings.forEach((e) => {
      const month = new Date(e.earning_date).getMonth()
      const year = new Date(e.earning_date).getFullYear()

      expect(month).toBe(2)
      expect(year).toBe(2023)
      expect(e.user_id).toBe('user-1-test-id')
    })

    const earnings_2 = await listByMonthEarningService.execute({
      date: new Date(2023, 1).toISOString(),
      user_id: 'user-1-test-id',
    })

    expect(earnings_2).toHaveLength(1)

    earnings_2.forEach((e) => {
      const month = new Date(e.earning_date).getMonth()
      const year = new Date(e.earning_date).getFullYear()

      expect(month).toBe(1)
      expect(year).toBe(2023)
      expect(e.user_id).toBe('user-1-test-id')
    })

    const earnings_3 = await listByMonthEarningService.execute({
      date: new Date(2023, 3).toISOString(),
      user_id: 'user-1-test-id',
    })

    expect(earnings_3).toHaveLength(1)

    earnings_3.forEach((e) => {
      const month = new Date(e.earning_date).getMonth()
      const year = new Date(e.earning_date).getFullYear()

      expect(month).toBe(3)
      expect(year).toBe(2023)
      expect(e.user_id).toBe('user-1-test-id')
    })
  })
})
