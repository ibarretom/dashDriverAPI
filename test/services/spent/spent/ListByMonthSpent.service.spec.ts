import { SpentInMemoryRepository } from '../../../../src/repositories/spent/spent/SpentInMemory.repository'
import { ListByMonthSpentService } from '../../../../src/service/spent/spent/ListByMothSpent.service'

let spentInMemoryRepository: SpentInMemoryRepository
let listByMonthSpentService: ListByMonthSpentService

describe('List spent by month', () => {
  beforeAll(() => {
    spentInMemoryRepository = new SpentInMemoryRepository()
    listByMonthSpentService = new ListByMonthSpentService(
      spentInMemoryRepository
    )
  })

  it('Should be able to list all registered spent', async () => {
    const spent = await listByMonthSpentService.execute({
      date: new Date('2023-04-2 23:42:32').toISOString(),
      user_id: 'user-1-test-id',
    })

    expect(spent).toHaveLength(2)

    spent.forEach((s) => {
      const date = new Date(s.spent_date)
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      expect(month).toBe(4)
      expect(year).toBe(2023)
    })

    /* Month 3 */
    const spent_2 = await listByMonthSpentService.execute({
      date: new Date('2023-03-2 23:42:32').toISOString(),
      user_id: 'user-1-test-id',
    })

    expect(spent_2).toHaveLength(1)

    spent_2.forEach((s) => {
      const date = new Date(s.spent_date)
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      expect(month).toBe(3)
      expect(year).toBe(2023)
    })

    /* Month 5 */

    const spent_3 = await listByMonthSpentService.execute({
      date: new Date('2023-05-2 23:42:32').toISOString(),
      user_id: 'user-1-test-id',
    })

    expect(spent_3).toHaveLength(1)

    spent_3.forEach((s) => {
      const date = new Date(s.spent_date)
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      expect(month).toBe(5)
      expect(year).toBe(2023)
    })
  })
})
