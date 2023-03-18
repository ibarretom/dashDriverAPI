import { Earning } from '../../entities/Earning.entity'

import { IEarningDto } from '../../dto/earning/IEarning.dto'

export interface IEarningRepository {
  create(earning: IEarningDto): Promise<Earning>
}
