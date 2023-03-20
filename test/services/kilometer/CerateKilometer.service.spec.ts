import { KilometerInMemoryRepository } from '../../../src/repositories/kilometer/KilometerInMemory.repository'
import { CreateKilometerService } from '../../../src/service/kilometer/CreateKilometer.service'

let kilometerRepository: KilometerInMemoryRepository
let createKilometerService: CreateKilometerService

describe('Create kilometer service', () => {
  beforeAll(() => {
    kilometerRepository = new KilometerInMemoryRepository()
    createKilometerService = new CreateKilometerService(kilometerRepository)
  })

  it('Should be able to register a beginning and end kilometer', async () => {
    const kilometer_begin = await createKilometerService.execute({
      amount: 12345,
      moment: 'inicio',
      user_id: 'user-3-test-id',
      kilometer_date: new Date().toISOString(),
    })

    expect(kilometer_begin.id).toBeDefined()

    const kilometer_end = await createKilometerService.execute({
      amount: 12346,
      moment: 'fim',
      user_id: 'user-3-test-id',
      kilometer_date: new Date().toISOString(),
    })

    expect(kilometer_end.id).toBeDefined()
  })

  it('Should not be able to register a kilometer with a moment that is already registered', async () => {
    try {
      await createKilometerService.execute({
        amount: 12345,
        moment: 'inicio',
        user_id: 'user-3-test-id r',
        kilometer_date: new Date(2023, 1, 4).toISOString(),
      })

      await createKilometerService.execute({
        amount: 12345,
        moment: 'inicio',
        user_id: 'user-3-test-id r',
        kilometer_date: new Date(2023, 1, 4).toISOString(),
      })
    } catch (err: any) {
      expect(err.message).toBe('Kilometer was already registered')
      expect(err.statusCode).toBe(400)
    }

    try {
      await createKilometerService.execute({
        amount: 12345,
        moment: 'final',
        user_id: 'user-3-test-id',
        kilometer_date: new Date(2023, 1, 5).toISOString(),
      })

      await createKilometerService.execute({
        amount: 12345,
        moment: 'final',
        user_id: 'user-3-test-id',
        kilometer_date: new Date(2023, 1, 5).toISOString(),
      })
    } catch (err: any) {
      expect(err.message).toBe('Kilometer was already registered')
      expect(err.statusCode).toBe(400)
    }
  })

  it('Should not be able to register of begin or end with invalid amount', async () => {
    try {
      await createKilometerService.execute({
        amount: 12345,
        moment: 'inicio',
        user_id: 'user-3-test-id',
        kilometer_date: new Date(2023, 1, 2).toISOString(),
      })

      await createKilometerService.execute({
        amount: 12344,
        moment: 'fim',
        user_id: 'user-3-test-id',
        kilometer_date: new Date(2023, 1, 2).toISOString(),
      })
    } catch (err: any) {
      expect(err.message).toBe('Kilometer is with invalid amount')
      expect(err.statusCode).toBe(400)
    }

    try {
      await createKilometerService.execute({
        amount: 12345,
        moment: 'fim',
        user_id: 'user-3-test-id',
        kilometer_date: new Date(2023, 1, 3).toISOString(),
      })

      await createKilometerService.execute({
        amount: 12346,
        moment: 'inicio',
        user_id: 'user-3-test-id',
        kilometer_date: new Date(2023, 1, 3).toISOString(),
      })
    } catch (err: any) {
      expect(err.message).toBe('Kilometer is with invalid amount')
      expect(err.statusCode).toBe(400)
    }
  })
})
