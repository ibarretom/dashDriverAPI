import { ISpentDto } from '../../../dto/spent/ISpentDto'
import { Spent } from '../../../entities/Spent.entity'

export interface ISpentRepository {
  create(spent: ISpentDto): Promise<Spent>
}
