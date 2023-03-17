import { Fuel } from '../../../entities/Fuel.entity'
import { IFuelRepository } from '../../../repositories/spent/fuel/IFuel.repository'
type Request = {
  date: string
  user_id: string
}
export class ListByMonthFuelService {
  constructor(private fuelRepository: IFuelRepository) {}

  async execute({ date, user_id }: Request): Promise<Fuel[]> {
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    const fuels = await this.fuelRepository.findByMonth(
      { month, year },
      user_id
    )

    return fuels
  }
}
