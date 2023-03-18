import { EarningInMemoryRepository } from '../../../src/repositories/earning/EarningInMemory.repository'
import { CreateEarningService } from '../../../src/service/earning/CreateEarning.service'

let earningRepository: EarningInMemoryRepository
let createEarningService: CreateEarningService

describe('Create earning service', () => {
  beforeAll(() => {
    earningRepository = new EarningInMemoryRepository()
    createEarningService = new CreateEarningService(earningRepository)
  })
  it('Should be able to create a new earning', async () => {
    const earning = await createEarningService.execute({
      user_id: 'test-user-1',
      amount: 45.0,
      earning_date: new Date(2023, 3, 1).toISOString(),
    })

    expect(earning.id).toBe('created-id')
  })
})
