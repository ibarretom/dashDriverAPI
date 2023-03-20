import { Kilometer } from '../../entities/Kilometer.entity'

import { IKilometerDto } from '../../dto/kilometer/IKilometer.dto'
import { IDayDateDto } from '../../dto/kilometer/IDayDate.dto'

export interface IKilometerRepository {
  create(kilometer: IKilometerDto): Promise<Kilometer>

  findByDay(date: IDayDateDto, user_id: string): Promise<Kilometer[]>
}
