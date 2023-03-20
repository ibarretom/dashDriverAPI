import { Kilometer } from '../../entities/Kilometer.entity'

import { IKilometerRepository } from '../../repositories/kilometer/IKilometer.repository'

import { AppError } from '../../errors/AppError'

type Request = {
  user_id: string
  amount: number
  moment: string
  kilometer_date: string | Date
}

export class CreateKilometerService {
  constructor(private kilometerRepository: IKilometerRepository) {}

  async execute(kilometer: Request) {
    const date = new Date(kilometer.kilometer_date)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const kilometers = await this.kilometerRepository.findByDay(
      { day, month, year },
      kilometer.user_id
    )

    if (await this.isAlreadyRegistered(kilometer, kilometers)) {
      throw new AppError(`Kilometer was already registered`, 400)
    }

    if (await this.isInvalid(kilometer, kilometers)) {
      throw new AppError(`Kilometer is with invalid amount`, 400)
    }

    const created_kilometer = await this.kilometerRepository.create(kilometer)

    return created_kilometer
  }

  private async isAlreadyRegistered(
    kilometer: Request,
    kilometers: Kilometer[]
  ): Promise<Boolean> {
    const registered_kilometer = kilometers.filter((k) => {
      if (k.moment == kilometer.moment) {
        return k
      }
    })

    if (registered_kilometer.length > 0) {
      return true
    }

    return false
  }

  private async isInvalid(
    kilometer: Request,
    kilometers: Kilometer[]
  ): Promise<Boolean> {
    if (kilometer.moment == 'inicio') {
      const end_kilometer = kilometers.filter((k) => k.moment == 'fim')[0]

      if (end_kilometer && kilometer.amount > end_kilometer.amount) {
        return true
      }
    } else {
      const beginning_kilometer = kilometers.filter(
        (k) => k.moment == 'inicio'
      )[0]

      if (
        beginning_kilometer &&
        kilometer.amount < beginning_kilometer.amount
      ) {
        return true
      }
    }

    return false
  }
}
