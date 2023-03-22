import { Kilometer } from '../../entities/Kilometer.entity'

import { IKilometerDto } from '../../dto/kilometer/IKilometer.dto'
import { IDayDateDto } from '../../dto/kilometer/IDayDate.dto'
import { IMonthDateDto } from '../../dto/kilometer/IMonthDate.dto'

export interface IKilometerRepository {
  create(kilometer: IKilometerDto): Promise<Kilometer>

  findByMonth(date: IMonthDateDto, user_id: string): Promise<Kilometer[]>

  findByDay(date: IDayDateDto, user_id: string): Promise<Kilometer[]>
}
