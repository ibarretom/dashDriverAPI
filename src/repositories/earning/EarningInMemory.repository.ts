import { IEarningDto } from '../../dto/earning/IEarning.dto'
import { Earning } from '../../entities/Earning.entity'
import { IEarningRepository } from './IEarning.repository'

export class EarningInMemoryRepository implements IEarningRepository {
  private repository: Earning[]

  constructor() {
    this.repository = []
  }

  async create(earning: IEarningDto): Promise<Earning> {
    const created_earning = new Earning()

    Object.assign(created_earning, {
      id: 'created-id',
      ...earning,
      created_at: new Date(Date.now()),
    })

    this.repository.push(created_earning)
    return created_earning
  }
}
