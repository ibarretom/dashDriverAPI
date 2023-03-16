import { SpentInMemoryRepository } from '../../../../src/repositories/spent/spent/SpentInMemory.repository'
import { CreateSpentService } from '../../../../src/service/spent/spent/CreateSpent.service'

let spentRepository: SpentInMemoryRepository
let createSpentService: CreateSpentService

describe('Create spent service', () => {
  beforeAll(() => {
    spentRepository = new SpentInMemoryRepository()
    createSpentService = new CreateSpentService(spentRepository)
  })

  it('Should be able to create a new spent', async () => {
    const spent = await createSpentService.execute({
      user_id: 'user-id',
      spent_date: '2023-03-03T03:00:00.000Z',
      spent_type: 'aluguel_de_carro',
      description: 'description',
    })

    expect(spent.id).toBe('created-test-id')

    const spent_2 = await createSpentService.execute({
      user_id: 'user-id',
      spent_date: '2023-03-03T03:00:00.000Z',
      spent_type: 'manutencao',
      description: 'description',
    })

    expect(spent_2.id).toBe('created-test-id')

    const spent_3 = await createSpentService.execute({
      user_id: 'user-id',
      spent_date: '2023-03-03T03:00:00.000Z',
      spent_type: 'almoco',
      description: 'description',
    })

    expect(spent_3.id).toBe('created-test-id')

    const spent_4 = await createSpentService.execute({
      user_id: 'user-id',
      spent_date: '2023-03-03T03:00:00.000Z',
      spent_type: 'outros',
      description: 'description',
    })

    expect(spent_4.id).toBe('created-test-id')
  })

  it('Should not be able to create a spent with spent_type different then the predefined ones', async () => {
    try {
      await createSpentService.execute({
        user_id: 'user-id',
        spent_date: '2023-03-03T03:00:00.000Z',
        spent_type: 'other_type',
        description: 'description',
      })
    } catch (err: any) {
      expect(err.message).toBe('Spent type is not valid')
    }
  })
})
