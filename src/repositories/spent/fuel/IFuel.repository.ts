import { Fuel } from '../../../entities/Fuel.entity'

import { IFuelDto } from '../../../dto/spent/IFuelDto'

export interface IFuelRepository {
  create(fuel: IFuelDto): Promise<Fuel>
}
