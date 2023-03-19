import { Earning } from '../../entities/Earning.entity'

import { IEarningDto } from '../../dto/earning/IEarning.dto'
import { IMonthDateDto } from '../../dto/earning/IMonthDate.dto'

export interface IEarningRepository {
  create(earning: IEarningDto): Promise<Earning>

  findByMonth(date: IMonthDateDto, user_id: string): Promise<Earning[]>
}
