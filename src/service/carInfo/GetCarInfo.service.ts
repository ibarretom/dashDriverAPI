import { IKilometerRepository } from '../../repositories/kilometer/IKilometer.repository'
import { IFuelRepository } from '../../repositories/spent/fuel/IFuel.repository'

type Request = {
  date: string
  user_id: string
}

type CarInfo = {
  kilometers: number
  fuel: {
    gasoline: number
    gas: number
    etanol: number
  }
  total_amount_fuel: number
}

export class GetCarInfoService {
  constructor(
    private fuelRepository: IFuelRepository,
    private kilometerRepository: IKilometerRepository
  ) {}

  async execute({ date, user_id }: Request): Promise<CarInfo> {
    const car_info = {
      kilometers: 0,
      fuel: {
        gasoline: 0,
        gas: 0,
        etanol: 0,
      },
      total_amount_fuel: 0,
    }

    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    const fuel = await this.fuelRepository.findByMonth({ month, year }, user_id)

    const kilometers = await this.kilometerRepository.findByMonth(
      { month, year },
      user_id
    )

    fuel.forEach((f) => {
      if (f.type == 'gasolina') {
        car_info.fuel.gasoline += f.liters
      } else if (f.type == 'gas_natural') {
        car_info.fuel.gas += f.liters
      } else if (f.type == 'etanol') {
        car_info.fuel.etanol += f.liters
      }

      car_info.total_amount_fuel += f.amount
    })

    const begin_kilometer = kilometers.filter((k) => k.moment == 'inicio')

    begin_kilometer.forEach((beg_k, i) => {
      const beg_day = new Date(beg_k.kilometer_date).getDate()
      const beg_month = new Date(beg_k.kilometer_date).getMonth()
      const beg_year = new Date(beg_k.kilometer_date).getFullYear()

      const end_kilometer = kilometers.filter((end_k) => {
        const end_day = new Date(end_k.kilometer_date).getDate()
        const end_month = new Date(end_k.kilometer_date).getMonth()
        const end_year = new Date(end_k.kilometer_date).getFullYear()

        if (
          end_k.moment == 'fim' &&
          beg_day == end_day &&
          beg_month == end_month &&
          beg_year == end_year
        ) {
          return end_k
        }
      })[0]

      if (end_kilometer) {
        car_info.kilometers += end_kilometer.amount - beg_k.amount
      }
    })

    return car_info
  }
}
