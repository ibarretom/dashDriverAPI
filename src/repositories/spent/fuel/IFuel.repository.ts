import { Fuel } from '../../../entities/Fuel.entity'

import { IFuelDto } from '../../../dto/spent/IFuelDto'
import { IMonthDateDto } from '../../../dto/spent/IMonthDto'

export interface IFuelRepository {
  create(fuel: IFuelDto): Promise<Fuel>

  findByMonth({ year, month }: IMonthDateDto, user_id: string): Promise<Fuel[]>
}
