import { CarRide } from '../../entities/CarRide.entity'

import { ICarRideRepository } from '../../repositories/carRide/ICarRideRepository'

type Request = {
  date: string
}

export class ListByMonthCarRideService {
  constructor(private carRideRepository: ICarRideRepository) {}

  async execute({ date }: Request): Promise<CarRide[]> {
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    const rides = await this.carRideRepository.findByMonth({ year, month })

    return rides
  }
}
