import { CarRide } from '../../entities/CarRide.entity'
import { Earning } from '../../entities/Earning.entity'
import { Fuel } from '../../entities/Fuel.entity'
import { Spent } from '../../entities/Spent.entity'

import { ICarRideRepository } from '../../repositories/carRide/ICarRideRepository'
import { IEarningRepository } from '../../repositories/earning/IEarning.repository'
import { IFuelRepository } from '../../repositories/spent/fuel/IFuel.repository'
import { ISpentRepository } from '../../repositories/spent/spent/ISpent.repository'

type RevenueObject = {
  label: string
  value: number
}

type Revenue = {
  earnings: RevenueObject[]
  spent: RevenueObject[]
  total: RevenueObject[]
}

type Request = {
  date: string
  user_id: string
}
export class GetRevenueService {
  constructor(
    private carRideRepository: ICarRideRepository,
    private earningsRepository: IEarningRepository,
    private spentRepository: ISpentRepository,
    private fuelRepository: IFuelRepository
  ) {}

  async execute({ date, user_id }: Request): Promise<Revenue> {
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    const car_rides = await this.carRideRepository.findByMonth(
      { month, year },
      user_id
    )

    const earnings = await this.earningsRepository.findByMonth(
      { month, year },
      user_id
    )

    const spent = await this.spentRepository.findByMonth(
      { month, year },
      user_id
    )

    const fuel_spent = await this.fuelRepository.findByMonth(
      { month, year },
      user_id
    )

    const monthly_spent = this.calcMonthlySpent(spent, fuel_spent)
    const monthly_earnings = this.calcMonthlyEarning(car_rides, earnings)
    const total = this.calcTotalRevenue(monthly_earnings, monthly_spent)

    return {
      earnings: monthly_earnings,
      spent: monthly_spent,
      total,
    }
  }

  private calcMonthlySpent(
    spent: Spent[],
    fuel_spent: Fuel[]
  ): RevenueObject[] {
    const classifiedSpent = {
      'Aluguel de carro': 0,
      Combustível: 0,
      Manutenção: 0,
      Almoço: 0,
      Outros: 0,
    }

    spent.forEach((s) => {
      if (s.spent_type == 'aluguel_de_carro') {
        classifiedSpent['Aluguel de carro'] += s.amount
      } else if (s.spent_type == 'manutencao') {
        classifiedSpent['Manutenção'] += s.amount
      } else if (s.spent_type == 'almoco') {
        classifiedSpent['Almoço'] += s.amount
      } else if (s.spent_type == 'outros') {
        classifiedSpent['Outros'] += s.amount
      }
    })

    fuel_spent.forEach((f) => {
      classifiedSpent['Combustível'] += f.amount
    })

    return [
      { label: 'Aluguel de carro', value: classifiedSpent['Aluguel de carro'] },
      { label: 'Manutenção', value: classifiedSpent['Manutenção'] },
      { label: 'Almoço', value: classifiedSpent['Almoço'] },
      { label: 'Outros', value: classifiedSpent['Outros'] },
      { label: 'Combustível', value: classifiedSpent['Combustível'] },
    ]
  }

  private calcMonthlyEarning(
    car_rides: CarRide[],
    earnings: Earning[]
  ): RevenueObject[] {
    const classifiedEarnings = {
      Corridas: 0,
      Outros: 0,
    }

    car_rides.forEach((c) => {
      classifiedEarnings['Corridas'] += c.amount
    })

    earnings.forEach((e) => {
      classifiedEarnings['Outros'] += e.amount
    })

    return [
      { label: 'Corridas', value: classifiedEarnings['Corridas'] },
      { label: 'Outros', value: classifiedEarnings['Outros'] },
    ]
  }

  private calcTotalRevenue(
    earnings: RevenueObject[],
    spent: RevenueObject[]
  ): RevenueObject[] {
    let total = {
      label: 'Total',
      value: 0,
    }

    earnings.forEach((e) => {
      total.value += e.value
    })

    spent.forEach((s) => {
      total.value -= s.value
    })

    return [total]
  }
}
