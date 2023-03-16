import { IMonthDateDto } from '../../../dto/carRide/IMonthDate.dto'
import { ISpentDto } from '../../../dto/spent/ISpentDto'
import { Spent } from '../../../entities/Spent.entity'

export interface ISpentRepository {
  create(spent: ISpentDto): Promise<Spent>

  findByMonth({ month, year }: IMonthDateDto, user_id: string): Promise<Spent[]>
}
